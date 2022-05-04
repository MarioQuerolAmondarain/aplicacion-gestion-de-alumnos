import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from 'src/app/models/alumno.model';
import { FortalezaPassword } from 'src/app/models/FortalezaPassword';
import { provincias } from 'src/app/models/provincias';
import { paises } from '../../models/paises';
import { AlumnosService } from './../../services/alumnos.service';
@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss'],
})
export class NuevoAlumnoComponent implements OnInit {
  @Input() editar!: Boolean;
  @Input('alumnoDNI') alumnoEditarDNI!: string;
  @Output() alumnoEditado = new EventEmitter();
  nuevoAlumnoForm!: FormGroup;
  filteredOptionsPaises!: Observable<string[]>;
  filteredOptionsProvincias!: Observable<string[]>;

  constructor(public alumnosService: AlumnosService) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    if (this.editar && !!this.alumnosService.getAlumno(this.alumnoEditarDNI)) {
      this.nuevoAlumnoForm.setValue(this.cargarDatosAlumno());
    }
    this.filteredOptionsPaises = this.nuevoAlumnoForm
      .get('pais')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterPaises(value))
      );
    this.filteredOptionsProvincias = this.nuevoAlumnoForm
      .get('provincia')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProvincias(value))
      );
  }

  isValid(): boolean {
    if (
      !this.formularioValido() ||
      !this.dniValido() ||
      !this.codigoPostalValido() ||
      !this.provinciaEspaniolaValida()
    ) {
      return false;
    }

    if (
      (this.nuevoAlumnoForm.get('password')!.invalid ||
        this.nuevoAlumnoForm.get('repetirPassword')!.invalid ||
        !this.passwordIguales()) &&
      this.alumnosService.existeAlumnoDNI(
        this.nuevoAlumnoForm.get('dni')?.value
      ) &&
      !this.editar
    ) {
      return false;
    }

    return true;
  }

  passwordIguales(): boolean {
    return (
      this.nuevoAlumnoForm.get('password')!.value ===
      this.nuevoAlumnoForm.get('repetirPassword')!.value
    );
  }

  codigoPostalValido(): boolean {
    if (this.nuevoAlumnoForm.get('pais')!.value !== 'España') {
      return true;
    }

    return (
      1000 <= this.nuevoAlumnoForm.get('codigoPostal')!.value &&
      this.nuevoAlumnoForm.get('codigoPostal')!.value <= 52999
    );
  }

  provinciaEspaniolaValida(): boolean {
    if (this.nuevoAlumnoForm.get('pais')?.value !== 'España') {
      return true;
    }

    return !!provincias.find((provincia) => {
      return provincia === this.nuevoAlumnoForm.get('provincia')!.value;
    });
  }

  formularioValido(): boolean {
    return (
      this.nuevoAlumnoForm.get('nombre')!.valid ||
      this.nuevoAlumnoForm.get('apellido1')!.valid ||
      this.nuevoAlumnoForm.get('apellido2')!.valid ||
      this.nuevoAlumnoForm.get('email')!.valid ||
      this.nuevoAlumnoForm.get('email')!.valid ||
      this.nuevoAlumnoForm.get('dni')!.valid ||
      this.nuevoAlumnoForm.get('tlf')!.valid ||
      this.nuevoAlumnoForm.get('pais')!.valid ||
      this.nuevoAlumnoForm.get('provincia')!.valid ||
      this.nuevoAlumnoForm.get('codigoPostal')!.valid ||
      this.nuevoAlumnoForm.get('localidad')!.valid ||
      this.nuevoAlumnoForm.get('nickName')!.valid
    );
  }

  fortalezaPassword(): number {
    let password = this.nuevoAlumnoForm.get('password')?.value;
    let fortaleza = 0;
    let maximoPuntos = true;

    if (password.length < 6) {
      return 0;
    }

    if (7 <= password.length && password.length <= 8) {
      fortaleza++;
      maximoPuntos = false;
    } else if (9 <= password.length && password.length <= 12) {
      fortaleza += 2;
      maximoPuntos = false;
    } else if (12 <= password.length) {
      fortaleza += 3;
    }

    if (/[a-z]/.test(password) || /[A-Z]/.test(password)) {
      fortaleza++;
    } else {
      maximoPuntos = false;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      fortaleza += 2;
    } else {
      maximoPuntos = false;
    }

    if (/[0-9]/.test(password)) {
      fortaleza++;
    } else {
      maximoPuntos = false;
    }

    if (/[$-/:-?{-~!"^_`\[\]]/.test(password)) {
      fortaleza += 2;
    } else {
      maximoPuntos = false;
    }

    if (maximoPuntos) {
      fortaleza += 2;
    }
    return fortaleza * (100 / 8);
  }

  fortalezaPasswordTexto(): string {
    if (this.fortalezaPassword() / (100 / 8) <= FortalezaPassword.MuyDebil) {
      return 'Muy débil';
    }
    if (this.fortalezaPassword() / (100 / 8) <= FortalezaPassword.Debil) {
      return 'Débil';
    }
    if (this.fortalezaPassword() / (100 / 8) <= FortalezaPassword.Moderada) {
      return 'Moderada';
    }
    if (this.fortalezaPassword() / (100 / 8) <= FortalezaPassword.Fuerte) {
      return 'Fuerte';
    }
    return 'Muy Fuerte';
  }

  cargarDatosAlumno() {
    let alumno = this.alumnosService.getAlumno(this.alumnoEditarDNI);
    return {
      nombre: alumno?.nombre,
      apellido1: alumno?.apellido1,
      apellido2: alumno?.apellido2,
      email: alumno?.email,
      dni: alumno?.dni,
      tlf: alumno?.tlf,
      tlf2: alumno?.tlf2,
      pais: alumno?.pais,
      provincia: alumno?.provincia,
      codigoPostal: alumno?.codigoPostal,
      localidad: alumno?.localidad,
      nickName: alumno?.nickName,
      password: '',
      repetirPassword: '',
    };
  }

  private _filterPaises(value: string): string[] {
    const filterValue = value.toLowerCase();

    return paises.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterProvincias(value: string): string[] {
    const filterValue = value.toLowerCase();

    return provincias.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm() {
    if(!this.isValid()){
      return;
    }
    if (!this.editar) {
      if (this.fortalezaPassword() < FortalezaPassword.Debil && this.nuevoAlumnoForm.get('password')?.valid) {
        if (!this.contraseniaDebil()) {
          return;
        }
      }
      this.alumnosService.addAlumno(
        new Alumno(
          this.nuevoAlumnoForm.get('nombre')?.value,
          this.nuevoAlumnoForm.get('apellido1')?.value,
          this.nuevoAlumnoForm.get('email')?.value,
          this.nuevoAlumnoForm.get('dni')?.value,
          this.nuevoAlumnoForm.get('tlf')?.value,
          this.nuevoAlumnoForm.get('pais')?.value,
          this.nuevoAlumnoForm.get('provincia')?.value,
          this.nuevoAlumnoForm.get('codigoPostal')?.value,
          this.nuevoAlumnoForm.get('localidad')?.value,
          this.nuevoAlumnoForm.get('nickName')?.value,
          this.nuevoAlumnoForm.get('password')?.value,
          this.nuevoAlumnoForm.get('tlf2')?.value,
          this.nuevoAlumnoForm.get('apellido2')?.value
        )
      );
    } else {
      this.alumnosService.updateAlumno(
        new Alumno(
          this.nuevoAlumnoForm.get('nombre')?.value,
          this.nuevoAlumnoForm.get('apellido1')?.value,
          this.nuevoAlumnoForm.get('email')?.value,
          this.nuevoAlumnoForm.get('dni')?.value,
          this.nuevoAlumnoForm.get('tlf')?.value,
          this.nuevoAlumnoForm.get('pais')?.value,
          this.nuevoAlumnoForm.get('provincia')?.value,
          this.nuevoAlumnoForm.get('codigoPostal')?.value,
          this.nuevoAlumnoForm.get('localidad')?.value,
          this.nuevoAlumnoForm.get('nickName')?.value,
          this.nuevoAlumnoForm.get('tlf2')?.value,
          this.nuevoAlumnoForm.get('apellido2')?.value
        )
      );
      this.alumnoEditado.emit(true);
    }
  }

  private contraseniaDebil() {
    return confirm('Contraseña débil ¿continuar?');
  }

  dniValido() {
    let alfabeto = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let dni = this.nuevoAlumnoForm.get('dni')?.value;
    let numeros = parseInt(dni.substring(0, 8), 10);
    let letra = dni.substring(8).toUpperCase();

    return alfabeto.charAt(numeros % 23) === letra;
  }

  inicializarForm(){
    this.nuevoAlumnoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}[A-Z]?$'),
      ]),
      tlf: new FormControl('', [
        Validators.required,
        Validators.pattern('[8|9|6|7][0-9]{8}'),
      ]),
      tlf2: new FormControl('', [Validators.pattern('[8|9|6|7][0-9]{8}')]),
      pais: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      codigoPostal: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      localidad: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repetirPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}

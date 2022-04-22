import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from 'src/app/models/alumno.model';
import { FortalezaPassword } from 'src/app/models/FortalezaPassword';
import { EventEmitter } from '@angular/core';
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
  nuevoAlumnoForm: FormGroup;
  paises = [
    'Afganistán',
    'Albania',
    'Alemania',
    'Andorra',
    'Angola',
    'Antigua y Barbuda',
    'Arabia Saudita',
    'Argelia',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaiyán',
    'Bahamas',
    'Bangladés',
    'Barbados',
    'Baréin',
    'Bélgica',
    'Belice',
    'Benín',
    'Bielorrusia',
    'Birmania',
    'Bolivia',
    'Bosnia y Herzegovina',
    'Botsuana',
    'Brasil',
    'Brunéi',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Bután',
    'Cabo Verde',
    'Camboya',
    'Camerún',
    'Canadá',
    'Catar',
    'Chad',
    'Chile',
    'China',
    'Chipre',
    'Ciudad del Vaticano',
    'Colombia',
    'Comoras',
    'Corea del Norte',
    'Corea del Sur',
    'Costa de Marfil',
    'Costa Rica',
    'Croacia',
    'Cuba',
    'Dinamarca',
    'Dominica',
    'Ecuador',
    'Egipto',
    'El Salvador',
    'Emiratos Árabes Unidos',
    'Eritrea',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estados Unidos',
    'Estonia',
    'Etiopía',
    'Filipinas',
    'Finlandia',
    'Fiyi',
    'Francia',
    'Gabón',
    'Gambia',
    'Georgia',
    'Ghana',
    'Granada',
    'Grecia',
    'Guatemala',
    'Guyana',
    'Guinea',
    'Guinea ecuatorial',
    'Guinea-Bisáu',
    'Haití',
    'Honduras',
    'Hungría',
    'India',
    'Indonesia',
    'Irak',
    'Irán',
    'Irlanda',
    'Islandia',
    'Islas Marshall',
    'Islas Salomón',
    'Israel',
    'Italia',
    'Jamaica',
    'Japón',
    'Jordania',
    'Kazajistán',
    'Kenia',
    'Kirguistán',
    'Kiribati',
    'Kuwait',
    'Laos',
    'Lesoto',
    'Letonia',
    'Líbano',
    'Liberia',
    'Libia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Madagascar',
    'Malasia',
    'Malaui',
    'Maldivas',
    'Malí',
    'Malta',
    'Marruecos',
    'Mauricio',
    'Mauritania',
    'México',
    'Micronesia',
    'Moldavia',
    'Mónaco',
    'Mongolia',
    'Montenegro',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Nicaragua',
    'Níger',
    'Nigeria',
    'Noruega',
    'Nueva Zelanda',
    'Omán',
    'Países Bajos',
    'Pakistán',
    'Palaos',
    'Palestina',
    'Panamá',
    'Papúa Nueva Guinea',
    'Paraguay',
    'Perú',
    'Polonia',
    'Portugal',
    'Reino Unido',
    'República Centroafricana',
    'República Checa',
    'República de Macedonia',
    'República del Congo',
    'República Democrática del Congo',
    'República Dominicana',
    'República Sudafricana',
    'Ruanda',
    'Rumanía',
    'Rusia',
    'Samoa',
    'San Cristóbal y Nieves',
    'San Marino',
    'San Vicente y las Granadinas',
    'Santa Lucía',
    'Santo Tomé y Príncipe',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leona',
    'Singapur',
    'Siria',
    'Somalia',
    'Sri Lanka',
    'Suazilandia',
    'Sudán',
    'Sudán del Sur',
    'Suecia',
    'Suiza',
    'Surinam',
    'Tailandia',
    'Tanzania',
    'Tayikistán',
    'Timor Oriental',
    'Togo',
    'Tonga',
    'Trinidad y Tobago',
    'Túnez',
    'Turkmenistán',
    'Turquía',
    'Tuvalu',
    'Ucrania',
    'Uganda',
    'Uruguay',
    'Uzbekistán',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Yibuti',
    'Zambia',
    'Zimbabue',
  ];
  filteredOptionsPaises!: Observable<string[]>;
  provincias = [
    'Alava',
    'Albacete',
    'Alicante',
    'Almería',
    'Asturias',
    'Avila',
    'Badajoz',
    'Barcelona',
    'Burgos',
    'Cáceres',
    'Cádiz',
    'Cantabria',
    'Castellón',
    'Ciudad Real',
    'Córdoba',
    'La Coruña',
    'Cuenca',
    'Gerona',
    'Granada',
    'Guadalajara',
    'Guipúzcoa',
    'Huelva',
    'Huesca',
    'Islas Baleares',
    'Jaén',
    'León',
    'Lérida',
    'Lugo',
    'Madrid',
    'Málaga',
    'Murcia',
    'Navarra',
    'Orense',
    'Palencia',
    'Las Palmas',
    'Pontevedra',
    'La Rioja',
    'Salamanca',
    'Segovia',
    'Sevilla',
    'Soria',
    'Tarragona',
    'Santa Cruz de Tenerife',
    'Teruel',
    'Toledo',
    'Valencia',
    'Valladolid',
    'Vizcaya',
    'Zamora',
    'Zaragoza',
  ];
  filteredOptionsProvincias!: Observable<string[]>;

  constructor(public alumnosService: AlumnosService) {
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
      this.formularioValido() ||
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

    return !!this.provincias.find((provincia) => {
      return provincia === this.nuevoAlumnoForm.get('provincia')!.value;
    });
  }

  formularioValido(): boolean {
    return (
      this.nuevoAlumnoForm.get('nombre')!.invalid ||
      this.nuevoAlumnoForm.get('apellido1')!.invalid ||
      this.nuevoAlumnoForm.get('apellido2')!.invalid ||
      this.nuevoAlumnoForm.get('email')!.invalid ||
      this.nuevoAlumnoForm.get('email')!.invalid ||
      this.nuevoAlumnoForm.get('dni')!.invalid ||
      this.nuevoAlumnoForm.get('tlf')!.invalid ||
      this.nuevoAlumnoForm.get('pais')!.invalid ||
      this.nuevoAlumnoForm.get('provincia')!.invalid ||
      this.nuevoAlumnoForm.get('codigoPostal')!.invalid ||
      this.nuevoAlumnoForm.get('localidad')!.invalid ||
      this.nuevoAlumnoForm.get('nickName')!.invalid
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
    } else{
      maximoPuntos = false;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      fortaleza += 2;
    }else{
      maximoPuntos = false;
    }

    if(/[0-9]/.test(password)){
      fortaleza++;
    }else{
      maximoPuntos = false;
    }

    if (/[$-/:-?{-~!"^_`\[\]]/.test(password)) {
      fortaleza += 2;
    }else{
      maximoPuntos = false;
    }

    if(maximoPuntos){
      fortaleza += 2;
    }
    return fortaleza * (100 / 8);
  }

  fortalezaPasswordTexto(): string {
    if (this.fortalezaPassword()/(100/8) <= FortalezaPassword.MuyDebil) {
      return 'Muy débil';
    }
    if (this.fortalezaPassword()/(100/8) <= FortalezaPassword.Debil) {
      return 'Débil';
    }
    if (this.fortalezaPassword()/(100/8) <= FortalezaPassword.Moderada) {
      return 'Moderada';
    }
    if (this.fortalezaPassword()/(100/8) <= FortalezaPassword.Fuerte) {
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

    return this.paises.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterProvincias(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.provincias.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm() {
    if (!this.editar) {
      if (this.fortalezaPassword() < FortalezaPassword.Debil) {
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
}

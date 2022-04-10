import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from './../../services/alumnos.service';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss'],
})
export class NuevoAlumnoComponent implements OnInit {
  @Input() editar!: Boolean;
  nuevoAlumnoForm: FormGroup;

  constructor(
    public alumnosService: AlumnosService,
  ) {
    this.nuevoAlumnoForm = new FormGroup({
      nombre: new FormControl(this.alumnosService.editarAlumno()?.nombre, [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}[A-Z]?$'),
      ]),
      tlf: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{9}'),
      ]),
      tlf2: new FormControl('', [Validators.pattern('[0-9]{9}')]),
      pais: new FormControl(''),
      provincia: new FormControl('', [Validators.required]),
      codigoPostal: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      localidad: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.editar && !!this.alumnosService.editarAlumno) {
      this.nuevoAlumnoForm.setValue(this.cargarDatosAlumno());
    }
  }

  submitForm() {
    if (!this.editar) {
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
      // this.dialogRef.close();z
    }
  }

  cargarDatosAlumno() {
    let alumno = this.alumnosService.editarAlumno();
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
      password: ''
    };
  }
}

import { AlumnosService } from './../../services/alumnos.service';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss'],
})
export class NuevoAlumnoComponent implements OnInit {
  nuevoAlumnoForm: FormGroup;

  constructor(public alumnosService: AlumnosService) {
    this.nuevoAlumnoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8}[A-Z]?$")]),
      tlf: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
      tlf2: new FormControl('', [Validators.pattern("[0-9]{9}")]),
      pais: new FormControl(''),
      provincia: new FormControl('', [Validators.required]),
      codigoPostal: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
      localidad: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  submitForm() {
    console.log("New alumn create");
    this.alumnosService.addAlumno(new Alumno(
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
      this.nuevoAlumnoForm.get('apellido2')?.value,
    ));
  }
}

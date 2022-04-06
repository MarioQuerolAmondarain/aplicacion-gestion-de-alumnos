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
  alumno = {
    nombre: 'Mario',
    apellido1: 'Querol',
    email: 'mario@devanddel.com',
    dni: '54351276E',
    tlf: '675872274',
    pais: 'España',
    provincia: 'Madrid',
    codigoPostal: 28033,
    localidad: 'Madrid',
    nickName: 'Mario',
    password: '123456',
  } as Alumno;

  nuevoAlumnoForm: FormGroup;

  constructor(public alumnosService: AlumnosService) {
    this.nuevoAlumnoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [Validators.required, Validators.pattern("^[a-z]{3}[0-9]{6}[a-z]?$")]),
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
    alert('Nuevo alumnos');
  }
}

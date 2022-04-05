import { Alumno } from './../models/alumno.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    {
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
    }
  ];
  constructor() {}

  addAlumno(alumno: Alumno) {
    this.alumnos.push(alumno);
    localStorage.setItem("alumnos", JSON.stringify(this.alumnos));
  }

  getAlumnos(): Alumno[] | undefined{
    let alumnos = localStorage.getItem("alumnos");
    if(!alumnos)
    {
      return undefined;
    }

    return JSON.parse(alumnos) as Alumno[]
  }
}

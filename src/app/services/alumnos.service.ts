import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from './../models/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos: Alumno[];
  constructor() {
    let alumnos = this.getAlumnos();
    this.alumnos = (!!alumnos)? alumnos : [];
  }

  addAlumno(alumno: Alumno) {
    console.log("a");

    this.alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
  }

  getAlumnos(): Alumno[] | undefined {
    let alumnos = localStorage.getItem('alumnos');
    if (!alumnos) {
      return undefined;
    }

    return JSON.parse(alumnos) as Alumno[];
  }
}

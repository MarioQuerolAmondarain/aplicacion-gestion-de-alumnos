import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
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
    console.log("Se añade nuevo alumno");

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

  deleteAlumno(dni: string){
    this.alumnos.forEach((element,index)=>{
      if(element.dni === dni){
        this.alumnos.splice(index,1);
        console.log(this.alumnos);
        localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
      }
   });
   console.log("Se elimina alumno con dni " + dni);

  }

}

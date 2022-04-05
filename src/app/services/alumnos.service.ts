import { Alumno } from './../models/alumno.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor() { }

  addAlumno(alumno: Alumno)
  {
    localStorage.setItem(alumno.id.toString(), JSON.stringify(alumno));
  }
}

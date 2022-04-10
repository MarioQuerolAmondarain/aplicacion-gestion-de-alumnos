import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from './../models/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos: Alumno[];
  private alumnoEditar: Alumno | undefined;

  constructor() {
    let alumnos = this.getAlumnos();
    this.alumnos = !!alumnos ? alumnos : [];
  }

  addAlumno(alumno: Alumno) {
    console.log('Se añade nuevo alumno');

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

  deleteAlumno(dni: string) {
    this.alumnos.forEach((element, index) => {
      if (element.dni === dni) {
        this.alumnos.splice(index, 1);
        console.log(this.alumnos);
        localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
      }
    });
    console.log('Se elimina alumno con dni ' + dni);
  }

  updateAlumno(alumnoRef: Alumno) {
    if(!!this.alumnoEditar){
      if(alumnoRef.nombre != "" && !!alumnoRef.nombre){
        this.alumnoEditar.nombre = alumnoRef.nombre;
      }
      if(alumnoRef.apellido1 != "" && !!alumnoRef.apellido1){
        this.alumnoEditar.apellido1 = alumnoRef.apellido1;
      }
      if(alumnoRef.apellido2 != "" && !!alumnoRef.apellido2){
        this.alumnoEditar.apellido2 = alumnoRef.apellido2;
      }
      if(alumnoRef.codigoPostal != 0 && !!alumnoRef.codigoPostal){
        this.alumnoEditar.codigoPostal = alumnoRef.codigoPostal;
      }
      if(alumnoRef.dni != "" && !!alumnoRef.dni){
        this.alumnoEditar.dni = alumnoRef.dni;
      }
      if(alumnoRef.email != "" && !!alumnoRef.email){
        this.alumnoEditar.email = alumnoRef.email;
      }
      if(alumnoRef.localidad != "" && !!alumnoRef.localidad){
        this.alumnoEditar.localidad = alumnoRef.localidad;
      }
      if(alumnoRef.nickName != "" && !!alumnoRef.nickName){
        this.alumnoEditar.nickName= alumnoRef.nickName;
      }
      if(alumnoRef.pais != "" && !!alumnoRef.pais){
        this.alumnoEditar.pais = alumnoRef.pais;
      }
      if(alumnoRef.provincia != "" && !!alumnoRef.provincia){
        this.alumnoEditar.provincia = alumnoRef.provincia;
      }
      if(alumnoRef.tlf != "" && !!alumnoRef.tlf){
        this.alumnoEditar.tlf = alumnoRef.tlf;
      }
      if(alumnoRef.tlf2 != "" && !!alumnoRef.tlf2){
        this.alumnoEditar.tlf2 = alumnoRef.tlf2;
      }
      localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
    }
  }

  setAlumnoEdit(dni: string){
    this.alumnoEditar = this.alumnos.find(alumo =>{
      return alumo.dni == dni;
    });
    console.log(this.alumnoEditar);
  }

  editarAlumno(): Alumno | undefined {
    return this.alumnoEditar;
  }
}

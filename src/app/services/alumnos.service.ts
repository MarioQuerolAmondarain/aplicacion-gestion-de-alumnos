import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumno } from './../models/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos: Alumno[];
  private alumnos$: Subject<Alumno[]>;

  constructor() {
    let alumnos = this.getAlumnos();
    this.alumnos = !!alumnos ? alumnos : [];
    this.alumnos$ = new Subject();
  }

  addAlumno(alumno: Alumno) {
    this.alumnos.push(alumno);
    this.actulizarLocalStorage();
  }

  getAlumnos(): Alumno[] | undefined {
    let alumnos = localStorage.getItem('alumnos');
    if (!alumnos) {
      return undefined;
    }

    return JSON.parse(alumnos) as Alumno[];
  }

  getAlumnos$(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  deleteAlumno(dni: string) {
    for (let index = 0; index < this.alumnos.length; index++) {
      let element = this.alumnos[index];
      if (element.dni === dni) {
        this.alumnos.splice(index, 1);
        this.actulizarLocalStorage();
      }
    }
  }

  updateAlumno(alumnoRef: Alumno) {
    let alumnoEditar = this.getAlumno(alumnoRef.dni);
    if (!!alumnoEditar) {
      if (alumnoRef.nombre != '' && !!alumnoRef.nombre) {
        alumnoEditar.nombre = alumnoRef.nombre;
      }
      if (alumnoRef.apellido1 != '' && !!alumnoRef.apellido1) {
        alumnoEditar.apellido1 = alumnoRef.apellido1;
      }
      if (alumnoRef.apellido2 != '' && !!alumnoRef.apellido2) {
        alumnoEditar.apellido2 = alumnoRef.apellido2;
      }
      if (alumnoRef.codigoPostal != 0 && !!alumnoRef.codigoPostal) {
        alumnoEditar.codigoPostal = alumnoRef.codigoPostal;
      }
      if (alumnoRef.dni != '' && !!alumnoRef.dni) {
        alumnoEditar.dni = alumnoRef.dni;
      }
      if (alumnoRef.email != '' && !!alumnoRef.email) {
        alumnoEditar.email = alumnoRef.email;
      }
      if (alumnoRef.localidad != '' && !!alumnoRef.localidad) {
        alumnoEditar.localidad = alumnoRef.localidad;
      }
      if (alumnoRef.nickName != '' && !!alumnoRef.nickName) {
        alumnoEditar.nickName = alumnoRef.nickName;
      }
      if (alumnoRef.pais != '' && !!alumnoRef.pais) {
        alumnoEditar.pais = alumnoRef.pais;
      }
      if (alumnoRef.provincia != '' && !!alumnoRef.provincia) {
        alumnoEditar.provincia = alumnoRef.provincia;
      }
      if (alumnoRef.tlf != '' && !!alumnoRef.tlf) {
        alumnoEditar.tlf = alumnoRef.tlf;
      }
      if (alumnoRef.tlf2 != '' && !!alumnoRef.tlf2) {
        alumnoEditar.tlf2 = alumnoRef.tlf2;
      }
      this.actulizarLocalStorage();
    }
  }

  getAlumno(dni: string): Alumno | undefined {
    return this.alumnos.find((alumo) => {
      return alumo.dni == dni;
    });
  }

  actulizarLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
    this.alumnos$.next(this.alumnos);
  }

  existeAlumnoDNI(dni: string): boolean {
    return !!this.alumnos.find((alumno) => {
      return alumno.dni === dni;
    });
  }
}

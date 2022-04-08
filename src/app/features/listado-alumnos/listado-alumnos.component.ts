import { FormGroup, FormControl } from '@angular/forms';
import { AlumnosService } from './../../services/alumnos.service';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss'],
})
export class ListadoAlumnosComponent implements OnInit{
  dataSource!: Alumno[];
  displayedColumns: string[] = [
    'nombre',
    'apellido1',
    'apellido2',
    'correo',
    'telefono',
    'telefono2',
    'dni',
    'pais',
    'provincia',
    'localidad',
    'nick',
    'detalles',
    "eliminar"
  ];

  constructor(private alumnosService: AlumnosService) {
    let alumnos = this.alumnosService.getAlumnos();
    this.dataSource = !!alumnos ? alumnos : [];
  }

  ngOnInit(): void {
  }

  eliminarAlumno(dni: string){
    this.alumnosService.deleteAlumno(dni);
    this.reloadLista();
  }

  viewAlumno(name: string){
    alert(name);
    this.reloadLista();
  }

  reloadLista(){
    let alumnos = this.alumnosService.getAlumnos();
    this.dataSource = !!alumnos ? alumnos : [];
  }
}

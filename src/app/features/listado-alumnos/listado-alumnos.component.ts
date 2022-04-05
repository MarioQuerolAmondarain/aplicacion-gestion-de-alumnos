import { AlumnosService } from './../../services/alumnos.service';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss'],
})
export class ListadoAlumnosComponent implements OnInit{
  dataSource: Alumno[];
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
  ];

  constructor(private alumnosService: AlumnosService) {
    let alumnos = this.alumnosService.getAlumnos();
    this.dataSource = (!!alumnos)? alumnos : [];
  }

  ngOnInit(): void {
  }
}

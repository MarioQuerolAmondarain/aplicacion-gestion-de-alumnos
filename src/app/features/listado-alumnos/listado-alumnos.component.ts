import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from './../../services/alumnos.service';
import { EditarAlumnoComponent } from './../editar-alumno/editar-alumno.component';
import { of } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

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

  constructor(private alumnosService: AlumnosService, private matDialog: MatDialog) {
    let alumnos = this.alumnosService.getAlumnos();
    this.dataSource = !!alumnos ? alumnos : [];
  }

  ngOnInit(): void {
  }

  eliminarAlumno(dni: string){
    this.alumnosService.deleteAlumno(dni);
    this.reloadLista();
  }

  viewAlumno(dni: string){
    const dialogRef = this.matDialog.open(EditarAlumnoComponent, {
      data: {dni: dni}
    });
    this.reloadLista();
  }

  reloadLista(){
    let alumnos = this.alumnosService.getAlumnos();
    this.dataSource = !!alumnos ? alumnos : [];
  }
}

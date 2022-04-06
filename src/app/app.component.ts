import { Alumno } from './models/alumno.model';
import { AlumnosService } from './services/alumnos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aplicacion-gestion-de-alumnos';
}

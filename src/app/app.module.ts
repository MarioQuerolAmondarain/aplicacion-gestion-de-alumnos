import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditarAlumnoComponent } from './features/editar-alumno/editar-alumno.component';
import { ListadoAlumnosComponent } from './features/listado-alumnos/listado-alumnos.component';
import { NuevoAlumnoComponent } from './features/nuevo-alumno/nuevo-alumno.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    ListadoAlumnosComponent,
    NuevoAlumnoComponent,
    EditarAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

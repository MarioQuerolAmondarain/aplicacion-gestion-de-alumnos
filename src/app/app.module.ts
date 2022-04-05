import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoAlumnosComponent } from './features/listado-alumnos/listado-alumnos.component';
import { NuevoAlumnoComponent } from './features/nuevo-alumno/nuevo-alumno.component';
import { EditarAlumnoComponent } from './features/editar-alumno/editar-alumno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoAlumnosComponent,
    NuevoAlumnoComponent,
    EditarAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

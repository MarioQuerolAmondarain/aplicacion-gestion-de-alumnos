import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss']
})
export class EditarAlumnoComponent implements OnInit {
  alumnoDNI!: string;
  constructor(public dialogRef: MatDialogRef<EditarAlumnoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any){ }

  ngOnInit(): void {
    this.alumnoDNI = this.data.dni;
  }

  close(){
    this.dialogRef.close();
  }
}

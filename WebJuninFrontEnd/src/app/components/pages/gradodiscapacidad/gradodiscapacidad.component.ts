import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { GradoDiscapacidadService } from '../../../layout/service/Talento Humano/gradodiscapacidad.service';
import { GradoDiscapacidad } from '../../../interface/gradodiscapacidad.interface';
// y NO desde el service

@Component({
  selector: 'app-gradodiscapacidad',
  standalone: true,
  imports: [
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule
  ],
  templateUrl: './gradodiscapacidad.component.html',
  styleUrl: './gradodiscapacidad.component.css',
  providers: [MessageService],
})
export class GradodiscapacidadComponent {
  gradodiscapacidadDialog: boolean = false;
  deleteGradodiscapacidadDialog: boolean = false;
  grado: GradoDiscapacidad = {};
  gradodata: GradoDiscapacidad[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private gradoService: GradoDiscapacidadService,
    private messageService: MessageService
  ) {
    this.getGrado();
  }

  ngOnInit(): void {}

  getGrado() {
    this.gradoService.getGrado().subscribe(data => {
      this.gradodata = data;
      console.log(this.gradodata);
    });
  }

  getGradoById(id: number) {
    this.gradoService.getGradoById(id).subscribe(data => {
      this.grado = data;
      console.log('Grado encontrado:', this.grado);
    });
  }

  saveOrUpdateGrado() {
    if (this.grado.id) {
      // Actualizar
      this.gradoService.updateGrado(this.grado.id, this.grado).subscribe(
        data => {
          console.log('Grado actualizado:', data);
          this.getGrado();
          this.gradodiscapacidadDialog = false;
        },
        error => {
          console.error('Error al actualizar grado:', error);
        }
      );
    } else {
      // Guardar
      this.gradoService.saveGrado(this.grado).subscribe(
        data => {
          console.log('Grado guardado:', data);
          this.getGrado();
          this.gradodiscapacidadDialog = false;
        },
        error => {
          console.error('Error al guardar grado:', error);
        }
      );
    }
  }

  deleteGrado(id: number) {
    this.gradoService.deleteGrado(id).subscribe(msg => {
      console.log('Eliminado:', msg);
      this.getGrado();
    });
  }

  openNew() {
    this.grado = {} as GradoDiscapacidad;
    this.submitted = false;
    this.gradodiscapacidadDialog = true;
  }

  hideDialog() {
    this.gradodiscapacidadDialog = false;
    this.submitted = false;
  }

  editGrado(grado: GradoDiscapacidad) {
    if (grado.id) {
      this.grado = { ...grado };
      this.gradodiscapacidadDialog = true;
    } else {
      console.error('ID no disponible para el grado seleccionado');
    }
  }
}
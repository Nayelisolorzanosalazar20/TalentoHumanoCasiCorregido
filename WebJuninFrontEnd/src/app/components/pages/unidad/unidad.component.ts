import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { UnidadService } from '../../../layout/service/Talento Humano/unidad.service';


// Add this import or definition for Unidad
import { Unidad } from '../../../interface/unidad.interface'; // Adjust the path as needed

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputNumberModule
  ],
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css'],
  providers: [MessageService],
})
export class UnidadComponent implements OnInit {

  unidadDialog: boolean = false;
  deleteUnidadDialog: boolean = false;

  unidad: Unidad = {};
  unidadData: Unidad[] = [];

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private unidadService: UnidadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUnidad();
  }

  getUnidad() {
   this.unidadService.getUnidades().subscribe(data => {
    // Si data es un array directo
    this.unidadData = Array.isArray(data) ? data : (data.unidades || []);
  });
  }

  saveOrUpdateUnidad() {
    if (this.unidad.id) {
      this.unidadService.updateUnidad(this.unidad.id, this.unidad).subscribe({
        next: () => {
          this.getUnidad();
          this.unidadDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar unidad:', error);
        }
      });
    } else {
      this.unidadService.saveUnidad(this.unidad).subscribe({
        next: () => {
          this.getUnidad();
          this.unidadDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar unidad:', error);
        }
      });
    }
  }

  deleteUnidad(id: number) {
    this.unidadService.deleteUnidad(id).subscribe({
      next: () => {
        this.getUnidad();
      },
      error: (err) => {
        console.error('Error al eliminar unidad:', err);
      }
    });
  }

  openNew() {
    this.unidad = {} as Unidad;
    this.submitted = false;
    this.unidadDialog = true;
  }

  hideDialog() {
    this.unidadDialog = false;
    this.submitted = false;
  }

  editUnidad(unidad: Unidad) {
    if (unidad.id) {
      this.unidad = { ...unidad };
      this.unidadDialog = true;
    } else {
      console.error('ID no disponible para la unidad seleccionada');
    }
  }
}
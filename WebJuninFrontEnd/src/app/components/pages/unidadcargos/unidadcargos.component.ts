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

import { UnidadCargoService } from '../../../layout/service/Talento Humano/unidadcargo.service';

// Add this import or definition for Unidad
import { UnidadCargo } from '../../../interface/unidadcargo.interface'; // Adjust the path as needed

@Component({
  selector: 'app-unidadcargos',
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
  templateUrl: './unidadcargos.component.html',
  styleUrls: ['./unidadcargos.component.css'],
  providers: [MessageService],
})
export class UnidadCargosComponent implements OnInit {

  unidadDialog: boolean = false;
  deleteUnidadCargoDialog: boolean = false;

  unidadcargo: UnidadCargo = {};
  unidadCargoData: UnidadCargo[] = [];

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private unidadcargosService: UnidadCargoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUnidadCargo();
  }

  getUnidadCargo() {

   this.unidadcargosService.getUnidadesCargo().subscribe(data => {
    // Si data es un array directo
    this.unidadCargoData = Array.isArray(data) ? data : (data.unidad_cargo || []);
  });
  }

  saveOrUpdateUnidadCargo() {
    if (this.unidadcargo.id) {
      this.unidadcargosService.updateUnidadCargo(this.unidadcargo.id, this.unidadcargo).subscribe({
        next: () => {
          this.getUnidadCargo();
          this.unidadDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar unidad:', error);
        }
      });
    } else {
      this.unidadcargosService.saveUnidadCargo(this.unidadcargo).subscribe({
        next: () => {
          this.getUnidadCargo();
          this.unidadDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar unidad:', error);
        }
      });
    }
  }

  deleteUnidadCargo(id: number) {
    this.unidadcargosService.deleteUnidadCargo(id).subscribe({
      next: () => {
        this.getUnidadCargo();
      },
      error: (err) => {
        console.error('Error al eliminar unidad:', err);
      }
    });
  }

  openNew() {
    this.unidadcargo = {} as UnidadCargo;
    this.submitted = false;
    this.unidadDialog = true;
  }

  hideDialog() {
    this.unidadDialog = false;
    this.submitted = false;
  }

  editUnidadCargo(unidad: UnidadCargo) {
    if (unidad.id) {
      this.unidadcargo = { ...unidad };
      this.unidadDialog = true;
    } else {
      console.error('ID no disponible para la unidad seleccionada');
    }
  }
}
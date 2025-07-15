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

import { PeriodoService } from '../../../layout/service/Talento Humano/periodo.service';
import { Periodo } from '../../../interface/perido.interface';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-periodo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ToolbarModule,
    DropdownModule,
    InputNumberModule
  ],
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
  providers: [MessageService],
})
export class PeriodoComponent implements OnInit {

  periodoDialog: boolean = false;
  deletePeriodoDialog: boolean = false;

  periodo: Periodo = {};
  periodosData: Periodo[] = [];

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private periodoService: PeriodoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPeriodos();
  }

getPeriodos() {
  this.periodoService.getPeriodos().subscribe(data => {
    // Si data es un array directo
    this.periodosData = Array.isArray(data) ? data : (data.periodos || []);
  });
}
  
  

  saveOrUpdatePeriodo() {
    if (this.periodo.id) {
      this.periodoService.updatePeriodo(this.periodo.id, this.periodo).subscribe({
        next: () => {
          this.getPeriodos();
          this.periodoDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar periodo:', error);
        }
      });
    } else {
      this.periodoService.savePeriodo(this.periodo).subscribe({
        next: () => {
          this.getPeriodos();
          this.periodoDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar periodo:', error);
        }
      });
    }
  }

  deletePeriodo(id: number) {
    this.periodoService.deletePeriodo(id).subscribe({
      next: () => {
        this.getPeriodos();
      },
      error: (err) => {
        console.error('Error al eliminar periodo:', err);
      }
    });
  }

  openNew() {
    this.periodo = {} as Periodo;
    this.submitted = false;
    this.periodoDialog = true;
  }

  hideDialog() {
    this.periodoDialog = false;
    this.submitted = false;
  }

  editPeriodo(periodo: Periodo) {
    if (periodo.id) {
      this.periodo = { ...periodo };
      this.periodoDialog = true;
    } else {
      console.error('ID no disponible para el periodo seleccionado');
    }
  }
}
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

import { CargoService } from '../../../layout/service/Talento Humano/cargos.service';
import { Cargo } from '../../../interface/cargos.interface';

@Component({
  selector: 'app-cargo',
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
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css'],
  providers: [MessageService],
})
export class CargoComponent implements OnInit {

  cargoDialog: boolean = false;
  deleteCargoDialog: boolean = false;

  cargo: Cargo = {};
  cargosData: Cargo[] = [];

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private cargoService: CargoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCargos();
  }

  getCargos() {
    this.cargoService.getCargos().subscribe(data => {
      // Si tu backend responde { cargos: [...] }
      const cargos = data.cargos || [];
      this.cargosData = cargos;
    });
  }

  saveOrUpdateCargo() {
    if (this.cargo.id) {
      this.cargoService.updateCargo(this.cargo.id, this.cargo).subscribe({
        next: () => {
          this.getCargos();
          this.cargoDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar cargo:', error);
        }
      });
    } else {
      this.cargoService.saveCargo(this.cargo).subscribe({
        next: () => {
          this.getCargos();
          this.cargoDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar cargo:', error);
        }
      });
    }
  }

  deleteCargo(id: number) {
    this.cargoService.deleteCargo(id).subscribe({
      next: () => {
        this.getCargos();
      },
      error: (err) => {
        console.error('Error al eliminar cargo:', err);
      }
    });
  }

  openNew() {
    this.cargo = {} as Cargo;
    this.submitted = false;
    this.cargoDialog = true;
  }

  hideDialog() {
    this.cargoDialog = false;
    this.submitted = false;
  }

  editCargo(cargo: Cargo) {
    if (cargo.id) {
      this.cargo = { ...cargo };
      this.cargoDialog = true;
    } else {
      console.error('ID no disponible para el cargo seleccionado');
    }
  }
}
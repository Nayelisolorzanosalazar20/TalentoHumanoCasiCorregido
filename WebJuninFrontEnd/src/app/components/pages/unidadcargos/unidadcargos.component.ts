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
import { Periodo } from '../../../interface/perido.interface';
import { PeriodoService } from '../../../layout/service/Talento Humano/periodo.service';
import { DropdownModule } from 'primeng/dropdown';
import { UnidadService } from '../../../layout/service/Talento Humano/unidad.service';
import { Unidad } from '../../../interface/unidad.interface';
import { Cargo } from '../../../interface/cargos.interface';
import { CargoService } from '../../../layout/service/Talento Humano/cargos.service';

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
    InputNumberModule,
    DropdownModule,

  ],
  templateUrl: './unidadcargos.component.html',
  styleUrls: ['./unidadcargos.component.css'],
  providers: [MessageService],
})
export class UnidadCargosComponent implements OnInit {

  unidadCargoDialog: boolean = false;
  deleteUnidadCargoDialog: boolean = false;
  unidadcargo: UnidadCargo = {};
  unidadCargoData: UnidadCargo[] = [];
  periodosData: Periodo[] = []; 
  unidadesData: Unidad[] = [];
  cargosData: Cargo[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];
  
  constructor(
    private unidadcargosService: UnidadCargoService,
    private periodoService: PeriodoService,
    private unidadService: UnidadService,
    private cargoService: CargoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  this.getPeriodos();

  // Cargar unidades y cargos antes de los datos principales
  this.unidadService.getUnidades().subscribe(data => {
    this.unidadesData = Array.isArray(data) ? data : (data.unidades || []);

    this.cargoService.getCargos().subscribe(cargos => {
      this.cargosData = Array.isArray(cargos) ? cargos : (cargos.cargos || []);
      
      this.getUnidadCargo(); // Solo se llama cuando ambos están listos
    });
  });
}


  getUnidadCargo() {
  this.unidadcargosService.getUnidadesCargo().subscribe(data => {
    const unidadesCargos = Array.isArray(data) ? data : (data.unidad_cargo || []);
    
    this.unidadCargoData = unidadesCargos.map(u => {
      const unidad = this.unidadesData.find(un => un.id === u.unidad_id);
      const cargo = this.cargosData.find(ca => ca.id === u.cargo_id);

      return {
        ...u,
        unidad_nombre: unidad ? unidad.nombre : '',
        cargo_nombre: cargo ? cargo.nombre : ''
      };
    });

    console.log('UnidadCargoData:', this.unidadCargoData);
  });
}

getPeriodos() {
  this.periodoService.getPeriodos().subscribe(data => {
    this.periodosData = Array.isArray(data) ? data : (data.periodos || []);
    console.log('Periodos cargados:', this.periodosData);
  });
}
getUnidades() {
    this.unidadService.getUnidades().subscribe(data => {
      this.unidadesData = Array.isArray(data) ? data : (data.unidades || []);
    });
  }
getCargos() {
  this.cargoService.getCargos().subscribe(data => {
    this.cargosData = Array.isArray(data) ? data : (data.cargos || []);
    console.log('Cargos cargados:', this.cargosData);
    
  });
}
  saveOrUpdateUnidadCargo() {
    if (this.unidadcargo.id) {
      this.unidadcargosService.updateUnidadCargo(this.unidadcargo.id, this.unidadcargo).subscribe({
        next: () => {
          this.getUnidadCargo();
          this.unidadCargoDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar unidad:', error);
        }
      });
    } else {
      this.unidadcargosService.saveUnidadCargo(this.unidadcargo).subscribe({
        next: () => {
          this.getUnidadCargo();
          this.unidadCargoDialog = false;
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
    this.unidadCargoDialog = true;
  }

  hideDialog() {
    this.unidadCargoDialog = false;
    this.submitted = false;
  }

  editUnidadCargo(unidad: UnidadCargo) {
    if (unidad.id) {
      this.unidadcargo = { ...unidad };
      this.unidadCargoDialog = true;
    } else {
      console.error('ID no disponible para la unidad seleccionada');
    }
  }
  // Método para obtener el nombre del periodo por su ID
  getPeriodoNombre(periodo_id: number): string {
  const periodo = this.periodosData.find(p => p.id === periodo_id);
  return periodo ? (periodo.nombre ?? '') : '';
}
getUnidadNombre(unidad_id: number): string {
    const unidad = this.unidadesData.find(u => u.id === unidad_id);
    return unidad ? (unidad.nombre ?? '') : '';
  }
  getCargoNombre(cargo_id: any): string {
  const cargo = this.cargosData.find(c => c.id == cargo_id);
  if (!cargo) {
    console.warn('No cargo found for id:', cargo_id, 'in', this.cargosData);
  }
  return cargo ? (cargo.nombre ?? '') : cargo_id?.toString() ?? '';
}
}
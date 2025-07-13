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
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';

import { CargoAsignadoService } from '../../../layout/service/Talento Humano/cargoasignado.service';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';


import { CargoAsignado } from '../../../interface/cargoasignado.interface';
import { Funcionario } from '../../../interface/funcionario.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cargo-asignado',
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
    TabViewModule,
    DropdownModule
  ],
  templateUrl: './cargoasignado.component.html',
  styleUrl: './cargoasignado.component.css',
  providers: [MessageService],
})
export class CargoAsignadoComponent implements OnInit {

  cargoAsignadoDialog: boolean = false;
  deleteCargoAsignadoDialog: boolean = false;

  cargoAsignado: CargoAsignado = {};
  cargosAsignadosData: CargoAsignado[] = [];

  funcionariosData: Funcionario[] = [];
  

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private cargoAsignadoService: CargoAsignadoService,
    private messageService: MessageService,
    private funcionarioService: FuncionarioService,
   // private unidadCargoService: UnidadCargoService
  ) {}

  ngOnInit(): void {
    this.getCargosAsignados();
    this.getFuncionarios();
    
  }

getCargosAsignados() {
  this.cargoAsignadoService.getCargosAsignados().subscribe(data => {
    // Accede a la propiedad cargo_asignado
    const cargos = data.cargo_asignado || [];
    this.cargosAsignadosData = cargos.map(c => ({
      ...c,
      fecha_inicio: c.fecha_inicio ? new Date(c.fecha_inicio) : undefined,
      fecha_fin: c.fecha_fin ? new Date(c.fecha_fin) : undefined
    }));
  });
}
  

  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(data => {
      this.funcionariosData = data.map(f => ({
        ...f,
        nombreCompleto: `${f.nombres} ${f.apellidos}`
      }));
    });
  }

 

  onFuncionarioSelect(event: any) {
    this.cargoAsignado.funcionario_id = event.value;
  }

  onUnidadCargoSelect(event: any) {
    this.cargoAsignado.unidad_cargo_id = event.value;
  }

  saveOrUpdateCargoAsignado() {
    if (this.cargoAsignado.id) {
      this.cargoAsignadoService.updateCargoAsignado(this.cargoAsignado.id, this.cargoAsignado).subscribe({
        next: (data) => {
          this.getCargosAsignados();
          this.cargoAsignadoDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar cargo asignado:', error);
        }
      });
    } else {
      this.cargoAsignadoService.saveCargoAsignado(this.cargoAsignado).subscribe({
        next: (data) => {
          this.getCargosAsignados();
          this.cargoAsignadoDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar cargo asignado:', error);
        }
      });
    }
  }

  deleteCargoAsignado(id: number) {
    this.cargoAsignadoService.deleteCargoAsignado(id).subscribe({
      next: () => {
        this.getCargosAsignados();
      },
      error: (err) => {
        console.error('Error al eliminar cargo asignado:', err);
      }
    });
  }

  openNew() {
    this.cargoAsignado = {} as CargoAsignado;
    this.submitted = false;
    this.cargoAsignadoDialog = true;
  }

  hideDialog() {
    this.cargoAsignadoDialog = false;
    this.submitted = false;
  }

  editCargoAsignado(cargoAsignado: CargoAsignado) {
    if (cargoAsignado.id) {
      this.cargoAsignado = { ...cargoAsignado };
      this.cargoAsignadoDialog = true;
    } else {
      console.error('ID no disponible para el cargo asignado seleccionado');
    }

}

}
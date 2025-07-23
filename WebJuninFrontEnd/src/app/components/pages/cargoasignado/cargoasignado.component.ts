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
import { forkJoin } from 'rxjs';

import { CargoAsignadoService } from '../../../layout/service/Talento Humano/cargoasignado.service';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { UnidadService } from '../../../layout/service/Talento Humano/unidad.service';
import { UnidadCargoService } from '../../../layout/service/Talento Humano/unidadcargo.service';
import { CargoService } from '../../../layout/service/Talento Humano/cargos.service';

import { CargoAsignado } from '../../../interface/cargoasignado.interface';
import { Funcionario } from '../../../interface/funcionario.interface';

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
  styleUrls: ['./cargoasignado.component.css'],
  providers: [MessageService],
})
export class CargoAsignadoComponent implements OnInit {

  cargoAsignadoDialog: boolean = false;
  deleteCargoAsignadoDialog: boolean = false;

  cargoAsignado: CargoAsignado = {};
  cargosAsignadosData: CargoAsignado[] = [];

  funcionariosData: Funcionario[] = [];
  unidadesData: any[] = [];
  cargosData: any[] = [];
  unidadCargosData: any[] = []; // Aquí guardamos los combos cargo+unidad

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private cargoAsignadoService: CargoAsignadoService,
    private messageService: MessageService,
    private funcionarioService: FuncionarioService,
    private unidadService: UnidadService,
    private unidadCargoService: UnidadCargoService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    forkJoin({
      unidades: this.unidadService.getUnidades(),
      cargos: this.cargoService.getCargos(),
      unidadCargos: this.unidadCargoService.getUnidadesCargo(),
      funcionarios: this.funcionarioService.getFuncionarios()
    }).subscribe(({ unidades, cargos, unidadCargos, funcionarios }) => {
      this.unidadesData = Array.isArray(unidades) ? unidades : (unidades.unidades || []);
      this.cargosData = Array.isArray(cargos) ? cargos : (cargos.cargos || []);
      const unidadCargosArray = Array.isArray(unidadCargos) ? unidadCargos : (unidadCargos.unidad_cargo || []);
      this.funcionariosData = Array.isArray(funcionarios)
        ? funcionarios
        : ((funcionarios as { funcionarios?: Funcionario[] }).funcionarios || []);

      // Mapeamos unidadCargos para mostrar "Cargo - Unidad"
      this.unidadCargosData = unidadCargosArray.map(uc => {
        const unidad = this.unidadesData.find(u => u.id === uc.unidad_id);
        const cargo = this.cargosData.find(c => c.id === uc.cargo_id);
        return {
          id: uc.id,
          label: `${cargo ? cargo.nombre : 'Sin cargo'} - ${unidad ? unidad.nombre : 'Sin unidad'}`,
          value: uc.id
        };
      });

      this.getCargosAsignados();
    });
  }

  getCargosAsignados() {
    this.cargoAsignadoService.getCargosAsignados().subscribe(data => {
      const cargos = data.cargo_asignado || [];

      this.cargosAsignadosData = cargos.map(c => {
        const fecha_inicio = c.fecha_inicio ? new Date(c.fecha_inicio) : undefined;
        const fecha_fin = c.fecha_fin ? new Date(c.fecha_fin) : undefined;

        const unidadCargo = this.unidadCargosData.find(uc => uc.value === c.unidad_cargo_id);
        const unidad_cargo_nombre = unidadCargo ? unidadCargo.label : '';

        return {
          ...c,
          fecha_inicio,
          fecha_fin,
          unidad_cargo_nombre
        };
      });
    });
  }

  saveOrUpdateCargoAsignado() {
    if (this.cargoAsignado.id) {
      this.cargoAsignadoService.updateCargoAsignado(this.cargoAsignado.id, this.cargoAsignado).subscribe({
        next: () => {
          this.getCargosAsignados();
          this.cargoAsignadoDialog = false;
        },
        error: error => console.error('Error al actualizar cargo asignado:', error)
      });
    } else {
      this.cargoAsignadoService.saveCargoAsignado(this.cargoAsignado).subscribe({
        next: () => {
          this.getCargosAsignados();
          this.cargoAsignadoDialog = false;
        },
        error: error => console.error('Error al guardar cargo asignado:', error)
      });
    }
  }

  deleteCargoAsignado(id: number) {
    this.cargoAsignadoService.deleteCargoAsignado(id).subscribe({
      next: () => this.getCargosAsignados(),
      error: err => console.error('Error al eliminar cargo asignado:', err)
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

  getFuncionarioNombre(funcionario_id: number): string {
    const funcionario = this.funcionariosData.find(f => f.id == funcionario_id);
    if (funcionario) {
      return `${funcionario.nombres ?? ''} ${funcionario.apellidos ?? ''}`.trim();
    }
    return funcionario_id ? funcionario_id.toString() : '';
  }
}

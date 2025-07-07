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
import { TabViewModule } from 'primeng/tabview'; // ✅ IMPORTACIÓN NECESARIA
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { Funcionario } from '../../../interface/funcionario.interface';
import { Capacitaciones } from '../../../interface/capacitaciones.interface';
import { CapacitacionesService } from '../../../layout/service/Talento Humano/capacitaciones.service';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-capacitaciones',
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
    DropdownModule // ✅ AGREGADO AQUÍ
  ],
  templateUrl: './capacitaciones.component.html',
  styleUrl: './capacitaciones.component.css',
  providers: [MessageService],
})
export class CapacitacionesComponent implements OnInit {

  CapacitacionesDialog: boolean = false;
  deleteecapacitacionesDialog: boolean = false;

  capacitaciones: Capacitaciones = {};
  capacitacionesdata: Capacitaciones[] = [];

  submitted: boolean = false;

  rowsPerPageOptions: number[] = [5, 10, 20];

  // Campos individuales (opcional si los usas en el formulario)
  descripcion: string = '';
  fecha_inicio: string = '';
  fecha_fin: string = '';
  n_horas: string = '';
  funcionario_id?: number;
  funcionariosData: Funcionario[] = [];
  funcionarios: { nombres: string , apellidos: string } = { nombres: '' ,apellidos: '' };

  constructor(
    private CapacitacionesService: CapacitacionesService,
    private MessageService: MessageService,
    private FuncionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.getCapacitaciones(); // ✅ Carga los datos aquí
    this.getFuncionarios(); // Cargar funcionarios para el dropdown
  }

  getCapacitaciones() {
    this.CapacitacionesService.getCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesdata = data;
        console.log('Datos recibidos:', this.capacitacionesdata);
      },
      error: (error) => {
        console.error('Error al obtener capacitaciones:', error);
      }
    });
  }
    getFuncionarios() {
  this.FuncionarioService.getFuncionarios().subscribe(data => {
    // Combina nombres y apellidos en un solo campo para el dropdown
    this.funcionariosData = data.map(f => ({
      ...f,
      nombreCompleto: `${f.nombres} ${f.apellidos}`
    }));
  });
}
onFuncionarioSelect(event: any) {
  // Si usas optionValue="id", esto ya asigna el id directamente
  this.capacitaciones.funcionario_id = event.value;
}
  getCapacitacionesById(id: number) {
    this.CapacitacionesService.getCapacitacionesById(id).subscribe({
      next: (data) => {
        this.capacitaciones = Array.isArray(data) ? data[0] : data;
        console.log('Capacitaciones encontrado:', this.capacitaciones);
      },
      error: (err) => {
        console.error('Error al buscar capacitaciones:', err);
      }
    });
  }

  saveOrUpdateCapacitaciones() {
    if (this.capacitaciones.id) {
      this.CapacitacionesService.updateCapacitaciones(this.capacitaciones.id, this.capacitaciones).subscribe({
        next: (data) => {
          console.log('Capacitaciones actualizadas:', data);
          this.getCapacitaciones();
          this.CapacitacionesDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar capacitaciones:', error);
        }
      });
    } else {
      this.CapacitacionesService.saveCapacitaciones(this.capacitaciones).subscribe({
        next: (data) => {
          console.log('Capacitaciones guardadas:', data);
          this.getCapacitaciones();
          this.CapacitacionesDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar Capacitaciones:', error);
        }
      });
    }
  }

  deleteCapacitaciones(id: number) {
    this.CapacitacionesService.deleteCapacitaciones(id).subscribe({
      next: (msg) => {
        console.log('Capacitaciones eliminadas:', msg);
        this.getCapacitaciones();
      },
      error: (err) => {
        console.error('Error al eliminar Capacitaciones:', err);
      }
    });
  }

  openNew() {
    this.capacitaciones = {} as Capacitaciones;
    this.submitted = false;
    this.CapacitacionesDialog = true;
  }

  hideDialog() {
    this.CapacitacionesDialog = false;
    this.submitted = false;
  }

  editCapacitaciones(capacitaciones: Capacitaciones) {
    if (capacitaciones.id) {
      this.capacitaciones = { ...capacitaciones };
      this.CapacitacionesDialog = true;
    } else {
      console.error('ID no disponible para la capacitacion seleccionado');
    }
  }
}

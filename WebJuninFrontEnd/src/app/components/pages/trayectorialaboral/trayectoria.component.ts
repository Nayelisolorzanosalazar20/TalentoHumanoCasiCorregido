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
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { Funcionario } from '../../../interface/funcionario.interface';
import { DropdownModule } from 'primeng/dropdown';
import { Trayectoria } from '../../../interface/trayectoria.interface';
import { TrayectoriaService } from '../../../layout/service/Talento Humano/trayectoria.service';


@Component({
  selector: 'app-trayectoria',
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
  templateUrl: './trayectoria.component.html',
  styleUrl: './trayectoria.component.css',
  providers: [MessageService],
})
export class TrayectoriaComponent implements OnInit {

  TrayectoriaDialog: boolean = false;
  deleteetrayectoriaDialog: boolean = false;

  trayectoria: Trayectoria = {};
  trayectoriadata: Trayectoria[] = [];

  submitted: boolean = false;

  rowsPerPageOptions: number[] = [5, 10, 20];

  // Campos individuales (opcional si los usas en el formulario)
 // Campos individuales (opcional si los usas en el formulario)
  nombre_institucion: string = '';
  fecha_ingreso: Date | null = null;
  fecha_salida: Date | null = null;
  nombre_cargo: string = '';
  funcionarios_id?: number;
  funcionariosData: Funcionario[] = [];
  funcionarios: { nombres: string , apellidos: string } = { nombres: '' ,apellidos: '' };
  

  constructor(
    private TrayectoriaService: TrayectoriaService,
    private MessageService: MessageService,
    private FuncionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.getTrayectoria(); // ✅ Carga los datos aquí
    this.getFuncionarios(); // Cargar funcionarios para el dropdown
  }

  getTrayectoria() {
    this.TrayectoriaService.getTrayectoria().subscribe({
      next: (data) => {
        this.trayectoriadata = data;
        console.log('Datos recibidos:', this.trayectoriadata);
      },
      error: (error) => {
        console.error('Error al obtener trayectoria:', error);
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
  this.trayectoria.funcionario_id = event.value;
}
  getTrayectoriaById(id: number) {
    this.TrayectoriaService.getTrayectoriaById(id).subscribe({
      next: (data) => {
        this.trayectoria = data;
        console.log('Trayectoria encontrado:', this.trayectoria);
      },
      error: (err) => {
        console.error('Error al buscar trayectoria:', err);
      }
    });
  }

  saveOrUpdateTrayectoria() {
    if (this.trayectoria.id) {
      this.TrayectoriaService.updateTrayectoria(this.trayectoria.id, this.trayectoria).subscribe({
        next: (data) => {
          console.log('trayectoria actualizadas:', data);
          this.getTrayectoria();
          this.TrayectoriaDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar trayectoria:', error);
        }
      });
    } else {
      this.TrayectoriaService.saveTrayectoria(this.trayectoria).subscribe({
        next: (data) => {
          console.log('Trayectoria guardadas:', data);
          this.getTrayectoria();
          this.TrayectoriaDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar trayectoria:', error);
        }
      });
    }
  }

  deleteTrayectoria(id: number) {
    this.TrayectoriaService.deleteTrayectoria(id).subscribe({
      next: (msg) => {
        console.log('Trayectoria eliminadas:', msg);
        this.getTrayectoria();
      },
      error: (err) => {
        console.error('Error al eliminar Trayectoria:', err);
      }
    });
  }

  openNew() {
    this.trayectoria = {} as Trayectoria;
    this.submitted = false;
    this.TrayectoriaDialog = true;
  }

  hideDialog() {
    this.TrayectoriaDialog = false;
    this.submitted = false;
  }

  editTrayectoria(trayectoria: Trayectoria) {
    if (trayectoria.id) {
      this.trayectoria = { ...trayectoria };
      this.TrayectoriaDialog = true;
    } else {
      console.error('ID no disponible para la trayectoria seleccionado');
    }
  }
}

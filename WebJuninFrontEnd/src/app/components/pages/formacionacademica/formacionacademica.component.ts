export class FormacionAcademicaComponent {}import { CommonModule } from '@angular/common';
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
import { DropdownModule } from 'primeng/dropdown';
import { Formacion } from '../../../interface/formacion.interface';
import { FormacionService } from '../../../layout/service/Talento Humano/formacionacademica.service';
@Component({
  selector: 'app-formacion',
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
  templateUrl: './formacionacademica.component.html',
  styleUrl: './formacionacademica.component.css',
  providers: [MessageService],
})
export class FormacionComponent implements OnInit {

  FormacionDialog: boolean = false;
  deleteeformacionDialog: boolean = false;

  formacion: Formacion = {};
  formaciondata: Formacion[] = [];

  submitted: boolean = false;

  rowsPerPageOptions: number[] = [5, 10, 20];

  // Campos individuales (opcional si los usas en el formulario)
 // Campos individuales (opcional si los usas en el formulario)
  institucion: string = '';
  titulo_obtenido: string = '';
  n_registro?: string = '';
  especialidad: string = '';
  fecha_registro: Date | null = null;
  funcionario_id?: number;
  funcionariosData: Funcionario[] = [];
  funcionarios: { nombres: string , apellidos: string } = { nombres: '' ,apellidos: '' };
    

  constructor(
    private FormacionService: FormacionService,
    private MessageService: MessageService,
    private FuncionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.getFormacion(); // ✅ Carga los datos aquí
    this.getFuncionarios();
 
  }


  getFormacion() {
    this.FormacionService.getFormacion().subscribe({
      next: (data) => {
        this.formaciondata = data;
        console.log('Datos recibidos:', this.formaciondata);
      },
      error: (error) => {
        console.error('Error al obtener formacion:', error);
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
  this.formacion.funcionario_id = event.value;
}
  getFormacionById(id: number) {
    this.FormacionService.getFormacionById(id).subscribe({
      next: (data) => {
        this.formacion = data;
        console.log('Formacion academica encontrado:', this.formacion);
      },
      error: (err) => {
        console.error('Error al buscar formacion:', err);
      }
    });
  }

  saveOrUpdateFormacion() {
    if (this.formacion.id) {
      this.FormacionService.updateFormacion(this.formacion.id, this.formacion).subscribe({
        next: (data) => {
          console.log('formacion actualizadas:', data);
          this.getFormacion();
          this.FormacionDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar formacion:', error);
        }
      });
    } else {
      this.FormacionService.saveFormacion(this.formacion).subscribe({
        next: (data) => {
          console.log('Formacion guardadas:', data);
          this.getFormacion();
          this.FormacionDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar formacion:', error);
        }
      });
    }
  }

  deleteFormacion(id: number) {
    this.FormacionService.deleteFormacion(id).subscribe({
      next: (msg) => {
        console.log('Formacion eliminadas:', msg);
        this.getFormacion();
      },
      error: (err) => {
        console.error('Error al eliminar Formacion:', err);
      }
    });
  }

  openNew() {
    this.formacion = {} as Formacion;
    this.submitted = false;
    this.FormacionDialog = true;
  }

  hideDialog() {
    this.FormacionDialog = false;
    this.submitted = false;
  }

  editFormacion(formacion: Formacion) {
    if (formacion.id) {
      this.formacion = { ...formacion };
      this.FormacionDialog = true;
    } else {
      console.error('ID no disponible para la formacion seleccionado');
    }
  }
}

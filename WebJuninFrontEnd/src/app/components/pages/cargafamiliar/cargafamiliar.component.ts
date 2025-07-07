import { Component } from '@angular/core';
import { CargaFamiliar } from '../../../interface/cargafamiliar.interface';
import { CargaFamiliarService } from '../../../layout/service/Talento Humano/cargafamiliar.service';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { Funcionario } from '../../../interface/funcionario.interface';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cargafamiliar',
  standalone: true,
  imports: [
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    DropdownModule 
  ],
  templateUrl: './cargafamiliar.component.html',
  styleUrls: ['./cargafamiliar.component.css'],
  providers: [MessageService],
})
export class CargaFamiliarComponent {
  cargaFamiliarDialog: boolean = false;
  deleteCargaFamiliarDialog: boolean = false;
  cargaFamiliar: CargaFamiliar = {};
  cargaFamiliarData: CargaFamiliar[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];
  nombre_persona:string='';
  cedula:string='';
  nivel_educativo:string='';
  parentesco:string='';
  funcionario_id:number=0;
  funcionariosData: Funcionario[] = [];
  funcionarios: { nombres: string , apellidos: string } = { nombres: '' ,apellidos: '' };
  

  constructor(
    private cargaFamiliarService: CargaFamiliarService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
      this.getCargaFamiliar();
       this.getFuncionarios();
  }

  getCargaFamiliar() {
    this.cargaFamiliarService.getCargaFamiliar().subscribe(data => {
      this.cargaFamiliarData =  data; 
      console.log('Datos recibidos:',this.cargaFamiliarData);

    });
  }

  getFuncionarios() {
  this.funcionarioService.getFuncionarios().subscribe(data => {
    // Combina nombres y apellidos en un solo campo para el dropdown
    this.funcionariosData = data.map(f => ({
      ...f,
      nombreCompleto: `${f.nombres} ${f.apellidos}`
    }));
  });
}
  getCargaFamiliarById(id: number) {
    this.cargaFamiliarService.getCargaFamiliarById(id).subscribe((data) => {
      this.cargaFamiliar = data;
      console.log('Carga familiar encontrada:', this.cargaFamiliar);
    });
  }



  saveOrUpdateCargaFamiliar() {
    if (this.cargaFamiliar.id) {
      this.cargaFamiliarService.updateCargaFamiliar(this.cargaFamiliar.id, this.cargaFamiliar).subscribe(
        data => {
          console.log('Carga familiar actualizada:', data);
          this.getCargaFamiliar();
          this.cargaFamiliarDialog = false;
        },
        error => {
          console.error('Error al actualizar carga familiar:', error);
        }
      );
    } else {
      this.cargaFamiliarService.saveCargaFamiliar(this.cargaFamiliar).subscribe(
        data => {
          console.log('Carga familiar guardada:', data);
          this.getCargaFamiliar();
          this.cargaFamiliarDialog = false;
        },
        error => {
          console.error('Error al guardar carga familiar:', error);
        }
      );
    }
  }
onFuncionarioSelect(event: any) {
  // Si usas optionValue="id", esto ya asigna el id directamente
  this.cargaFamiliar.funcionario_id = event.value;
}
  deleteCargaFamiliar(id: number) {
    this.cargaFamiliarService.deleteCargaFamiliar(id).subscribe(msg => {
      console.log('Eliminado:', msg);
      this.getCargaFamiliar();
    });
  }

  openNew() {
    this.cargaFamiliar = {} as CargaFamiliar;
    this.submitted = false;
    this.cargaFamiliarDialog = true;
  }

  hideDialog() {
    this.cargaFamiliarDialog = false;
    this.submitted = false;
  }

  editCargaFamiliar(cargaFamiliar: CargaFamiliar) {
    if (cargaFamiliar.id) {
      this.cargaFamiliar = { ...cargaFamiliar };
      this.cargaFamiliarDialog = true;
    } else {
      console.error('ID no disponible para la carga familiar seleccionada');
    }
  }
}

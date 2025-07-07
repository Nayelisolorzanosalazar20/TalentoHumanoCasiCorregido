import { Component } from '@angular/core';
import { InstitucionBancaria } from '../../../interface/institucionbancaria.interface';
import { InstitucionBancariaService } from '../../../layout/service/Talento Humano/institucionbancaria.service';
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
import { DropdownModule } from 'primeng/dropdown';
import { InstitucionFinanciera } from '../../../interface/institucionfinanciera.interface';
import { InstitucionFinancieraService } from '../../../layout/service/Talento Humano/institucionfinanciera.service';
import { Funcionario } from '../../../interface/funcionario.interface';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';


@Component({
  selector: 'app-institucionbancaria',
  standalone: true,
  imports: [
    DropdownModule,
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule
  ],
  templateUrl: './institucionbancaria.component.html',
  styleUrls: ['./institucionbancaria.component.css'],
  providers: [MessageService],
})
export class InstitucionBancariaComponent {
  institucionBancariaDialog: boolean = false;
  deleteInstitucionBancariaDialog: boolean = false;
  institucionBancaria: InstitucionBancaria = {};
  institucionBancariaData: InstitucionBancaria[] = [];
  institucionFinancieraData: InstitucionFinanciera[] = [];
  funcionariosData: Funcionario[] = []; // Asumiendo que tienes un servicio para obtener funcionarios
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private institucionBancariaService: InstitucionBancariaService,
    private institucionFinancieraService: InstitucionFinancieraService,
    private messageService: MessageService,
    private FuncionarioService: FuncionarioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getInstitucionBancaria();
    this.getInstitucionFinanciera();
    this.getFuncionario();

  }

  getInstitucionBancaria() {
    this.institucionBancariaService.getInstitucionBancaria().subscribe(data => {
      this.institucionBancariaData = data;
      console.log('Datos recibidos:', this.institucionBancariaData);
    });
  }

  getInstitucionBancariaById(id: number) {
    this.institucionBancariaService.getInstitucionBancariaById(id).subscribe((data) => {
      this.institucionBancaria = data;
      console.log('Institución bancaria encontrada:', this.institucionBancaria);
    });
}
getInstitucionFinanciera() {
  this.institucionFinancieraService.getInstitucionFinanciera().subscribe(data => {
    this.institucionFinancieraData = data;
  });
}
getFuncionario() {
  this.FuncionarioService.getFuncionarios().subscribe(data => {
    console.log('Funcionarios recibidos:', data);
    this.funcionariosData = data.map(f => ({
      ...f,
      nombreCompleto: `${f.nombres} ${f.apellidos}`
    }));
  });
}

  saveOrUpdateInstitucionBancaria() {
    console.log('Datos recibidos:', this.institucionBancaria);
    if (this.institucionBancaria.id) {
      this.institucionBancariaService.updateInstitucionBancaria(this.institucionBancaria.id, this.institucionBancaria).subscribe(
        data => {
          console.log('Institución bancaria actualizada:', data);
          this.getInstitucionBancaria();
          this.institucionBancariaDialog = false;
        },
        error => {
          console.error('Error al actualizar institución bancaria:', error);
        }
      );
    } else {
      this.institucionBancariaService.saveInstitucionBancaria(this.institucionBancaria).subscribe(
        data => {
          console.log('Institución bancaria guardada:', data);
          this.getInstitucionBancaria();
          this.institucionBancariaDialog = false;
        },
        error => {
          console.error('Error al guardar institución bancaria:', error);
        }
      );
    }
  }

  deleteInstitucionBancaria(id: number) {
    this.institucionBancariaService.deleteInstitucionBancaria(id).subscribe(msg => {
      console.log('Eliminado:', msg);
      this.getInstitucionBancaria();
    });
  }

  openNew() {
    this.institucionBancaria = {} as InstitucionBancaria;
    this.submitted = false;
    this.institucionBancariaDialog = true;
    this.institucionBancaria = {}; // Limpia el formulario
    this.getFuncionario(); // Carga los funcionarios al abrir el diálogo

  }

  hideDialog() {
    this.institucionBancariaDialog = false;
    this.submitted = false;
  }

  editInstitucionBancaria(institucionBancaria: InstitucionBancaria) {
    if (institucionBancaria.id) {
      this.institucionBancaria = { ...institucionBancaria };
      this.institucionBancariaDialog = true;
    } else {
      console.error('ID no disponible para la institución bancaria seleccionada');
    }
  }
}
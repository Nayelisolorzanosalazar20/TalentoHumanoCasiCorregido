import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InstitucionFinanciera } from '../../../interface/institucionfinanciera.interface';
import { InstitucionFinancieraService } from '../../../layout/service/Talento Humano/institucionfinanciera.service';

@Component({
  selector: 'app-institucionfinanciera',
  standalone: true,
  imports: [
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule
  ],
  templateUrl: './institucionfinanciera.component.html',
  styleUrls: ['./institucionfinanciera.component.css'],
  providers: [MessageService],
})
export class InstitucionFinancieraComponent {
  institucionfinancieraDialog: boolean = false;
  deleteInstitucionfinancieraDialog: boolean = false;
  institucionfinanciera: InstitucionFinanciera = {};
  institucionfinancieradata: InstitucionFinanciera[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private institucionFinancieraService: InstitucionFinancieraService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getInstitucionFinanciera();
  }

  getInstitucionFinanciera() {
    this.institucionFinancieraService.getInstitucionFinanciera().subscribe((data) => {
      this.institucionfinancieradata = data;
      console.log(this.institucionfinancieradata);
    });
  }

  getInstitucionFinancieraById(id: number) {
    this.institucionFinancieraService.getInstitucionFinancieraById(id).subscribe((data) => {
      this.institucionfinanciera = data;
      console.log('Institución financiera encontrada:', this.institucionfinanciera);
    });
  }

  saveOrUpdateInstitucionFinanciera() {
    if (!this.institucionfinanciera.nombre_institucion) {
      this.submitted = true;
      return;
    }

    if (this.institucionfinanciera.id) {
      // Actualizar
      this.institucionFinancieraService.updateInstitucionFinanciera(this.institucionfinanciera.id, this.institucionfinanciera).subscribe({
        next: (response) => {
          console.log('Institución financiera actualizada:', response);
          this.getInstitucionFinanciera();
          this.institucionfinancieraDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar institución financiera:', error);
        },
      });
    } else {
      // Nuevo
      this.institucionFinancieraService.saveInstitucionFinanciera(this.institucionfinanciera).subscribe({
        next: (response) => {
          console.log('Institución financiera guardada:', response);
          this.getInstitucionFinanciera();
          this.institucionfinancieraDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar institución financiera:', error);
        },
      });
    }
  }

  deleteInstitucionFinanciera(id: number) {
    this.institucionFinancieraService.deleteInstitucionFinanciera(id).subscribe((msg) => {
      console.log('Eliminado:', msg);
      this.getInstitucionFinanciera();
    });
  }

  openNew() {
    this.institucionfinanciera = {} as InstitucionFinanciera;
    this.submitted = false;
    this.institucionfinancieraDialog = true;
  }

  hideDialog() {
    this.institucionfinancieraDialog = false;
    this.submitted = false;
  }

  editInstitucionFinanciera(info: InstitucionFinanciera) {
    if (info.id) {
      this.institucionfinanciera = { ...info };
      this.institucionfinancieraDialog = true;
    } else {
      console.error('ID no disponible para la institución financiera seleccionada');
    }
  }
}
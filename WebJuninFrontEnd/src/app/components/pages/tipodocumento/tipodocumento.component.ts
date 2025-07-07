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
import { Tipodocumento } from '../../../interface/tipodocumuento.interface';
import { TipodocumentoService } from '../../../layout/service/Talento Humano/tipodocumento.service';

@Component({
  selector: 'app-tipodocumento',
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
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css'],
  providers: [MessageService],
})
export class TipodocumentoComponent {
  tipodocumentoDialog: boolean = false;
  deleteTipodocumentoDialog: boolean = false;
  tipodocumento: Tipodocumento = {};
  tipodocumentodata: Tipodocumento[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private tipodocumentoService: TipodocumentoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getTipodocumento();
  }

  getTipodocumento() {
    this.tipodocumentoService.getTipodocumento().subscribe((data) => {
      this.tipodocumentodata = data;
      console.log(this.tipodocumentodata);
    });
  }

  getTipodocumentoById(id: number) {
    this.tipodocumentoService.getTipodocumentoById(id).subscribe((data) => {
      this.tipodocumento = data;
      console.log('TipoDocumento encontrado:', this.tipodocumento);
    });
  }

  saveOrUpdateTipodocumento() {
    if (!this.tipodocumento.nombre_archivo) {
      this.submitted = true;
      return;
    }

    if (this.tipodocumento.id) {
      // Actualizar
      this.tipodocumentoService.updateTipodocumento(this.tipodocumento.id, this.tipodocumento).subscribe({
        next: (response) => {
          console.log('TipoDocumento actualizado:', response);
          this.getTipodocumento();
          this.tipodocumentoDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar tipo de documento:', error);
        },
      });
    } else {
      // Nuevo
      this.tipodocumentoService.saveTipodocumento(this.tipodocumento).subscribe({
        next: (response) => {
          console.log('TipoDocumento guardado:', response);
          this.getTipodocumento();
          this.tipodocumentoDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar tipo de documento:', error);
        },
      });
    }
  }

  deleteTipodocumento(id: number) {
    this.tipodocumentoService.deleteTipodocumento(id).subscribe((msg) => {
      console.log('Eliminado:', msg);
      this.getTipodocumento();
    });
  }

  openNew() {
    this.tipodocumento = {} as Tipodocumento;
    this.submitted = false;
    this.tipodocumentoDialog = true;
  }

  hideDialog() {
    this.tipodocumentoDialog = false;
    this.submitted = false;
  }

  editTipodocumento(tipodocumento: Tipodocumento) {
    if (tipodocumento.id) {
      this.tipodocumento = { ...tipodocumento };
      this.tipodocumentoDialog = true;
    } else {
      console.error('ID no disponible para el tipo de documento seleccionado');
    }
  }
}
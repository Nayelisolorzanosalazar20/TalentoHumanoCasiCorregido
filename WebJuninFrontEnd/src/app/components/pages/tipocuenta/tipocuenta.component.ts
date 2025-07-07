import { Component } from '@angular/core';
import { TipoCuenta } from '../../../interface/tipocuenta.interface';
import { TipoCuentaService } from '../../../layout/service/Talento Humano/tipocuenta.service';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-tipocuenta',
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
  templateUrl: './tipocuenta.component.html',
  styleUrl: './tipocuenta.component.css',
  providers: [MessageService],
})
export class TipocuentaComponent {

  tipoCuentaDialog: boolean = false;
  deleteTipoCuentaDialog: boolean = false;
  tipoCuenta: TipoCuenta = {};
  tipoCuentaData: TipoCuenta[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private tipoCuentaService: TipoCuentaService,
    private messageService: MessageService
  ) {
    this.getTiposCuenta();
  }

  ngOnInit(): void {}

  getTiposCuenta() {
    this.tipoCuentaService.getTiposCuenta().subscribe(data => {
      this.tipoCuentaData = data;
      console.log(this.tipoCuentaData);
    });
  }

  getTipoCuentaById(id: number) {
    this.tipoCuentaService.getTipoCuentaById(id).subscribe(data => {
      this.tipoCuenta = data;
      console.log('Tipo de cuenta encontrado:', this.tipoCuenta);
    });
  }

  saveOrUpdateTipoCuenta() {
    if (this.tipoCuenta.id) {
      // Actualizar
      this.tipoCuentaService.updateTipoCuenta(this.tipoCuenta.id, this.tipoCuenta).subscribe(
        data => {
          console.log('Tipo de cuenta actualizado:', data);
          this.getTiposCuenta();
          this.tipoCuentaDialog = false;
        },
        error => {
          console.error('Error al actualizar tipo de cuenta:', error);
        }
      );
    } else {
      // Guardar
       // Guardar
      this.tipoCuentaService.saveTipoCuenta(this.tipoCuenta).subscribe(
        data => {
          console.log('Tipo de cuenta guardado:', data);
          this.getTiposCuenta();
          this.tipoCuentaDialog = false;
        },
        error => {
          console.error('Error al guardar tipo de cuenta:', error);
        }
      );
    }
  }

  deleteTipoCuenta(id: number) {
    this.tipoCuentaService.deleteTipoCuenta(id).subscribe(msg => {
      console.log('Eliminado:', msg);
      this.getTiposCuenta();
    });
  }

  openNew() {
    this.tipoCuenta = {} as TipoCuenta;
    this.submitted = false;
    this.tipoCuentaDialog = true;
  }

  hideDialog() {
    this.tipoCuentaDialog = false;
    this.submitted = false;
  }

  editTipoCuenta(tipoCuenta: TipoCuenta) {
    if (tipoCuenta.id) {
      this.tipoCuenta = { ...tipoCuenta };
      this.tipoCuentaDialog = true;
    } else {
      console.error('ID no disponible para el tipo de cuenta seleccionado');
    }
  }

}
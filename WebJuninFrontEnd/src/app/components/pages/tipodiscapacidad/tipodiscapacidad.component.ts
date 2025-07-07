import { Component } from '@angular/core';
import { Tipodiscapacidad } from '../../../interface/tipodiscapacidad.interface';
import { TipodiscapacidadService } from '../../../layout/service/Talento Humano/tipodiscapacidad.service';
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
  selector: 'app-tipodiscapacidad',
  standalone: true,
  imports: [InputNumberModule,
              CommonModule,
              FormsModule,
              TableModule,
              ToolbarModule,
              ButtonModule,
              RippleModule,
              DialogModule],
  templateUrl: './tipodiscapacidad.component.html',
  styleUrl: './tipodiscapacidad.component.css',
  providers: [MessageService],
})
export class TipodiscapacidadComponent {


       TipodiscapacidadDialog: boolean = false;
          deletetipodiscapacidadaDialog: boolean = false;
          tcapacidad:Tipodiscapacidad={};
          tipodiscapacidaddata: Tipodiscapacidad[]=[];
          submitted: boolean = false;
          rowsPerPageOptions: number[] = [5,10,20];
          descripcion:string='';

            constructor(private TipodiscapacidadService:TipodiscapacidadService, private MessageService: MessageService){
              this.getTipodiscapacidad();
            }

            ngOnInit(): void {
            }

            getTipodiscapacidad(){
                this.TipodiscapacidadService.getTipodiscapacidad().subscribe(data => {this.tipodiscapacidaddata = data;
                  console.log(this.tipodiscapacidaddata)});
              }

              getTipodiscapacidadById(id: number) {
                this.TipodiscapacidadService.getTipodiscapacidadById(id).subscribe(data => {
                  this.tcapacidad = data;
                  console.log('Tipo discapacidad encontrado:', this.tcapacidad);
                });
              }


              saveOrUpdateTipodiscapacidad() {
                if (this.tcapacidad.id) {
                  // Actualizar
                  this.TipodiscapacidadService.updateTipodiscapacidad(this.tcapacidad.id, this.tcapacidad).subscribe(
                    data => {
                      console.log('Tipo discapacidad actualizado:', data);
                      this.getTipodiscapacidad();
                      this.TipodiscapacidadDialog = false;
                    },
                    error => {
                      console.error('Error al actualizar tipo discapacidad:', error);
                    }
                  );
                } else {
                  // Guardar
                  this.TipodiscapacidadService.saveTipodiscapacidad(this.tcapacidad).subscribe(
                    data => {
                      console.log('Estado civil guardado:', data);
                      this.getTipodiscapacidad();
                      this.TipodiscapacidadDialog = false;
                    },
                    error => {
                      console.error('Error al guardar tipo de discapacidad:', error);
                    }
                  );
                }
              }


              deleteTipodiscapacidad(id: number) {
                this.TipodiscapacidadService.deleteTipodiscapacidad(id).subscribe(msg => {
                  console.log('Eliminado:', msg);
                  this.getTipodiscapacidad(); // Recargar la lista
                });
              }


              openNew() {
                this.tcapacidad = {} as Tipodiscapacidad ;
                this.submitted = false;
                this.TipodiscapacidadDialog = true;
              }




              hideDialog() {
                this.TipodiscapacidadDialog = false;
                this.submitted = false;
              }


              editTipodiscapacidad(tipo_discapacidad: Tipodiscapacidad) {
                if (tipo_discapacidad.id) {
                  this.tcapacidad = { ...tipo_discapacidad };  // Asignar los datos de la etnia seleccionada
                  this.TipodiscapacidadDialog = true;   // Mostrar el diálogo de edición
                } else {
                  console.error('ID no disponible para el tipo de discapacidad seleccionado');
                }
              }


}

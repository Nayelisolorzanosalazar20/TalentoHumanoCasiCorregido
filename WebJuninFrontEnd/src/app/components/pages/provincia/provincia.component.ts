import { Component } from '@angular/core';
import { ProvinciaService } from '../../../layout/service/Talento Humano/provincia.service';
import { MessageService } from 'primeng/api';
import { Provincia } from '../../../interface/provincia.interface.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-provincia',
  standalone: true,
  imports: [InputNumberModule,
                CommonModule,
                FormsModule,
                TableModule,
                ToolbarModule,
                ButtonModule,
                RippleModule,
                DialogModule],
  templateUrl: './provincia.component.html',
  styleUrl: './provincia.component.css',
  providers: [MessageService],
})
export class ProvinciaComponent {
  ProvinciaDialog: boolean = false;
          deleteprovinciaDialog: boolean = false;
          provincia:Provincia={};
          provinciadata: Provincia[]=[];
          submitted: boolean = false;
          rowsPerPageOptions: number[] = [5,10,20];
          nombre_provincia:string='';

            constructor(private ProvinciaService:ProvinciaService, private MessageService: MessageService){
              this.getProvincia();
            }

            ngOnInit(): void {
            }

            getProvincia(){
                this.ProvinciaService.getProvincia().subscribe(data => {this.provinciadata = data;
                  console.log(this.provinciadata)});
              }

              getProvinciaById(id: number) {
                this.ProvinciaService.getProvinciaById(id).subscribe(data => {
                  this.provincia = data;
                  console.log('Provincia encontrado:', this.provincia);
                });
              }


              saveOrUpdateProvincia() {
                if (this.provincia.id) {
                  // Actualizar
                  this.ProvinciaService.updateProvincia(this.provincia.id, this.provincia).subscribe(
                    data => {
                      console.log('Provincia actualizado:', data);
                      this.getProvincia();
                      this.ProvinciaDialog = false;
                    },
                    error => {
                      console.error('Error al actualizar provincia:', error);
                    }
                  );
                } else {
                  // Guardar
                  this.ProvinciaService.saveProvincia(this.provincia).subscribe(
                    data => {
                      console.log('Provincia guardada:', data);
                      this.getProvincia();
                      this.ProvinciaDialog = false;
                    },
                    error => {
                      console.error('Error al guardar la provincia:', error);
                    }
                  );
                }
              }


              deleteProvincia(id: number) {
                this.ProvinciaService.deleteProvincia(id).subscribe(msg => {
                  console.log('Eliminado:', msg);
                  this.getProvincia(); // Recargar la lista
                });
              }


              openNew() {
                this.provincia = {} as Provincia ;
                this.submitted = false;
                this.ProvinciaDialog = true;
              }




              hideDialog() {
                this.ProvinciaDialog = false;
                this.submitted = false;
              }


              editProvincia(provincia: Provincia) {
                if (provincia.id) {
                  this.provincia = { ...provincia };  // Asignar los datos de la etnia seleccionada
                  this.ProvinciaDialog = true;   // Mostrar el diálogo de edición
                } else {
                  console.error('ID no disponible para el genero seleccionado');
                }
              }

}

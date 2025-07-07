import { Component } from '@angular/core';
import { Parroquia } from '../../../interface/parroquia.interface.interface';
import { ParroquiaService } from '../../../layout/service/Talento Humano/parroquia.service';
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
  selector: 'app-parroquia',
  standalone: true,
  imports: [InputNumberModule,
              CommonModule,
              FormsModule,
              TableModule,
              ToolbarModule,
              ButtonModule,
              RippleModule,
              DialogModule],
  templateUrl: './parroquia.component.html',
  styleUrl: './parroquia.component.css',
  providers: [MessageService],
})
export class ParroquiaComponent {


       ParroquiaDialog: boolean = false;
          deleteparroquiaDialog: boolean = false;
          parroquia:Parroquia={};
          parroquiadata: Parroquia[]=[];
          submitted: boolean = false;
          rowsPerPageOptions: number[] = [5,10,20];
          descripcion:string='';

            constructor(private ParroquiaService:ParroquiaService, private MessageService: MessageService){
              this.getParroquia();
            }

            ngOnInit(): void {
            }

            getParroquia(){
                this.ParroquiaService.getParroquia().subscribe(data => {this.parroquiadata = data;
                  console.log(this.parroquiadata)});
              }

              getParroquiaById(id: number) {
                this.ParroquiaService.getParroquiaById(id).subscribe(data => {
                  this.parroquia = data;
                  console.log('Parroquia encontrado:', this.parroquia);
                });
              }


              saveOrUpdateParroquia() {
                if (this.parroquia.id) {
                  // Actualizar
                  this.ParroquiaService.updateParroquia(this.parroquia.id, this.parroquia).subscribe(
                    data => {
                      console.log('Parroquia actualizado:', data);
                      this.getParroquia();
                      this.ParroquiaDialog = false;
                    },
                    error => {
                      console.error('Error al actualizar Parroquia:', error);
                    }
                  );
                } else {
                  // Guardar
                  this.ParroquiaService.saveParroquia(this.parroquia).subscribe(
                    data => {
                      console.log('Parroquia guardado:', data);
                      this.getParroquia();
                      this.ParroquiaDialog = false;
                    },
                    error => {
                      console.error('Error al guardar Parroquia:', error);
                    }
                  );
                }
              }


              deleteParroquia(id: number) {
                this.ParroquiaService.deleteParroquia(id).subscribe(msg => {
                  console.log('Eliminado:', msg);
                  this.getParroquia(); // Recargar la lista
                });
              }


              openNew() {
                this.parroquia = {} as Parroquia ;
                this.submitted = false;
                this.ParroquiaDialog = true;
              }




              hideDialog() {
                this.ParroquiaDialog = false;
                this.submitted = false;
              }


              editParroquia(parroquia: Parroquia) {
                if (parroquia.id) {
                  this.parroquia = { ...parroquia };  // Asignar los datos de la etnia seleccionada
                  this.ParroquiaDialog = true;   // Mostrar el diálogo de edición
                } else {
                  console.error('ID no disponible para el genero seleccionado');
                }
              }


}

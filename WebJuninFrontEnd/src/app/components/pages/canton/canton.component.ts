import { Component } from '@angular/core';
import { Canton } from '../../../interface/canton.interface';
import { CantonService } from '../../../layout/service/Talento Humano/canton.service';
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
  selector: 'app-canton',
  standalone: true,
  imports: [InputNumberModule,
              CommonModule,
              FormsModule,
              TableModule,
              ToolbarModule,
              ButtonModule,
              RippleModule,
              DialogModule],
  templateUrl: './canton.component.html',
  styleUrl: './canton.component.css',
  providers: [MessageService],
})
export class CantonComponent {


       CantonDialog: boolean = false;
          deleteparroquiaDialog: boolean = false;
          canton:Canton={};
          cantondata: Canton[] = [];
          submitted: boolean = false;
          rowsPerPageOptions: number[] = [5,10,20];
          descripcion:string='';

            constructor(private CantonService:CantonService, private MessageService: MessageService){
              this.getCanton();
            }

            ngOnInit(): void {
            }

            getCanton(){
                this.CantonService.getCanton().subscribe(data => {this.cantondata = data;
                  console.log(this.cantondata)});
              }

              getCantonById(id: number) {
                this.CantonService.getCantonById(id).subscribe(data => {
                  this.canton = data;
                  console.log('Canton encontrado:', this.canton);
                });
              }


              saveOrUpdateCanton() {
                if (this.canton.id) {
                  // Actualizar
                  this.CantonService.updateCanton(this.canton.id, this.canton).subscribe(
                    data => {
                      console.log('Canton actualizado:', data);
                      this.getCanton();
                      this.CantonDialog = false;
                    },
                    error => {
                      console.error('Error al actualizar canton:', error);
                    }
                  );
                } else {
                  // Guardar
                  this.CantonService.saveCanton(this.canton).subscribe(
                    data => {
                      console.log('Canton guardado:', data);
                      this.getCanton();
                      this.CantonDialog = false;
                    },
                    error => {
                      console.error('Error al guardar canton:', error);
                    }
                  );
                }
              }


              deleteCanton(id: number) {
                this.CantonService.deleteCanton(id).subscribe(msg => {
                  console.log('Eliminado:', msg);
                  this.getCanton(); // Recargar la lista
                });
              }


              openNew() {
                this.canton = {} as Canton ;
                this.submitted = false;
                this.CantonDialog = true;
              }




              hideDialog() {
                this.CantonDialog = false;
                this.submitted = false;
              }


              editCanton(canton: Canton) {
                if (canton.id) {
                  this.canton = { ...canton };  // Asignar los datos de la etnia seleccionada
                  this.CantonDialog = true;   // Mostrar el diálogo de edición
                } else {
                  console.error('ID no disponible para el canton seleccionado');
                }
              }


}

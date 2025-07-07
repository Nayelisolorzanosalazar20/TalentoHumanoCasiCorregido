import { Component } from '@angular/core';
import { EtniaService } from '../../../layout/service/Talento Humano/etnia.service';
import { MessageService, SharedModule } from 'primeng/api';
import { Etnia } from '../../../interface/etnia.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-etnia',
  standalone: true,
  imports: [InputNumberModule,
        CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        DialogModule ],
  templateUrl: './etnia.component.html',
  styleUrl: './etnia.component.css',
  providers: [MessageService],
})
export class EtniaComponent {
    etniaDialog: boolean = false;
    deleteEtniaDialog: boolean = false;
    etn:Etnia={};
    etniadata: Etnia[]=[];
    submitted: boolean = false;
    rowsPerPageOptions: number[] = [5,10,20];
    descripcion:string='';

      constructor(private EtniaService:EtniaService, private MessageService: MessageService){
        this.getEtnia();
      }

      ngOnInit(): void {
      }

      getEtnia(){
          this.EtniaService.getEtnia().subscribe(data => {this.etniadata = data;
            console.log(this.etniadata)});
        }

        getEtniaById(id: number) {
          this.EtniaService.getEtniaById(id).subscribe(data => {
            this.etn = data;
            console.log('Etnia encontrada:', this.etn);
          });
        }


        saveOrUpdateEtnia() {
          if (this.etn.id) {
            // Actualizar
            this.EtniaService.updateEtnia(this.etn.id, this.etn).subscribe(
              data => {
                console.log('Etnia actualizada:', data);
                this.getEtnia();
                this.etniaDialog = false;
              },
              error => {
                console.error('Error al actualizar etnia:', error);
              }
            );
          } else {
            // Guardar
            this.EtniaService.saveEtnia(this.etn).subscribe(
              data => {
                console.log('Etnia guardada:', data);
                this.getEtnia();
                this.etniaDialog = false;
              },
              error => {
                console.error('Error al guardar etnia:', error);
              }
            );
          }
        }


        deleteEtnia(id: number) {
          this.EtniaService.deleteEtnia(id).subscribe(msg => {
            console.log('Eliminado:', msg);
            this.getEtnia(); // Recargar la lista
          });
        }


        openNew() {
          this.etn = {} as Etnia ;
          this.submitted = false;
          this.etniaDialog = true;
        }




        hideDialog() {
          this.etniaDialog = false;
          this.submitted = false;
        }


        editEtnia(etnia: Etnia) {
          if (etnia.id) {
            this.etn = { ...etnia };  // Asignar los datos de la etnia seleccionada
            this.etniaDialog = true;   // Mostrar el diálogo de edición
          } else {
            console.error('ID no disponible para la etnia seleccionada');
          }
        }


}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EstadoCivil } from '../../../interface/estadocivil.interface';
import { EstadocivilService } from '../../../layout/service/Talento Humano/estadocivil.service';

@Component({
  selector: 'app-estadocivil',
  standalone: true,
  imports: [InputNumberModule,
            CommonModule,
            FormsModule,
            TableModule,
            ToolbarModule,
            ButtonModule,
            RippleModule,
            DialogModule],

  templateUrl: './estadocivil.component.html',
  styleUrl: './estadocivil.component.css',
    providers: [MessageService],
})
export class EstadocivilComponent {

     EstadoCivilDialog: boolean = false;
        deleteestadocivilDialog: boolean = false;
        estadocivil:EstadoCivil={};
        estadocIvildata: EstadoCivil[]=[];
        submitted: boolean = false;
        rowsPerPageOptions: number[] = [5,10,20];
        descripcion:string='';

          constructor(private EstadocivilService:EstadocivilService, private MessageService: MessageService){
            this.getEstadoCivil();
          }

          ngOnInit(): void {
          }

          getEstadoCivil(){
              this.EstadocivilService.getEstadocivil().subscribe(data => {this.estadocIvildata = data;
                console.log(this.estadocIvildata)});
            }

            getEstadoCivilById(id: number) {
              this.EstadocivilService.getEstadocivilById(id).subscribe(data => {
                this.estadocivil = data;
                console.log('Estado civil encontrado:', this.estadocivil);
              });
            }


            saveOrUpdateEstadoCivil() {
              if (this.estadocivil.id) {
                // Actualizar
                this.EstadocivilService.updateEstadocivil(this.estadocivil.id, this.estadocivil).subscribe(
                  data => {
                    console.log('Genero actualizado:', data);
                    this.getEstadoCivil();
                    this.EstadoCivilDialog = false;
                  },
                  error => {
                    console.error('Error al actualizar genero:', error);
                  }
                );
              } else {
                // Guardar
                this.EstadocivilService.saveEstadocivil(this.estadocivil).subscribe(
                  data => {
                    console.log('Estado civil guardado:', data);
                    this.getEstadoCivil();
                    this.EstadoCivilDialog = false;
                  },
                  error => {
                    console.error('Error al guardar estado civil:', error);
                  }
                );
              }
            }


            deleteEstadoCivil(id: number) {
              this.EstadocivilService.deleteEstadocivil(id).subscribe(msg => {
                console.log('Eliminado:', msg);
                this.getEstadoCivil(); // Recargar la lista
              });
            }


            openNew() {
              this.estadocivil = {} as EstadoCivil ;
              this.submitted = false;
              this.EstadoCivilDialog = true;
            }




            hideDialog() {
              this.EstadoCivilDialog = false;
              this.submitted = false;
            }


            editEstadoCivil(estado_civil: EstadoCivil) {
              if (estado_civil.id) {
                this.estadocivil = { ...estado_civil };  // Asignar los datos de la etnia seleccionada
                this.EstadoCivilDialog = true;   // Mostrar el diálogo de edición
              } else {
                console.error('ID no disponible para el genero seleccionado');
              }
            }

}

import { Component } from '@angular/core';
import { GeneroService } from '../../../layout/service/Talento Humano/genero.service';
import { MessageService } from 'primeng/api';
import { Genero } from '../../../interface/genero.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [InputNumberModule,
          CommonModule,
          FormsModule,
          TableModule,
          ToolbarModule,
          ButtonModule,
          RippleModule,
          DialogModule],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css',
  providers: [MessageService],
})
export class GeneroComponent {

   generoDialog: boolean = false;
      deletegeneroDialog: boolean = false;
      genero:Genero={};
      generodata: Genero[]=[];
      submitted: boolean = false;
      rowsPerPageOptions: number[] = [5,10,20];
      descripcion:string='';

        constructor(private GeneroService:GeneroService, private MessageService: MessageService){
          this.getGenero();
        }

        ngOnInit(): void {
        }

        getGenero(){
            this.GeneroService.getGenero().subscribe(data => {this.generodata = data;
              console.log(this.generodata)});
          }

          getGeneroById(id: number) {
            this.GeneroService.getGeneroById(id).subscribe(data => {
              this.genero = data;
              console.log('Etnia encontrada:', this.genero);
            });
          }


          saveOrUpdateGenero() {
            if (this.genero.id) {
              // Actualizar
              this.GeneroService.updateGenero(this.genero.id, this.genero).subscribe(
                data => {
                  console.log('Genero actualizado:', data);
                  this.getGenero();
                  this.generoDialog = false;
                },
                error => {
                  console.error('Error al actualizar genero:', error);
                }
              );
            } else {
              // Guardar
              this.GeneroService.saveGenero(this.genero).subscribe(
                data => {
                  console.log('Etnia guardada:', data);
                  this.getGenero();
                  this.generoDialog = false;
                },
                error => {
                  console.error('Error al guardar genero:', error);
                }
              );
            }
          }


          deleteGenero(id: number) {
            this.GeneroService.deleteGenero(id).subscribe(msg => {
              console.log('Eliminado:', msg);
              this.getGenero(); // Recargar la lista
            });
          }


          openNew() {
            this.genero = {} as Genero ;
            this.submitted = false;
            this.generoDialog = true;
          }




          hideDialog() {
            this.generoDialog = false;
            this.submitted = false;
          }


          editGenero(genero: Genero) {
            if (genero.id) {
              this.genero = { ...genero };  // Asignar los datos de los generos seleccionada
              this.generoDialog = true;   // Mostrar el diálogo de edición
            } else {
              console.error('ID no disponible para el genero seleccionado');
            }
          }

}

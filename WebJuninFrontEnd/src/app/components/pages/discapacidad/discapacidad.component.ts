import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { DiscapacidadService } from '../../../layout/service/Talento Humano/discapacidad.service';
import { Discapacidad } from '../../../interface/discapacidad.interface';
import { TipodiscapacidadService } from '../../../layout/service/Talento Humano/tipodiscapacidad.service';
import { DropdownModule } from 'primeng/dropdown';
import { GradoDiscapacidadService } from '../../../layout/service/Talento Humano/gradodiscapacidad.service';
import { GradoDiscapacidad } from '../../../interface/gradodiscapacidad.interface';

@Component({
  selector: 'app-discapacidad',
  standalone: true,
  imports: [
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    DropdownModule
  ],
  templateUrl: './discapacidad.component.html',
  styleUrl: './discapacidad.component.css',
  providers: [MessageService],
})
export class DiscapacidadComponent {
  discapacidadDialog: boolean = false;
  deleteDiscapacidadDialog: boolean = false;
  tiposDiscapacidad: any[] = [];
  gradosDiscapacidad: GradoDiscapacidad[] = [];
    discapacidadData: any[] = [];


  discapacidad: Discapacidad = {
    id: undefined,
    Numero_carnet_discapacidad: '',
    tipo_discapacidad_id: 0,
    grado_discapacidad_id: 0
  };

  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];

  funcionarioSeleccionadoId: number = 0; // Agrega esta propiedad y asígnale el valor adecuado según tu lógica

  constructor(
    private discapacidadService: DiscapacidadService,
    private tipodiscapacidadService: TipodiscapacidadService,
    private gradoDiscapacidadService: GradoDiscapacidadService,
    private messageService: MessageService
  ) {
    this.getDiscapacidad();
    this.getTiposDiscapacidad();
    this.getGradosDiscapacidad();
  }

  ngOnInit(): void {}

  getDiscapacidad() {
 this.discapacidadService.getDiscapacidades().subscribe(data => {
      this.discapacidadData = data;
      console.log('Discapacidades:', data); // <-- ¿Ves datos aquí?
    });
  }

  getDiscapacidadById(id: number) {
    this.discapacidadService.getDiscapacidadById(id).subscribe(data => {
      this.discapacidad = data;
      console.log('Discapacidad encontrada:', this.discapacidad);
    });
  }

 saveOrUpdateDiscapacidad() {
  this.submitted = true;

  if (
    !this.discapacidad.Numero_carnet_discapacidad ||
    !this.discapacidad.tipo_discapacidad_id ||
    !this.discapacidad.grado_discapacidad_id
  ) {
    this.messageService.add({severity:'error', summary:'Campos requeridos', detail:'Completa todos los campos.'});
    return;
  }

  // Asegúrate de tener el funcionario_id seleccionado
  // Por ejemplo, this.funcionarioSeleccionadoId debe tener el valor correcto
  if (!this.funcionarioSeleccionadoId) {
    this.messageService.add({severity:'error', summary:'Funcionario requerido', detail:'Selecciona un funcionario.'});
    return;
  }

  if (this.discapacidad.id) {
    // Para actualizar, también puedes enviar funcionario_id si lo necesitas
    this.discapacidadService.updateDiscapacidad(this.discapacidad.id, {
      ...this.discapacidad,
      funcionario_id: this.funcionarioSeleccionadoId
    }).subscribe(
      data => {
        this.messageService.add({severity:'success', summary:'Actualizado', detail:'Discapacidad actualizada correctamente'});
        this.getDiscapacidad();
        this.discapacidadDialog = false;
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo actualizar'});
      }
    );
  } else {
    // Aquí agregas el funcionario_id al objeto que envías
    this.discapacidadService.saveDiscapacidad({
      ...this.discapacidad,
      funcionario_id: this.funcionarioSeleccionadoId
    }).subscribe(
      data => {
        this.messageService.add({severity:'success', summary:'Guardado', detail:'Discapacidad guardada correctamente'});
        this.getDiscapacidad();
        this.discapacidadDialog = false;
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo guardar'});
      }
    );
  }
}
// ...existing code...
getNombreTipoDiscapacidad(id: number): string {
  const tipo = this.tiposDiscapacidad.find((t: any) => t.id === id);
  return tipo ? tipo.descripcion : '';
}

getNombreGradoDiscapacidad(id: number): string {
  const grado = this.gradosDiscapacidad.find((g: any) => g.id === id);
  return grado ? (grado.grado ?? '') : '';
}
// ...existing code...
  deleteDiscapacidad(id: number) {
    this.discapacidadService.deleteDiscapacidad(id).subscribe(msg => {
      console.log('Eliminado:', msg);
      this.getDiscapacidad();
    });
  }

  openNew() {
    this.discapacidad = {} as Discapacidad;
    this.submitted = false;
    this.discapacidadDialog = true;
  }

  hideDialog() {
    this.discapacidadDialog = false;
    this.submitted = false;
  }

  editDiscapacidad(discapacidad: Discapacidad) {
    if (discapacidad.id) {
      this.discapacidad = { ...discapacidad };
      this.discapacidadDialog = true;
    } else {
      console.error('ID no disponible para la discapacidad seleccionada');
    }
  }

  getTiposDiscapacidad() {
    this.tipodiscapacidadService.getTipodiscapacidad().subscribe((data: any) => {
      // Si tu backend devuelve { tcapacidad: [...] }
      if (Array.isArray(data)) {
        this.tiposDiscapacidad = data;
      } else if (Array.isArray(data?.tcapacidad)) {
        this.tiposDiscapacidad = data.tcapacidad;
      } else {
        this.tiposDiscapacidad = [];
      }
    });
  }

  getGradosDiscapacidad() {
    this.gradoDiscapacidadService.getGrado().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.gradosDiscapacidad = data;
      } else if (Array.isArray(data?.grado)) {
        this.gradosDiscapacidad = data.grado;
      } else {
        this.gradosDiscapacidad = [];
      }
    });
  }
}
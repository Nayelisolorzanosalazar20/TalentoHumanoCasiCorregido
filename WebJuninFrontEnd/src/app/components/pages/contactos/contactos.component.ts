import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview'; // ✅ IMPORTACIÓN NECESARIA
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { Funcionario } from '../../../interface/funcionario.interface';
import { DropdownModule } from 'primeng/dropdown';
import { Contactos } from '../../../interface/contactos.interface';
import { ContactosService } from '../../../layout/service/Talento Humano/contactos.service';
@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [
      CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        DialogModule,
        InputNumberModule,
        TabViewModule,
        DropdownModule
  ],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css',
  providers: [MessageService],
})
export class ContactosComponent implements OnInit {

  ContactosDialog: boolean = false;
  deleteecontactosDialog: boolean = false;

  contactos: Contactos = {};
  contactosdata: Contactos[] = [];

  submitted: boolean = false;

  rowsPerPageOptions: number[] = [5, 10, 20];

  // Campos individuales (opcional si los usas en el formulario)
  telefono_personal: string = '';
  telefono_domicilio: string = '';
  telefono_emergencia: string = '';
  correo_personal: string = '';
  correo_institucional: string = '';
  parentesco_emergencia: string = '';
  nombre_persona_emergencia: string = '';
  funcionario_id?: number;
  funcionariosData: Funcionario[] = [];
  funcionarios: { nombres: string , apellidos: string } = { nombres: '' ,apellidos: '' };
  

  constructor(
    private ContactosService: ContactosService,
    private MessageService: MessageService,
    private FuncionarioService: FuncionarioService // Asegúrate de importar el servicio de funcionarios
  ) {}

  ngOnInit(): void {
    this.getContactos(); 
    this.getFuncionarios(); // Carga los funcionarios al iniciar el componente
  }

  getContactos() {
    this.ContactosService.getContactos().subscribe({
      next: (data) => {
        this.contactosdata = data;
        console.log('Datos recibidos:', this.contactosdata);
      },
      error: (error) => {
        console.error('Error al obtener contactos:', error);
      }
    });
  }
   getFuncionarios() {
  this.FuncionarioService.getFuncionarios().subscribe(data => {
    // Combina nombres y apellidos en un solo campo para el dropdown
    this.funcionariosData = data.map(f => ({
      ...f,
      nombreCompleto: `${f.nombres} ${f.apellidos}`
    }));
  });
}
onFuncionarioSelect(event: any) {
  // Si usas optionValue="id", esto ya asigna el id directamente
  this.contactos.funcionario_id = event.value;
}
  getContactosById(id: number) {
    this.ContactosService.getContactosById(id).subscribe({
      next: (data) => {
        this.contactos = data;
        console.log('Contacto encontrado:', this.contactos);
      },
      error: (err) => {
        console.error('Error al buscar contacto:', err);
      }
    });
  }

  saveOrUpdateContactos() {
    if (this.contactos.id) {
      this.ContactosService.updateContactos(this.contactos.id, this.contactos).subscribe({
        next: (data) => {
          console.log('Contactos actualizados:', data);
          this.getContactos();
          this.ContactosDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar contactos:', error);
        }
      });
    } else {
      this.ContactosService.saveContactos(this.contactos).subscribe({
        next: (data) => {
          console.log('Contacto guardado:', data);
          this.getContactos();
          this.ContactosDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar contacto:', error);
        }
      });
    }
  }

  deleteContactos(id: number) {
    this.ContactosService.deleteContactos(id).subscribe({
      next: (msg) => {
        console.log('Contacto eliminado:', msg);
        this.getContactos();
      },
      error: (err) => {
        console.error('Error al eliminar contacto:', err);
      }
    });
  }

  openNew() {
    this.contactos = {} as Contactos;
    this.submitted = false;
    this.ContactosDialog = true;
  }

  hideDialog() {
    this.ContactosDialog = false;
    this.submitted = false;
  }

  editContactos(contactos: Contactos) {
    if (contactos.id) {
      this.contactos = { ...contactos };
      this.ContactosDialog = true;
    } else {
      console.error('ID no disponible para el contacto seleccionado');
    }
  }
}

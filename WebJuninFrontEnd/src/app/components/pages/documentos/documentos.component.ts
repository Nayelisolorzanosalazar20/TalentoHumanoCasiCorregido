import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { Documentos } from '../../../interface/documentos.interface';
import { DocumentosService } from '../../../layout/service/Talento Humano/documentos.service';
import { Tipodocumento } from '../../../interface/tipodocumuento.interface';
import { Funcionario } from '../../../interface/funcionario.interface';
import { TipodocumentoService } from '../../../layout/service/Talento Humano/tipodocumento.service';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-documentos',
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
    DropdownModule,
    FileUploadModule
  ],
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  providers: [MessageService],
})
export class DocumentosComponent {
  apiUrl: string = 'http://localhost:5000/api'; // Ajusta la URL según tu backend
  documentosDialog: boolean = false;
  deleteDocumentosDialog: boolean = false;
  documentos: Documentos = {};
  documentosdata: Documentos[] = [];
  tipodocumentodata: Tipodocumento[] = [];
  funcionariodata: Funcionario[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];
  archivoSeleccionado: File | null = null;
  constructor(
    private documentosService: DocumentosService,
    private tipodocumentoService: TipodocumentoService,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  

  ngOnInit(): void {
    this.getDocumentos();
    this.getTipoDocumentos();
    this.getFuncionarios();
  }

getDocumentos() {
  this.documentosService.getDocumentos().subscribe(data => {
    this.documentosdata = data;
    console.log('Documentos recibidos:', this.documentosdata); // <-- ¿Ves los datos aquí?
  });
}
  getTipoDocumentos() {
    this.tipodocumentoService.getTipodocumento().subscribe((data) => {
      this.tipodocumentodata = data;
    });
  }

getFuncionarios() {
  this.funcionarioService.getFuncionarios().subscribe(data => {
    this.funcionariodata = data;
    console.log('Funcionarios recibidos:', this.funcionariodata);
  });
}

  getNombreTipoDocumento(id: number | undefined): string {
    const tipo = this.tipodocumentodata.find(t => t.id === id);
    return tipo && tipo.nombre_archivo ? tipo.nombre_archivo : '';
  }

  getNombreFuncionario(id: number | undefined): string {
    const funcionario = this.funcionariodata.find(f => f.id === id);
    return funcionario ? `${funcionario.nombres} ${funcionario.apellidos}` : '';
  }
getNombreOriginal(ruta: string): string {
  // Extrae el nombre del archivo
  const nombreArchivo = ruta.split('/').pop() || '';
  // Elimina el sufijo único si existe (ejemplo: documento-1748393414189.jpeg -> documento.jpeg)
  return nombreArchivo.replace(/-\d+\./, '.');
}

// documentos.component.ts para ver si me deja ver mis archivos desde funcionarios 

getDocumentoUrl(doc: any): string {
  return 'http://localhost:5000/uploads/documentos/' + doc.ruta_almacenamiento;
}
  onFileSelect(event: any) {
    const file = event.files && event.files.length > 0 ? event.files[0] : null;
    if (file) {
     this.archivoSeleccionado = file;
      this.documentos.ruta_almacenamiento = file.name;
     } else {
    this.archivoSeleccionado = null;
    this.documentos.ruta_almacenamiento = '';
    }
  }

  getDocumentosById(id: number) {
    this.documentosService.getDocumentosById(id).subscribe((data) => {
      this.documentos = data;
      console.log('Documento encontrado:', this.documentos);
    });
  }
// ...existing code...
saveDocumentos(formData: FormData) {
  return this.http.post(`${this.apiUrl}/documentos`, formData);
}
// ...existing code...
  saveOrUpdateDocumento() {
    console.log('Archivo:', this.archivoSeleccionado);
    console.log('Tipo documento:', this.documentos.tipo_documento_id);
    console.log('Funcionario:', this.documentos.funcionario_id);
    this.submitted = true;
    if (!this.archivoSeleccionado || !this.documentos.tipo_documento_id || !this.documentos.funcionario_id) {
      this.submitted = true;
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado);
    formData.append('tipo_documento_id', String(this.documentos.tipo_documento_id));
    formData.append('funcionario_id', String(this.documentos.funcionario_id));
   // formData.append('ruta_almacenamiento', this.documentos.ruta_almacenamiento || ''); // <-- AGREGADO

    // Agrega otros campos si es necesario

    if (this.documentos.id) {
      // Actualizar
      this.documentosService.updateDocumentos(this.documentos.id, formData).subscribe({
        next: (response) => {
          this.getDocumentos();
          this.documentosDialog = false;
        },
        error: (error) => {
          console.error('Error al actualizar documento:', error);
        },
      });
    } else {
      // Nuevo
      this.documentosService.saveDocumentos(formData).subscribe({
        next: (response) => {
          this.getDocumentos();
          this.documentosDialog = false;
        },
        error: (error) => {
          console.error('Error al guardar documento:', error);
        },
      });
    }
  }

  deleteDocumento(id: number) {
    this.documentosService.deleteDocumentos(id).subscribe((msg) => {
      console.log('Eliminado:', msg);
      this.getDocumentos();
    });
  }

  openNew() {
    this.documentos = {} as Documentos;
    this.archivoSeleccionado = null;
    this.submitted = false;
    this.documentosDialog = true;
  }

  hideDialog() {
    this.documentosDialog = false;
    this.submitted = false;
  }

  editDocumento(documentos: Documentos) {
    if (documentos.id) {
      this.documentos = { ...documentos };
      this.archivoSeleccionado = null;
      this.documentosDialog = true;
    } else {
      console.error('ID no disponible para el documento seleccionado');
    }
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => error);
  }
}
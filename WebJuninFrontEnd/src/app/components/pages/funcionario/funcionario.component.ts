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
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Funcionario } from '../../../interface/funcionario.interface';
import { Genero } from '../../../interface/genero.interface';
import { Etnia } from '../../../interface/etnia.interface';
import { EstadoCivil } from '../../../interface/estadocivil.interface';
import { Parroquia } from '../../../interface/parroquia.interface.interface';
import { GradoDiscapacidad } from '../../../interface/gradodiscapacidad.interface';
import { Tipodiscapacidad } from '../../../interface/tipodiscapacidad.interface';
import { Contactos } from '../../../interface/contactos.interface';
// AGREGA EL SERVICIO DE CANTÓN
import { DocumentosService } from '../../../layout/service/Talento Humano/documentos.service';
import { TipodocumentoService } from '../../../layout/service/Talento Humano/tipodocumento.service';
import { CantonService } from '../../../layout/service/Talento Humano/canton.service';
import { ContactosService } from '../../../layout/service/Talento Humano/contactos.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FuncionarioService } from '../../../layout/service/Talento Humano/funcionario.service';
import { GeneroService } from '../../../layout/service/Talento Humano/genero.service';
import { EtniaService } from '../../../layout/service/Talento Humano/etnia.service';
import { GradoDiscapacidadService } from '../../../layout/service/Talento Humano/gradodiscapacidad.service';
import { ParroquiaService } from '../../../layout/service/Talento Humano/parroquia.service';
import { TipodiscapacidadService } from '../../../layout/service/Talento Humano/tipodiscapacidad.service';
import { EstadocivilService } from '../../../layout/service/Talento Humano/estadocivil.service';
import { CargaFamiliarService } from '../../../layout/service/Talento Humano/cargafamiliar.service';
import { ProvinciaService } from '../../../layout/service/Talento Humano/provincia.service'; // Asegúrate de tener este servicio
import { TrayectoriaService } from '../../../layout/service/Talento Humano/trayectoria.service'; // AÑADE EL SERVICIO DE TRAYECTORIAS
import { InstitucionFinancieraService } from '../../../layout/service/Talento Humano/institucionfinanciera.service'; // <--- Agrega esta línea
import { InstitucionBancariaService } from '../../../layout/service/Talento Humano/institucionbancaria.service'; // AÑADE EL SERVICIO DE INSTITUCIONES BANCARIAS
import { FormacionService } from '../../../layout/service/Talento Humano/formacionacademica.service'; // AÑADE EL SERVICIO DE INFORMACIÓN ACADÉMICA
import { DiscapacidadService } from '../../../layout/service/Talento Humano/discapacidad.service';
import { CapacitacionesService } from '../../../layout/service/Talento Humano/capacitaciones.service';

import { TipoCuentaService } from '../../../layout/service/Talento Humano/tipocuenta.service'; // AÑADE EL SERVICIO DE TIPO CUENTA
// Inyecta DomSanitizer en el constructor si quieres previsualizar archivos

import { DomSanitizer } from '@angular/platform-browser';

import { Router } from '@angular/router';
@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [
    RadioButtonModule ,
    InputNumberModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    FileUploadModule,
    

  ],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.css',
  providers: [MessageService],
})


export class FuncionarioComponent {
  selectedFile: File | null = null;
  funcionarioDialog: boolean = false;
  direccion: { provincia_id?: number; canton_id?: number; parroquia_id?: number } = {};
  deletefuncionarioDialog: boolean = false;
  funcionarios: Funcionario = {};
  funcionariodata: Funcionario[] = [];
  generodata: Genero[] = [];
  etniadata: Etnia[] = [];
  estadocivildata: EstadoCivil[] = [];
  parroquiadata: Parroquia[] = [];
  gradodiscapacidaddata: GradoDiscapacidad[] = [];
  tipodiscapacidaddata: Tipodiscapacidad[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20];
  tieneDiscapacidad: boolean = false;
  sigueLaborando: boolean = true; // Por defecto "Sí"
  contactosTempData: any[] = []; // Arreglo temporal para contactos
  indiceInfoBancariaEditando: number = -1;
  indiceDireccionEditando: number = -1;
  mostrarDialogoEditarCapacitacion: boolean = false;

  infoBancariaTempData: any[] = [];
  nuevaInfoBancaria: any = {};
  infoBancaria: any[] = []; // <-- Añadido para evitar el error
  documentosTempData: any[] = [];
  nuevoDocumento: any = {};
  tipodocumentodata: any[] = []; 
  previewUrl: string | ArrayBuffer | null = null;
  isImage: boolean = false;
  documentosFuncionario: any[] = [];
  mostrarDocsDialog: boolean = false;
  institucionesFinancieras: any[] = [];

  documentoEditando: any = {};
  mostrarDialogoEditar: boolean = false;

  // <-- mostar los datos para editar de mis funcionarios
  contactosFuncionario: any[] = []; 
  mostrarDialogoContactos: boolean = false;

  trayectoriaEditando: any = {};
  mostrarDialogoEditarTrayectoria: boolean = false;

// Añadido para almacenar datos de todas las tab panel  
  trayectorias: any[] = []; 
  contactos: any[] = []; 
  formacionAcademica: any[] = [];

  infoBancariaEditando: any = {};
  mostrarDialogoEditarInfoBancaria: boolean = false;

  formacionAcademicaEditando: any = {};
  mostrarDialogoEditarFormacionAcademica: boolean = false;
  mostrarDialogoTrayectorias: boolean = false;
  trayectoriasFuncionario: any[] = [];
  contratoSeleccionado: any = {};
  mostrarDialogoContrato: boolean = false;
  // Para dropdown dependiente
  contratosTempData: any[] = [];
  contratoEditando: any = {};
  mostrarDialogoEditarContrato: boolean = false;
  discapacidadTempData: any[] = [];
  discapacidad: any = {};
  cantonesData: any[] = [];
  parroquiasData: any[] = [];
  parroquiasFiltradas: any[] = [];
  provinciasData: any[] = []; // <-- Añadido para almacenar las provincias
  contactosData: any[] = [];
  cargasFamiliaresData: any[] = [];
  nuevaCargaFamiliar: any = {};
  nuevoContacto: any = {};
  cargasFamiliaresTempData: any[] = []; 
  capacitacionesTempData: any[] = [];
  nuevaCapacitacion: any = {};
  trayectoriasTempData: any[] = [];
  discapacidadData: any[] = []; // <-- AGREGA ESTA LÍNEA
  indiceDiscapacidadEditando: number = -1;

  nuevaTrayectoria: any = {  };
  formacionAcademicaTempData: any[] = [];
  nuevaFormacionAcademica: any = {}; // <-- Añadido para evitar el error
  contactoEditando: any = {};
  discapacidadEditando: any = {};
  mostrarDialogoEditarDiscapacidad: boolean = false;
  mensajeValidacion: string = '';
  mostrarDialogoValidacion: boolean = false;
  discapacidadOriginal: any = null;
  direccionesTempData: any[] = [];

  textoBusqueda: string = '';
  tiposCuenta: any[] = [];
  // ...
  // ...ver en mi panel los detalles...
mostrarDialogoDiscapacidades: boolean = false;
discapacidadesFuncionario: any[] = [];
mostrarDialogoFormacionAcademica: boolean = false;
formacionAcademicaFuncionario: any[] = [];
mostrarDialogoInfoBancaria: boolean = false;
infoBancariaFuncionario: any[] = [];

// Agrega la propiedad para capacitaciones
capacitacionesFuncionario: any[] = [];
mostrarDialogoCapacitaciones: boolean = false;

indiceContratoEditando: number = -1; 
indiceCapacitacionEditando: number = -1;

capacitacionPreviewUrl: any = null;
// ...existing code...
  mostrarDialogoEditarContacto: boolean = false;

  Url: string = 'http://localhost:5000/api'; // Ajusta la URL base según tu backend

  constructor(
    private FuncionarioService: FuncionarioService,
    private MessageService: MessageService,
    private GeneroService: GeneroService,
    private EtniaService: EtniaService,
    private GradoDiscapacidadService: GradoDiscapacidadService,
    private ParroquiaService: ParroquiaService,
    private TipodiscapacidadService: TipodiscapacidadService,
    private CantonService: CantonService, // INYECTA EL SERVICIO DE CANTÓN
    private ContactosService: ContactosService, // AÑADE EL SERVICIO DE CONTACTOS
    private EstadocivilService: EstadocivilService,
    private TipoDocumentoService: TipodocumentoService,
    private DocumentosService: DocumentosService, // Agrega el servicio correcto para subir documentos
      private DiscapacidadService: DiscapacidadService,

    private TrayectoriaService: TrayectoriaService, // AÑADE EL SERVICIO DE TRAYECTORIAS
    private CargaFamiliarService: CargaFamiliarService, // AÑADE EL SERVICIO DE CARGA FAMILIAR
    private ProvinciaService: ProvinciaService, // AÑADE EL SERVICIO DE PROVINCIAS
    private InstitucionFinancieraService: InstitucionFinancieraService, // AÑADE EL SERVICIO DE INSTITUCIONES FINANCIERAS
    private InstitucionBancariaService: InstitucionBancariaService, // AÑADE EL SERVICIO DE INSTITUCIONES BANCARIAS
    private FormacionService: FormacionService, 
    // AÑADE EL SERVICIO DE INFORMACIÓN ACADÉMICA
    private TipoCuentaService: TipoCuentaService, // AÑADE EL SERVICIO DE TIPO CUENTA
    private CapacitacionesService: CapacitacionesService, // AÑADE EL SERVICIO DE CAPACITACIONES
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
    
  ) {}
  
  
 

  ngOnInit(): void {
    this.getInstitucionesFinancieras();
    this.getFuncionarios();
    this.getGenero();
    this.getEtnia();
    this.getEstadoCivil();
    this.cargarInformacionBancaria();
    this.getAllParroquias(); // CARGA TODAS LAS PARROQUIAS
    this.getGrado();
    this.getTipoDiscapacidad();
    this.getTipoDocumento();
    this.getProvincias();
    this.cargarTrayectorias();
    this.DiscapacidadService.getDiscapacidades().subscribe(data => {
    console.log('Discapacidades:', data);
    this.discapacidadData = data;
    const temp = localStorage.getItem('direccionesTempData');
    this.direccionesTempData = temp ? JSON.parse(temp) : [];
   this.cargarTiposCuenta();
   
  });
    
  if (this.direccion.provincia_id) {
    this.getCantones(this.direccion.provincia_id);
  }

  if (this.direccion.canton_id) {
    this.getParroquias(this.direccion.canton_id);
  }
    // Si tienes un funcionarioId disponible, pásalo aquí. Por ejemplo, si es parte de this.funcionarios:
    if (this.funcionarios.id !== undefined) {
      this.getContactos(this.funcionarios.id);
    }
  }

  //-----------FUNCIONARIOS------------------------------------------------

  getFuncionarios() {
    this.FuncionarioService.getFuncionarios().subscribe((data) => {
      this.funcionariodata = data;
      console.log('Funcionarios:', this.funcionariodata);
    });
  }

  saveOrUpdateFuncionario() {
    console.log('Datos del funcionario:', this.funcionarios);
    console.log('Discapacidad recibida:', this.discapacidadTempData, 'Funcionario:', this.funcionarios.id);
    
    this.infoBancariaTempData = [...this.infoBancariaTempData];
    this.documentosTempData.forEach(doc => {
    const formData = new FormData();
    formData.append('tipo_documento_id', doc.tipo_documento_id);
    formData.append('archivo', doc.archivo);
    formData.append('funcionario_id', this.funcionarios.id != null ? this.funcionarios.id.toString() : ''); // Asegúrate de tener el id

    this.DocumentosService.subirDocumento(formData).subscribe(
     
      (response) => {
        console.log('Documento subido:', response);
        this.MessageService.add({severity:'success', summary:'Éxito', detail:'Documento subido correctamente'});
      },
      (error) => {
        console.error('Error al subir el documento:', error);
        this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo subir el documento'});
      }
    );
  });

   // SUBE LAS CAPACITACIONES TEMPORALES
  
this.capacitacionesTempData
  .filter(cap => !cap.id)
  .forEach(cap => {
    const formData = new FormData();
    formData.append('descripcion', cap.descripcion);
    formData.append('fecha_inicio', cap.fecha_inicio);
    formData.append('fecha_fin', cap.fecha_fin);
    formData.append('n_horas', cap.n_horas);
    formData.append('archivo', cap.archivo);
    formData.append('funcionario_id', this.funcionarios.id != null ? this.funcionarios.id.toString() : '');
    this.CapacitacionesService.subirCapacitacion(formData).subscribe(
      (response: any) => {
        // Opcional: agrega el id devuelto por el backend para evitar duplicados en memoria
        cap.id = response.id;
        this.MessageService.add({severity:'success', summary:'Éxito', detail:'Capacitación subida correctamente'});
      },
      (error) => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo subir la capacitación'});
      }
    );
  });
   // Recarga capacitaciones después de guardar
  const funcionarioId = this.funcionarios.id;
  if (funcionarioId) {
    this.getCapacitacionesFuncionario(funcionarioId);
  }
// ------------------------------------------------------------------------------------------------
  // Validación de campos requeridos
   if (!this.funcionarios.DNI) {
    this.mensajeValidacion = 'El DNI del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.funcionarios.nombres) {
    this.mensajeValidacion = 'El nombre del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.funcionarios.apellidos) {
    this.mensajeValidacion = 'El apellido del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.nacionalidad) {
    this.mensajeValidacion = 'La nacionalidad del funcionario es requerida.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.tipo_sangre) {
    this.mensajeValidacion = 'El tipo de sangre del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.fecha_nacimiento) {
    this.mensajeValidacion = 'La fecha de nacimiento del funcionario es requerida.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.estado_civil_id) {
    this.mensajeValidacion = 'El estado civil del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.etnia_id) {
    this.mensajeValidacion = 'La etnia del funcionario es requerida.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.genero_id) {
    this.mensajeValidacion = 'El género del funcionario es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.direccion) {
    this.mensajeValidacion = 'La dirección del funcionario es requerida.';
    this.mostrarDialogoValidacion = true;
    return;
  }
   if (!this.funcionarios.direccion_referencia) {
    this.mensajeValidacion = 'La dirección de referencia del funcionario es requerida.';
    this.mostrarDialogoValidacion = true;
    return;
  }

  


    
    if (
  (!this.contactosTempData.length ||
   !this.contactosTempData.some(c => c.telefono_personal && c.telefono_personal.trim() !== '')) &&
  (!this.nuevoContacto.telefono_personal || !this.nuevoContacto.telefono_personal.trim())
) {
  this.mensajeValidacion = 'Debe agregar al menos un contacto con teléfono personal.';
  this.mostrarDialogoValidacion = true;
  return;
}

    if (
      !this.funcionarios.nombres ||
      !this.funcionarios.apellidos ||
      !this.funcionarios.DNI ||
      !this.funcionarios.edad ||
      !this.funcionarios.nacionalidad ||
      !this.funcionarios.tipo_sangre ||
      !this.funcionarios.fecha_nacimiento ||
      !this.funcionarios.direccion ||
      !this.funcionarios.direccion_referencia ||
      !this.funcionarios.genero_id ||
      !this.funcionarios.estado_civil_id ||
      !this.funcionarios.etnia_id ||
      !this.funcionarios.parroquia_id
      
    ) {
      this.MessageService.add({severity:'error', summary:'Campos requeridos', detail:'Nombres, Apellidos y DNI son requeridos'});
      return;
    }

const formData = new FormData();


    formData.append('nombres', this.funcionarios.nombres || '');
    formData.append('apellidos', this.funcionarios.apellidos || '');
    formData.append('edad', this.funcionarios.edad ? this.funcionarios.edad.toString() : '');
    formData.append('DNI', this.funcionarios.DNI || '');
    // añade los campos de trayectoria laboral e información bancaria y demas 


    formData.append('trayectoria_laboral', JSON.stringify(this.trayectoriasTempData));
    formData.append('informacion_bancaria', JSON.stringify(this.infoBancariaTempData));
    formData.append('contactos', JSON.stringify(this.contactosTempData));
    formData.append('formacion_academica', JSON.stringify(this.formacionAcademicaTempData));
    formData.append('contratos', JSON.stringify(this.contratosTempData));
    //formData.append('discapacidad', JSON.stringify(this.discapacidadTempData));



    formData.append('nacionalidad', this.funcionarios.nacionalidad || '');
    formData.append('tipo_sangre', this.funcionarios.tipo_sangre || '');
    formData.append('fecha_nacimiento', this.funcionarios.fecha_nacimiento || '');
    formData.append('direccion', this.funcionarios.direccion || '');
    formData.append('direccion_referencia', this.funcionarios.direccion_referencia || '');
    formData.append('residencia', this.funcionarios.residencia || '');
    formData.append('profesion', this.funcionarios.profesion || '');
    formData.append('fecha_inicio_contrato', this.funcionarios.fecha_inicio_contrato || '');
    formData.append('fecha_fin_contrato', this.funcionarios.fecha_fin_contrato || '');

 
    formData.append('canton_id', this.funcionarios.canton_id ? this.funcionarios.canton_id.toString() : '');
    formData.append('genero_id', this.funcionarios.genero_id ? this.funcionarios.genero_id.toString() : '');
    formData.append('estado_civil_id', this.funcionarios.estado_civil_id ? this.funcionarios.estado_civil_id.toString() : '');
    formData.append('etnia_id', this.funcionarios.etnia_id ? this.funcionarios.etnia_id.toString() : '');
    formData.append('parroquia_id', this.funcionarios.parroquia_id ? this.funcionarios.parroquia_id.toString() : '');
   
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }
     // Antes de guardar, elimina duplicados en el arreglo temporal
  this.discapacidadTempData = this.discapacidadTempData.filter(
    (item, index, self) =>
      index === self.findIndex((d) =>
        d.Numero_carnet_discapacidad === item.Numero_carnet_discapacidad &&
        d.tipo_discapacidad_id === item.tipo_discapacidad_id &&
        d.grado_discapacidad_id === item.grado_discapacidad_id
      )
  );
 if (this.funcionarios.id) {
    this.FuncionarioService.updateFuncionario(this.funcionarios.id, formData).subscribe({
      next: (response) => {
        this.MessageService.add({severity:'success', summary:'Actualizado', detail:'Funcionario actualizado'});
        this.getFuncionarios();
        this.funcionarioDialog = false;
        this.selectedFile = null;

        // Guarda SOLO los registros de discapacidad que no existen en la base
              if (typeof this.funcionarios.id === 'number') {
        this.DiscapacidadService.getDiscapacidadesByFuncionario(this.funcionarios.id).subscribe(baseData => {
          this.discapacidadTempData.forEach(discapacidad => {
            const existe = baseData.some((d: any) =>
              d.Numero_carnet_discapacidad === discapacidad.Numero_carnet_discapacidad &&
              d.tipo_discapacidad_id === discapacidad.tipo_discapacidad_id &&
              d.grado_discapacidad_id === discapacidad.grado_discapacidad_id
            );
            if (!existe) {
              this.DiscapacidadService.saveDiscapacidad({
                Numero_carnet_discapacidad: discapacidad.Numero_carnet_discapacidad,
                tipo_discapacidad_id: discapacidad.tipo_discapacidad_id,
                grado_discapacidad_id: discapacidad.grado_discapacidad_id,
                funcionario_id: this.funcionarios.id
              }).subscribe(() => {
                // Recarga desde la base para mantener sincronizado el arreglo temporal
if (this.funcionarios.id !== undefined) {
    this.getDiscapacidadFuncionario(this.funcionarios.id);
  }              });
            }
          });
        });
      
             
        } else {
          // Si no hay discapacidad, recarga igual para limpiar la tabla
if (this.funcionarios.id !== undefined) {
    this.getDiscapacidadFuncionario(this.funcionarios.id);
  }        }
      },
      error: (error) => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'Error al actualizar funcionario'});
      },
    });
  } else {
    this.FuncionarioService.saveFuncionario(formData).subscribe({
      next: (response: any) => {
        this.MessageService.add({severity:'success', summary:'Guardado', detail:'Funcionario guardado'});
        this.getFuncionarios();
        this.funcionarioDialog = false;
        this.selectedFile = null;

        // Guarda discapacidad solo si no existe en la base (nuevo funcionario)
        if (this.tieneDiscapacidad && this.discapacidadTempData.length > 0) {
          this.discapacidadTempData.forEach(discapacidad => {
            this.DiscapacidadService.saveDiscapacidad({
              Numero_carnet_discapacidad: discapacidad.Numero_carnet_discapacidad,
              tipo_discapacidad_id: discapacidad.tipo_discapacidad_id,
              grado_discapacidad_id: discapacidad.grado_discapacidad_id,
              funcionario_id: response.id
            }).subscribe(() => {
              this.getDiscapacidadFuncionario(response.id);
            });
          });
        }
      },
      error: (error) => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'Error al guardar funcionario'});
      },
    });
  }
}




   //-----------instituciones Financieras------------------------------------------------
getInstitucionesFinancieras() {
  this.InstitucionFinancieraService.getInstitucionFinanciera().subscribe(data => {
    this.institucionesFinancieras = data;
  });
}

 //-----------generos------------------------------------------------
  getGenero() {
    this.GeneroService.getGenero().subscribe(data => {
      this.generodata = data;
      console.log('Géneros:', this.generodata);
    });
  }
 //-----------etnias------------------------------------------------
  getEtnia() {
    this.EtniaService.getEtnia().subscribe(data => {
      this.etniadata = data;
    });
  }

   //-----------estadocivil------------------------------------------------
  getEstadoCivil() {
    this.EstadocivilService.getEstadocivil().subscribe(data => {
      this.estadocivildata = data;
    });
  }

   //-----------discapacidad------------------------------------------------
  getGrado() {
    this.GradoDiscapacidadService.getGrado().subscribe(data => {
      this.gradodiscapacidaddata = data;
    });
  }
  
editarFuncionario(funcionario: any) {
  // 1. Carga provincias (si no están cargadas)
  this.getProvincias(() => {
    // 2. Asigna provincia
    this.funcionarios.provincia_id = funcionario.provincia_id;
    
    // 3. Carga cantones de la provincia seleccionada
    this.getCantones(funcionario.provincia_id, () => {
      // 4. Asigna cantón
      this.funcionarios.canton_id = funcionario.canton_id;

      // 5. Carga parroquias del cantón seleccionado
      this.getParroquias(funcionario.canton_id, () => {
        // 6. Asigna parroquia
        this.funcionarios.parroquia_id = funcionario.parroquia_id;
      });
    });
  });
// AGREGA ESTA LÍNEA para cargar discapacidades en la tabla temporal:
  if (funcionario.id) {
    this.getDiscapacidadFuncionario(funcionario.id);
  }
    this.getCapacitacionesFuncionario(funcionario.id); // <-- AGREGA ESTA LÍNEA

  // Abre el diálogo de edición
  this.funcionarioDialog = true;
}
 //-----------parroquias------------------------------------------------
getAllParroquias() {
  this.ParroquiaService.getParroquia().subscribe(data => {
    console.log('Parroquias recibidas:', data);
    this.parroquiasData = data;
    this.parroquiasFiltradas = [];
  });
}


getParroquias(cantonId: number, callback?: () => void) {
  this.ParroquiaService.getParroquiasByCanton(cantonId).subscribe(data => {
    console.log('Parroquias recibidas:', data); // Debe ser un array
    this.parroquiasFiltradas = Array.isArray(data) ? data : [];
    if (Array.isArray(data)) {
      this.parroquiasFiltradas = data;
    } else {
      this.parroquiasFiltradas = [];
      this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudieron cargar las parroquias'});
    }
    if (callback) callback();
  });
}

 //-----------provincias------------------------------------------------
getProvincias(callback?: () => void) {
  this.ProvinciaService.getProvincia().subscribe(data => {
    console.log('Provincias recibidas:', data); // ¿Ves datos aquí?
    this.provinciasData = data;
    if (callback) callback();
  });
}
 onProvinciaChange(event: any) {
  const provinciaId = event.value;
  this.funcionarios.provincia_id = provinciaId; // <-- Asigna correctamente aquí
  this.getCantones(provinciaId);

  this.direccion.canton_id = undefined;
  this.direccion.parroquia_id = undefined;
  this.cantonesData = [];
}


 //-----------contactos------------------------------------------------
  
getContactos(funcionarioId: number) {
  this.ContactosService.getContactos().subscribe(data => {
    console.log('Todos los contactos:', data); // <-- Verifica todos los contactos recibidos
    this.contactosData = data.filter((c: any) => c.funcionario_id === funcionarioId);
    console.log('Contactos filtrados:', this.contactosData); // <-- Verifica los contactos filtrados
  });
}
  

 
agregarContacto() {
  if (!this.funcionarios.id) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Debe guardar primero el funcionario'});
    return;
  }
  const contacto = {
    ...this.nuevoContacto,
    funcionario_id: this.funcionarios.id
  };
  this.ContactosService.saveContactos(contacto).subscribe({
    next: (resp) => {
      this.getContactos(this.funcionarios.id!); // Recarga la tabla de contactos
      this.nuevoContacto = {}; // Limpia el formulario
      this.MessageService.add({severity:'success', summary:'Contacto agregado', detail:'Contacto guardado correctamente'});
    },
    error: () => {
      this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo guardar el contacto'});
    }
  });
}

agregarContactoTemp() {
 // Validación de campos requeridos
  if (!this.nuevoContacto.telefono_personal || !this.nuevoContacto.telefono_personal.trim()) {
    this.mensajeValidacion = 'El teléfono personal es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.nuevoContacto.telefono_emergencia || !this.nuevoContacto.telefono_emergencia.trim()) {
    this.mensajeValidacion = 'El teléfono de emergencia es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.nuevoContacto.correo_personal || !this.nuevoContacto.correo_personal.trim()) {
    this.mensajeValidacion = 'El correo personal es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.nuevoContacto.nombre_persona_emergencia || !this.nuevoContacto.nombre_persona_emergencia.trim()) {
    this.mensajeValidacion = 'El nombre de la persona de emergencia es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  if (!this.nuevoContacto.parentesco_emergencia || !this.nuevoContacto.parentesco_emergencia.trim()) {
    this.mensajeValidacion = 'El parentesco de la persona de emergencia es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }

  // Si todo está bien, agrega el contacto
  this.contactosTempData.push({ ...this.nuevoContacto });
  this.nuevoContacto = {};
}

 //-----------cargas familiares------------------------------------------------
getCargaFamiliar(funcionarioId: number) {
  this.CargaFamiliarService.getCargaFamiliar().subscribe(data => {
    console.log('Todos las cargas familiares:', data); // <-- Verifica todos los contactos recibidos
    this.cargasFamiliaresData = data.filter((c: any) => c.funcionario_id === funcionarioId);
    console.log('carga familiar filtrados:', this.cargasFamiliaresData); // <-- Verifica los contactos filtrados
  });
}

agregarCargaFamiliar() {
  if (!this.funcionarios.id) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Debe guardar primero el funcionario'});
    return;
  }
  const cargaFamiliar = {
    ...this.nuevaCargaFamiliar,
    funcionario_id: this.funcionarios.id
  };
  this.CargaFamiliarService.saveCargaFamiliar(cargaFamiliar).subscribe({
    next: () => {
      this.getCargaFamiliar(this.funcionarios.id!); // Recarga la tabla de cargas familiares
      this.nuevaCargaFamiliar = {}; // Limpia el formulario
      this.MessageService.add({severity:'success', summary:'Carga Familiar agregada', detail:'Carga familiar guardada correctamente'});
    },
    error: () => {
      this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo guardar la carga familiar'});
    }
  });
}



agregarCargaFamiliarTemp() {
  if (
    !this.nuevaCargaFamiliar.cedula ||
    !this.nuevaCargaFamiliar.nombre ||
    !this.nuevaCargaFamiliar.apellido ||
    !this.nuevaCargaFamiliar.nivel_educativo ||
    !this.nuevaCargaFamiliar.parentesco
  ) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de carga familiar son obligatorios'});
    return;
  }
  this.cargasFamiliaresTempData.push({ ...this.nuevaCargaFamiliar });
  this.nuevaCargaFamiliar = {};
}

 //-----------documentos------------------------------------------------
editarDocumento(doc: any) {
  this.documentoEditando = { ...doc }; // Copia los datos del documento seleccionado
  this.mostrarDialogoEditar = true;    // Abre el diálogo de edición
}




//editar los documentos de mis funcionarios
 onFileEditSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.documentoEditando.archivo = file;
      this.documentoEditando.ruta_almacenamiento = file.name;
    }
  }


onDocumentoFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.nuevoDocumento.archivo = file;
    if (file.type.startsWith('image/')) {
      this.isImage = true;
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrl = e.target.result;
      reader.readAsDataURL(file);
    } else {
      this.isImage = false;
      this.previewUrl = null;
    }
  }
}


  getTipoDocumento() {
    this.TipoDocumentoService.getTipodocumento().subscribe(data => {
      this.tipodocumentodata = data;
    });
  }

agregarDocumentoTemp() {
  console.log('Enviando:', {
  archivo: this.nuevoDocumento.archivo,
  tipo_documento_id: this.nuevoDocumento.tipo_documento_id,
  funcionario_id: this.funcionarios.id
});
   if (!this.nuevoDocumento.tipo_documento_id || !this.nuevoDocumento.archivo) return;

const tipo = this.tipodocumentodata.find(t => t.id == this.nuevoDocumento.tipo_documento_id);
  // Clona el objeto para evitar referencias
  const docTemp = {
    ...this.nuevoDocumento,
    nombre_archivo: this.nuevoDocumento.archivo.name,
    nombre_tipo_documento: tipo ? tipo.nombre_archivo:'',
    ruta_almacenamiento: this.nuevoDocumento.archivo.name // Solo para mostrar el nombre, la ruta real la tendrás al guardar en backend
  };

 

  // Limpia el formulario
  this.nuevoDocumento = {};
  this.previewUrl = null;
  this.isImage = false; // <-- Verifica que exista el id
  if (!this.funcionarios.id) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Archivo, tipo de documento y funcionario son obligatorios'});
    return;
  }

 const formData = new FormData();
formData.append('archivo', this.nuevoDocumento.archivo);
formData.append('tipo_documento_id', this.nuevoDocumento.tipo_documento_id);
formData.append('funcionario_id', this.funcionarios.id.toString()); // ¡Esto es obligatorio!

 this.DocumentosService.subirDocumento(formData).subscribe({
  next: (resp) => {
    this.documentosTempData.push({
      ...this.nuevoDocumento,
      ruta_almacenamiento: resp.ruta_almacenamiento // <-- asegúrate que el backend lo devuelva
    });
    this.nuevoDocumento = {};
    this.MessageService.add({severity:'success', summary:'Documento agregado', detail:'Documento subido correctamente'});
  },
  error: (err) => {
    this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo subir el documento'});
  }
});
}

getDocumentosFuncionario(funcionarioId: number) {
  this.DocumentosService.getDocumentos().subscribe(data => {
    this.documentosTempData = data.filter(doc => doc.funcionario_id === funcionarioId);
  });
}

guardarEdicionDocumento() {
  // Si se seleccionó un nuevo archivo, súbelo
  if (this.documentoEditando.archivo instanceof File) {
    const formData = new FormData();
    formData.append('archivo', this.documentoEditando.archivo);
    formData.append('tipo_documento_id', this.documentoEditando.tipo_documento_id);
    formData.append('funcionario_id', this.funcionarios.id != null ? this.funcionarios.id.toString() : '');

    this.DocumentosService.actualizarDocumento(this.documentoEditando.id, formData).subscribe({
      next: (resp) => {
        // Actualiza la ruta real devuelta por el backend
        const idx = this.documentosTempData.findIndex(d => d.id === this.documentoEditando.id);
        if (idx !== -1) {
          this.documentosTempData[idx] = {
            ...this.documentoEditando,
            ruta_almacenamiento: resp.ruta_almacenamiento // Usa la ruta real del backend
          };
          this.documentosTempData = [...this.documentosTempData]; // Refresca la tabla
        }
        this.mostrarDialogoEditar = false;
        this.MessageService.add({severity:'success', summary:'Documento actualizado', detail:'Documento editado correctamente'});
      },
      error: () => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo actualizar el documento'});
      }
    });
  } else {
    // Si no se cambió el archivo, solo actualiza los datos locales
    const idx = this.documentosTempData.findIndex(d => d.id === this.documentoEditando.id);
    if (idx !== -1) {
      this.documentosTempData[idx] = { ...this.documentoEditando };
      this.documentosTempData = [...this.documentosTempData];
    }
    this.mostrarDialogoEditar = false;
  }
}
getDocumentoUrl(doc: any): string {
  return 'http://localhost:5000/uploads/documentos/' + doc.ruta_almacenamiento;
}
  getFuncionariosById(id: number) {
    this.FuncionarioService.getFuncionarioById(id).subscribe(data => {
      this.funcionarios = data;
    });
  }

  getNombreTipoDocumento(tipoIdOrDoc: any): string {
  // Si es un objeto y tiene el nombre, úsalo
  if (tipoIdOrDoc && typeof tipoIdOrDoc === 'object' && tipoIdOrDoc.nombre_tipo_documento) {
    return tipoIdOrDoc.nombre_tipo_documento;
  }
  // Si es un id, busca en el catálogo
  const tipoId = typeof tipoIdOrDoc === 'object' ? tipoIdOrDoc.tipo_documento_id : tipoIdOrDoc;
  const tipo = this.tipodocumentodata.find(t => t.id == tipoId);
  return tipo ? tipo.nombre_archivo : 'Desconocido';
}
//------------capacitaciones------------------------------------------------




editFuncionario(funcionario: Funcionario) {
  if (funcionario.id) {
    // 1. Asigna el funcionario al modelo principal
    this.funcionarios = { ...funcionario };
    if (this.funcionarios.fecha_inicio_contrato && this.funcionarios.fecha_inicio_contrato.includes('T')) {
      this.funcionarios.fecha_inicio_contrato = this.funcionarios.fecha_inicio_contrato.substring(0, 10);
    }
    if (this.funcionarios.fecha_fin_contrato && this.funcionarios.fecha_fin_contrato.includes('T')) {
      this.funcionarios.fecha_fin_contrato = this.funcionarios.fecha_fin_contrato.substring(0, 10);
    }
    if (this.funcionarios.fecha_nacimiento && this.funcionarios.fecha_nacimiento.includes('T')) {
      this.funcionarios.fecha_nacimiento = this.funcionarios.fecha_nacimiento.substring(0, 10);
    }
    // 2. Asigna los valores de dirección
    this.direccion.provincia_id = funcionario.provincia_id;
    this.direccion.canton_id = funcionario.canton_id;
    this.direccion.parroquia_id = funcionario.parroquia_id;

    // 3. Carga provincias y cantones, y luego asigna los valores dependientes
    this.getProvincias();
    if (funcionario.provincia_id) {
      this.getCantones(funcionario.provincia_id, () => {
        if (funcionario.canton_id) {
          this.getParroquias(funcionario.canton_id);
        }
      });
    }
    // 4. Carga los datos relacionados
    this.getDocumentosFuncionario(funcionario.id); // <--- SOLO ESTA LLAMADA
    this.getTrayectoriasFuncionario(funcionario.id);
    this.getInfoBancariaFuncionario(funcionario.id);
    this.getContactosFuncionario(funcionario.id);
    this.getFormacionAcademicaFuncionario(funcionario.id);
    this.getContactos(funcionario.id);
    this.getDiscapacidadFuncionario(funcionario.id);
    this.getCapacitacionesFuncionario(funcionario.id);

    // 5. Contratos y discapacidad
    this.contratosTempData = [];
    if (funcionario.fecha_inicio_contrato) {
      this.contratosTempData.push({
        sigueLaborando: !funcionario.fecha_fin_contrato,
        fecha_inicio_contrato: funcionario.fecha_inicio_contrato,
        fecha_fin_contrato: funcionario.fecha_fin_contrato || null
      });
    }
    this.tieneDiscapacidad = !!(funcionario.Numero_carnet_discapacidad || funcionario.tipo_discapacidad_id || funcionario.grado_discapacidad_id);

    // 6. Abre el diálogo
    this.funcionarioDialog = true;
  } else {
    this.MessageService.add({severity:'error', summary:'Error', detail:'ID no disponible para el funcionario seleccionado'});
  }
}
agregarFormacionAcademicaTemp() {
  
  if (
    !this.nuevaFormacionAcademica.institucion ||
    !this.nuevaFormacionAcademica.titulo_obtenido ||
    !this.nuevaFormacionAcademica.n_registro ||
    !this.nuevaFormacionAcademica.especialidad ||
    !this.nuevaFormacionAcademica.fecha_registro
  ) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de formación académica son obligatorios'});
    return;
  }
  this.formacionAcademicaTempData.push({ ...this.nuevaFormacionAcademica });
  this.nuevaFormacionAcademica = {};
}
// ...existing code...
  getTipoDiscapacidad() {
    this.TipodiscapacidadService.getTipodiscapacidad().subscribe(data => {
      this.tipodiscapacidaddata = data;
    });
  }
  
calcularEdad(fechaNacimiento: string) {
  if (fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    this.funcionarios.edad = edad;
  } else {
    this.funcionarios.edad = undefined;
  }
}


onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  selectedImage: string | null = null;
  showImageDialog: boolean = false;

  onShowImage(foto: string) {
    this.selectedImage = 'http://localhost:5000/uploads/funcionarios/' + foto;
    this.showImageDialog = true;
  }

  getNombreOriginal(foto: string): string {
    const nombreArchivo = foto.split('/').pop() || '';
    return nombreArchivo.replace(/-\d+\./, '.');
  }

  deleteFuncionario(id: number) {
    this.FuncionarioService.deleteFuncionario(id).subscribe((msg) => {
      this.MessageService.add({severity:'success', summary:'Eliminado', detail:'Funcionario eliminado'});
      this.getFuncionarios();
    });
  }

  
openNew() {
  this.funcionarios = {} as Funcionario;
  this.direccion = {}; // Limpia provincia, cantón y parroquia
  this.cantonesData = [];
  this.parroquiasData = [];
  this.submitted = false;
  this.funcionarioDialog = true;
  this.contactosData = [];
  this.documentosTempData = [];
  this.capacitacionesTempData = [];
  this.cargasFamiliaresData = [];
}

  hideDialog() {
    this.funcionarioDialog = false;
    this.submitted = false;
  }

 
  

// Modifica tu método getCantones para aceptar un callback opcional:
getCantones(provinciaId: number, callback?: () => void) {
  this.CantonService.getCanton().subscribe(data => {
    this.cantonesData = data.filter((canton: any) => canton.provincia_id === provinciaId);
    if (callback) callback();
  });
}
// Modifica tu método getProvincia para aceptar un callback opcional:
getProvincia(provinciaId: number, callback?: () => void) {
  this.ProvinciaService.getProvincia().subscribe(data => {
    this.provinciasData = data.filter((provincia: any) => provincia.id === provinciaId);
    if (callback) callback();
  });
}
onCantonChange(event: any) {
  const cantonId = event.value || this.direccion.canton_id;
  this.ParroquiaService.getParroquiasByCanton(cantonId).subscribe(data => {
    this.parroquiasData = Array.isArray(data) ? data : [];
    console.log('Parroquias recibidas:', this.parroquiasData);
  });
}






//--------------INFORMACION BANCARIA-------------------
guardarEdicionInfoBancaria() {
  // Busca el nombre actualizado según el ID seleccionado
  const institucion = this.institucionesFinancieras.find(
    i => i.id === this.infoBancariaEditando.institucion_financiera_id
  );
  this.infoBancariaEditando.nombre_institucion = institucion ? institucion.nombre_institucion : 'Sin institución';

  if (!this.infoBancariaEditando.id) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'No se puede actualizar: falta el ID de la información bancaria.'});
    return;
  }

  if (this.indiceInfoBancariaEditando !== -1) {
    this.InstitucionBancariaService.updateInstitucionBancaria(
      this.infoBancariaEditando.id,
      this.infoBancariaEditando
    ).subscribe({
      next: () => {
        this.infoBancariaTempData[this.indiceInfoBancariaEditando] = { ...this.infoBancariaEditando };
        this.infoBancariaTempData = [...this.infoBancariaTempData];
        this.indiceInfoBancariaEditando = -1;
        this.infoBancariaEditando = {};
        this.mostrarDialogoEditarInfoBancaria = false;
      },
      error: () => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo actualizar en el servidor.'});
      }
    });
  } else {
    this.mostrarDialogoEditarInfoBancaria = false;
  }
}
agregarInfoBancariaTempData() {
  const institucion = this.institucionesFinancieras.find(i => i.id === this.nuevaInfoBancaria.institucion_financiera_id);
this.infoBancariaTempData.push({
  ...this.nuevaInfoBancaria,
  nombre_institucion: institucion ? institucion.nombre_institucion : ''
});
  if (
    !this.nuevaInfoBancaria.nombre_institucion ||
    !this.nuevaInfoBancaria.numero_cuenta ||
    !this.nuevaInfoBancaria.tipo_cuenta
  ) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de información bancaria son obligatorios'});
    return;
  }
  this.nuevaInfoBancaria = {};
}



agregarInfoBancariaTemp() {
  if (
    !this.nuevaInfoBancaria.numero_cuenta ||
    !this.nuevaInfoBancaria.tipo_cuenta_id ||
    !this.nuevaInfoBancaria.institucion_financiera_id
  ) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de información bancaria son obligatorios'});
    return;
  }
  const institucion = this.institucionesFinancieras.find(i => i.id === this.nuevaInfoBancaria.institucion_financiera_id);
  const tipoCuentaObj = this.tiposCuenta.find(tc => tc.id === this.nuevaInfoBancaria.tipo_cuenta_id);

  this.infoBancariaTempData.push({
    institucion_financiera_id: this.nuevaInfoBancaria.institucion_financiera_id,
    nombre_institucion: institucion ? institucion.nombre_institucion : '',
    numero_cuenta: this.nuevaInfoBancaria.numero_cuenta,
    tipo_cuenta_id: this.nuevaInfoBancaria.tipo_cuenta_id,
    
  });

  this.nuevaInfoBancaria = {};
}

cargarInformacionBancaria() {
  this.InstitucionFinancieraService.getInstitucionFinanciera().subscribe(data => {
    this.infoBancaria = data;
  });
}

editarInfoBancaria(info: any) {
  this.infoBancariaEditando = { ...info };
  this.indiceInfoBancariaEditando = this.infoBancariaTempData.findIndex(
    i => i.id === info.id
  );
  this.mostrarDialogoEditarInfoBancaria = true;
}


//--------------TRAYECTORIA LABORAL-------------------




editarTrayectoria(trayectoria: any) {
  this.trayectoriaEditando = { ...trayectoria };
  this.mostrarDialogoEditarTrayectoria = true;
}

guardarEdicionTrayectoria() {
  const idx = this.trayectoriasTempData.findIndex(t => t.id === this.trayectoriaEditando.id);
  if (idx !== -1) {
    this.trayectoriasTempData[idx] = { ...this.trayectoriaEditando };
    this.trayectoriasTempData = [...this.trayectoriasTempData];
  }
  this.mostrarDialogoEditarTrayectoria = false;
}


agregarTrayectoriaLaboralTemp() {
   if (!this.nuevaTrayectoria.nombre_cargo || !this.nuevaTrayectoria.nombre_cargo.trim()) {
    this.mensajeValidacion = 'El nombre del cargo es requerido.';
    this.mostrarDialogoValidacion = true;
    return;
  }
  
  this.trayectoriasTempData.push({ ...this.nuevaTrayectoria });

  this.nuevaTrayectoria = {};
}

cargarTrayectorias() {
  this.TrayectoriaService.getTrayectoria().subscribe(data => {
    this.trayectorias = data;
  });
}
getTrayectoriasFuncionario(funcionarioId: number) {
  this.TrayectoriaService.getTrayectoria().subscribe(data => {
    this.trayectoriasTempData = data.filter((t: any) => t.funcionario_id === funcionarioId);
  });
}

//--------------CONTACTOS-------------------

editarContacto(contacto: any) {
  this.contactoEditando = { ...contacto };
  this.mostrarDialogoEditarContacto = true;
}

guardarEdicionContacto() {
  const idx = this.contactosTempData.findIndex(c => c.id === this.contactoEditando.id);
  if (idx !== -1) {
    this.contactosTempData[idx] = { ...this.contactoEditando };
    this.contactosTempData = [...this.contactosTempData];
  }
  this.mostrarDialogoEditarContacto = false;
}



cargarContactos() {
  this.ContactosService.getContactos().subscribe(data => {
    this.contactos = data;
  });
}

getContactosFuncionario(funcionarioId: number) {
  this.ContactosService.getContactos().subscribe(data => {
    this.contactosTempData = data.filter((c: any) => c.funcionario_id === funcionarioId);
  });
}





//--------------FORMACIÓN ACADÉMICA-------------------

editarFormacionAcademica(formacion: any) {
  this.formacionAcademicaEditando = { ...formacion };
  this.mostrarDialogoEditarFormacionAcademica = true;
}

guardarEdicionFormacionAcademica() {
  const idx = this.formacionAcademicaTempData.findIndex(f => f.id === this.formacionAcademicaEditando.id);
  if (idx !== -1) {
    this.formacionAcademicaTempData[idx] = { ...this.formacionAcademicaEditando };
    this.formacionAcademicaTempData = [...this.formacionAcademicaTempData];
  }
  this.mostrarDialogoEditarFormacionAcademica = false;
}

cargarFormacionAcademica() {
  this.FormacionService.getFormacion().subscribe(data => {
    this.formacionAcademica = data;
  });
}

getFormacionAcademicaFuncionario(funcionarioId: number) {
  this.FormacionService.getFormacion().subscribe(data => {
    this.formacionAcademicaTempData = data.filter((f: any) => f.funcionario_id === funcionarioId);
  });
}


//----------------contratos-------------------
editarContrato(contrato: any, index: number) {
  const idx = this.contratosTempData.findIndex(c => c.id === contrato.id);
  this.contratoEditando = { ...contrato };
  this.indiceContratoEditando = index;
  this.mostrarDialogoEditarContrato = true;
}

guardarEdicionContrato() {
  if (this.indiceContratoEditando !== undefined && this.indiceContratoEditando !== -1) {
    this.contratosTempData[this.indiceContratoEditando] = { ...this.contratoEditando };
    this.contratosTempData = [...this.contratosTempData];
    this.indiceContratoEditando =  -1; // Resetea el índice después de guardar
  }
  this.mostrarDialogoEditarContrato = false;
}

getInfoBancariaFuncionario(funcionarioId: number) {
  this.InstitucionBancariaService.getInstitucionBancaria().subscribe(data => {
    console.log('Datos bancarios recibidos:', data); // <-- Agrega esto
    this.infoBancariaTempData = data
      .filter((i: any) => i.funcionario_id === funcionarioId)
      .map((info: any) => {
        const institucion = this.institucionesFinancieras.find(
          (inst: any) => inst.id === info.institucion_financiera_id
        );
        const tipoCuentaObj = this.tiposCuenta.find(tc => tc.id === info.tipo_cuenta_id);
        return {
          ...info,
          nombre_institucion: institucion ? institucion.nombre_institucion : 'Sin institución',
          tipo_cuenta: tipoCuentaObj ? tipoCuentaObj.nombre : 'Sin tipo'
        };
      });
    console.log('infoBancariaTempData:', this.infoBancariaTempData); // <-- Y esto
  });
}
agregarContratoTempData() {
 
// ...existing code...
this.contratosTempData = this.contratosTempData.map(contrato => ({
  ...contrato,
  fecha_inicio_contrato: contrato.fecha_inicio_contrato && contrato.fecha_inicio_contrato.includes('T')
    ? contrato.fecha_inicio_contrato.substring(0, 10)
    : contrato.fecha_inicio_contrato,
  fecha_fin_contrato: contrato.fecha_fin_contrato && contrato.fecha_fin_contrato.includes('T')
    ? contrato.fecha_fin_contrato.substring(0, 10)
    : contrato.fecha_fin_contrato,
}));
// ...existing code...
  // Validación de campos obligatorios
  if (
    this.sigueLaborando === undefined ||
    !this.funcionarios.fecha_inicio_contrato ||
    (this.sigueLaborando === false && !this.funcionarios.fecha_fin_contrato)
  ) {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de contrato son obligatorios'});
    return;
  }

  // Agrega el contrato temporal
this.contratosTempData.push({
  sigueLaborando: this.sigueLaborando,
  fecha_inicio_contrato: this.funcionarios.fecha_inicio_contrato, // string "YYYY-MM-DD"
  fecha_fin_contrato: this.sigueLaborando ? null : this.funcionarios.fecha_fin_contrato // string o null
});

if (this.funcionarios.fecha_fin_contrato && this.funcionarios.fecha_fin_contrato.includes('T')) {
  this.funcionarios.fecha_fin_contrato = this.funcionarios.fecha_fin_contrato.substring(0, 10);
}

// Limpia los campos del formulario de contrato
this.sigueLaborando = true;
this.funcionarios.fecha_inicio_contrato = '';
this.funcionarios.fecha_fin_contrato = '';
}

//--------------discapacidad-------------------

agregarDiscapacidadTempData() {
  if (
    this.discapacidad.Numero_carnet_discapacidad &&
    this.discapacidad.tipo_discapacidad_id &&
    this.discapacidad.grado_discapacidad_id
  ) {
    this.discapacidadTempData.push({
      Numero_carnet_discapacidad: this.discapacidad.Numero_carnet_discapacidad,
      tipo_discapacidad_id: this.discapacidad.tipo_discapacidad_id,
      grado_discapacidad_id: this.discapacidad.grado_discapacidad_id
    });
    // Limpiar campos
    this.discapacidad.Numero_carnet_discapacidad = '';
    this.discapacidad.tipo_discapacidad_id = undefined;
    this.discapacidad.grado_discapacidad_id = undefined;
  }
}
editarDiscapacidad(discapacidad: any) {
  this.discapacidadOriginal = { ...discapacidad };
  this.indiceDiscapacidadEditando = this.discapacidadTempData.findIndex(d =>
    d.Numero_carnet_discapacidad === discapacidad.Numero_carnet_discapacidad &&
    d.tipo_discapacidad_id === discapacidad.tipo_discapacidad_id &&
    d.grado_discapacidad_id === discapacidad.grado_discapacidad_id
  );
  this.discapacidadEditando = { ...discapacidad };
  this.funcionarios.Numero_carnet_discapacidad = discapacidad.Numero_carnet_discapacidad;
  this.funcionarios.tipo_discapacidad_id = discapacidad.tipo_discapacidad_id;
  this.funcionarios.grado_discapacidad_id = discapacidad.grado_discapacidad_id;
  this.mostrarDialogoEditarDiscapacidad = true;
}
guardarEdicionDiscapacidad() {
  // Busca el índice usando los valores originales
  const idx = this.discapacidadTempData.findIndex(d =>
    d.Numero_carnet_discapacidad === this.discapacidadOriginal.Numero_carnet_discapacidad &&
    d.tipo_discapacidad_id === this.discapacidadOriginal.tipo_discapacidad_id &&
    d.grado_discapacidad_id === this.discapacidadOriginal.grado_discapacidad_id
  );
  if (idx !== -1) {
    this.discapacidadTempData[idx] = {
      Numero_carnet_discapacidad: this.funcionarios.Numero_carnet_discapacidad,
      tipo_discapacidad_id: this.funcionarios.tipo_discapacidad_id,
      grado_discapacidad_id: this.funcionarios.grado_discapacidad_id
    };
  }
  this.mostrarDialogoEditarDiscapacidad = false;
  this.indiceDiscapacidadEditando = -1;
  this.discapacidadEditando = {};
  this.discapacidadOriginal = null;
}
getNombreTipoDiscapacidad(id: number): string {
  const tipo = this.tipodiscapacidaddata?.find((t: any) => t.id === id);
  return tipo && typeof tipo.descripcion === 'string' ? tipo.descripcion : '';
}

getNombreGradoDiscapacidad(id: number): string {
  const grado = this.gradodiscapacidaddata?.find((g: any) => g.id === id);
  return grado && typeof grado.grado === 'string' ? grado.grado : '';
}

 getDiscapacidadFuncionario(funcionarioId: number) {
  // Limpia el arreglo antes de cargar
  this.discapacidadTempData = [];
  this.DiscapacidadService.getDiscapacidadesByFuncionario(funcionarioId).subscribe(data => {
    this.discapacidadTempData = data.map(d => ({
      Numero_carnet_discapacidad: d.Numero_carnet_discapacidad,
      tipo_discapacidad_id: d.tipo_discapacidad_id,
      grado_discapacidad_id: d.grado_discapacidad_id
    }));
    this.tieneDiscapacidad = this.discapacidadTempData.length > 0;
  });
  
}



filtrarFuncionarios(event: Event, dt: any) {
  const input = event.target as HTMLInputElement;
  dt.filterGlobal(input.value, 'contains');
}
// ver detalles 
verDiscapacidadesFuncionario(funcionario: any) {
  this.DiscapacidadService.getDiscapacidadesByFuncionario(funcionario.id).subscribe(data => {
    this.discapacidadesFuncionario = data;
    this.mostrarDialogoDiscapacidades = true;
  });
}
verContactosFuncionario(funcionario: any) {
  this.ContactosService.getContactos().subscribe(data => {
    this.contactosFuncionario = data.filter((c: any) => c.funcionario_id === funcionario.id);
    this.mostrarDialogoContactos = true;
  });
}
verTrayectoriasFuncionario(funcionario: any) {
  this.TrayectoriaService.getTrayectoria().subscribe(data => {
    this.trayectoriasFuncionario = data.filter((t: any) => t.funcionario_id === funcionario.id);
    this.mostrarDialogoTrayectorias = true;
  });
}
verInfoBancariaFuncionario(funcionario: any) {
  // Asegúrate de que institucionesFinancieras esté cargado
  if (!this.institucionesFinancieras || this.institucionesFinancieras.length === 0) {
    this.getInstitucionesFinancieras();
    setTimeout(() => this.verInfoBancariaFuncionario(funcionario), 300);
    return;
  }
  this.InstitucionBancariaService.getInstitucionBancaria().subscribe(data => {
    this.infoBancariaFuncionario = data
      .filter((i: any) => i.funcionario_id === funcionario.id)
      .map((info: any) => {
        const institucion = this.institucionesFinancieras.find(
          (inst: any) => inst.id === info.institucion_financiera_id
        );
        return {
          ...info,
          nombre_institucion: institucion ? institucion.nombre_institucion : 'Sin institución'
        };
      });
    this.mostrarDialogoInfoBancaria = true;
  });
}
verFormacionAcademicaFuncionario(funcionario: any) {
  this.FormacionService.getFormacion().subscribe(data => {
    this.formacionAcademicaFuncionario = data.filter((f: any) => f.funcionario_id === funcionario.id);
    this.mostrarDialogoFormacionAcademica = true;
  });
}

verContratoFuncionario(funcionario: any) {
  this.contratoSeleccionado = {
    fecha_inicio_contrato: funcionario.fecha_inicio_contrato,
    fecha_fin_contrato: funcionario.fecha_fin_contrato
  };
  this.mostrarDialogoContrato = true;
}

verCapacitacionesFuncionario(funcionario: any) {
  this.CapacitacionesService.getCapacitacionesById(funcionario.id).subscribe(data => {
    this.capacitacionesFuncionario = Array.isArray(data) ? data : [];
    this.mostrarDialogoCapacitaciones = true;
  });
}
getNombreInstitucionFinanciera(id: number): string {
  if (!this.institucionesFinancieras) return 'Sin institución';
  const institucion = this.institucionesFinancieras.find(i => i.id === id);
  return institucion ? institucion.nombre_institucion : 'Sin institución';
}
// En el componente
formatearFecha(fecha: string): string {
  if (!fecha) return '';
  // Si la fecha viene en formato ISO, la recortamos
  if (fecha.includes('T')) {
    fecha = fecha.substring(0, 10);
  }
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}
//lupa
limpiarBusqueda(dt: any) {
  this.textoBusqueda = '';
  dt.filterGlobal('', 'contains');
}

agregarDireccionTemp() {
  const provincia = this.provinciasData.find(p => p.id === this.funcionarios.provincia_id);
  const canton = this.cantonesData.find(c => c.id === this.funcionarios.canton_id);
  const parroquia = this.parroquiasData.find(p => p.id === this.funcionarios.parroquia_id);

  const provinciaReferencia = this.provinciasData.find(p => p.id === this.funcionarios.provincia_referencia_id);
  const cantonReferencia = this.cantonesData.find(c => c.id === this.funcionarios.canton_referencia_id);
  const parroquiaReferencia = this.parroquiasData.find(p => p.id === this.funcionarios.parroquia_referencia_id);

  const provinciaResidencia = this.provinciasData.find(p => p.id === this.funcionarios.provincia_residencia_id);
  const cantonResidencia = this.cantonesData.find(c => c.id === this.funcionarios.canton_residencia_id);
  const parroquiaResidencia = this.parroquiasData.find(p => p.id === this.funcionarios.parroquia_residencia_id);

  this.direccionesTempData.push({
    direccion: this.funcionarios.direccion,
    provincia_nombre: provincia ? provincia.nombre_provincia : '',
    canton_nombre: canton ? canton.descripcion : '',
    parroquia_nombre: parroquia ? parroquia.descripcion : '',

    direccion_referencia: this.funcionarios.direccion_referencia,
    provincia_referencia_nombre: provinciaReferencia ? provinciaReferencia.nombre_provincia : '',
    canton_referencia_nombre: cantonReferencia ? cantonReferencia.descripcion : '',
    parroquia_referencia_nombre: parroquiaReferencia ? parroquiaReferencia.descripcion : '',

    residencia: this.funcionarios.residencia,
    provincia_residencia_nombre: provinciaResidencia ? provinciaResidencia.nombre_provincia : '',
    canton_residencia_nombre: cantonResidencia ? cantonResidencia.descripcion : '',
    parroquia_residencia_nombre: parroquiaResidencia ? parroquiaResidencia.descripcion : ''
  });
  localStorage.setItem('direccionesTempData', JSON.stringify(this.direccionesTempData));

  // Limpia los campos si lo deseas
  // ...
}
mostrarDocumentos(funcionario: any) {
  this.DocumentosService.getDocumentos().subscribe(data => {
    this.documentosFuncionario = data.filter(doc => doc.funcionario_id === funcionario.id);
    this.mostrarDocsDialog = true;
    console.log('Documentos encontrados:', this.documentosFuncionario);
  });
}
editarDireccionTemp(dir: any, index: number) {
  // 1. Asigna dirección principal
  this.funcionarios.direccion = dir.direccion;
  // Carga cantones y parroquias dependientes antes de asignar el valor
  const provincia = this.provinciasData.find(p => p.nombre_provincia === dir.provincia_nombre);
  if (provincia) {
    this.funcionarios.provincia_id = provincia.id;
    this.getCantones(provincia.id, () => {
      const canton = this.cantonesData.find(c => c.descripcion === dir.canton_nombre);
      if (canton) {
        this.funcionarios.canton_id = canton.id;
        this.getParroquias(canton.id, () => {
          const parroquia = this.parroquiasData.find(p => p.descripcion === dir.parroquia_nombre);
          if (parroquia) {
            this.funcionarios.parroquia_id = parroquia.id;
          }
        });
      }
    });
  }

  // 2. Dirección de referencia
  const provinciaRef = this.provinciasData.find(p => p.nombre_provincia === dir.provincia_referencia_nombre);
  if (provinciaRef) {
    this.funcionarios.provincia_referencia_id = provinciaRef.id;
    this.getCantones(provinciaRef.id, () => {
      const cantonRef = this.cantonesData.find(c => c.descripcion === dir.canton_referencia_nombre);
      if (cantonRef) {
        this.funcionarios.canton_referencia_id = cantonRef.id;
        this.getParroquias(cantonRef.id, () => {
          const parroquiaRef = this.parroquiasData.find(p => p.descripcion === dir.parroquia_referencia_nombre);
          if (parroquiaRef) {
            this.funcionarios.parroquia_referencia_id = parroquiaRef.id;
          }
        });
      }
    });
  }
  this.funcionarios.direccion_referencia = dir.direccion_referencia;

  // 3. Residencia
  const provinciaRes = this.provinciasData.find(p => p.nombre_provincia === dir.provincia_residencia_nombre);
  if (provinciaRes) {
    this.funcionarios.provincia_residencia_id = provinciaRes.id;
    this.getCantones(provinciaRes.id, () => {
      const cantonRes = this.cantonesData.find(c => c.descripcion === dir.canton_residencia_nombre);
      if (cantonRes) {
        this.funcionarios.canton_residencia_id = cantonRes.id;
        this.getParroquias(cantonRes.id, () => {
          const parroquiaRes = this.parroquiasData.find(p => p.descripcion === dir.parroquia_residencia_nombre);
          if (parroquiaRes) {
            this.funcionarios.parroquia_residencia_id = parroquiaRes.id;
          }
        });
      }
    });
  }
  this.funcionarios.residencia = dir.residencia;

  this.indiceDireccionEditando = index;
}
cargarTiposCuenta() {
  this.TipoCuentaService.getTiposCuenta().subscribe(data => {
    this.tiposCuenta = data;
  });
}
getNombreTipoCuenta(id: number): string {
  const tipoCuenta = this.tiposCuenta.find(tc => tc.id === id);
  const nombreTipoCuenta = tipoCuenta ? tipoCuenta.nombre : '';
  // Si quieres asignar el nombre al objeto nuevaInfoBancaria, hazlo solo si corresponde
  // this.nuevaInfoBancaria.tipo_cuenta_nombre = nombreTipoCuenta;
  return nombreTipoCuenta;
}

getCapacitacionesFuncionario(funcionarioId: number) {
  this.CapacitacionesService.getCapacitacionesById(funcionarioId).subscribe(data => {
    // Asegúrate de que cada objeto tenga un id
    this.capacitacionesTempData = Array.isArray(data)
      ? data.map((cap: any) => ({ ...cap, id: cap.id }))
      : [];
  });
}

// Agrega la capacitación a la tabla temporal
agregarCapacitacionTemp() {
  if (
    this.nuevaCapacitacion.descripcion &&
    this.nuevaCapacitacion.fecha_inicio &&
    this.nuevaCapacitacion.fecha_fin &&
    this.nuevaCapacitacion.n_horas &&
    this.nuevaCapacitacion.archivo
  ) {
    if (!this.funcionarios.id) {
      this.capacitacionesTempData.push({ ...this.nuevaCapacitacion });
      this.nuevaCapacitacion = {};
      this.capacitacionPreviewUrl = null;
      this.MessageService.add({severity:'info', summary:'Temporal', detail:'La capacitación se guardará cuando guardes el funcionario.'});
      return;
    }

    const formData = new FormData();
    formData.append('descripcion', this.nuevaCapacitacion.descripcion.toString());
    formData.append('fecha_inicio', this.nuevaCapacitacion.fecha_inicio instanceof Date
      ? this.nuevaCapacitacion.fecha_inicio.toISOString().substring(0, 10)
      : this.nuevaCapacitacion.fecha_inicio);
    formData.append('fecha_fin', this.nuevaCapacitacion.fecha_fin instanceof Date
      ? this.nuevaCapacitacion.fecha_fin.toISOString().substring(0, 10)
      : this.nuevaCapacitacion.fecha_fin);
    formData.append('n_horas', this.nuevaCapacitacion.n_horas.toString());
    formData.append('archivo', this.nuevaCapacitacion.archivo);
    formData.append('funcionario_id', this.funcionarios.id ? this.funcionarios.id.toString() : '');
    formData.append('ruta_almacenamiento', this.nuevaCapacitacion.archivo.name); // o el nombre que quieras guardar

    this.CapacitacionesService.subirCapacitacion(formData).subscribe({
      next: (resp: any) => {
        this.capacitacionesTempData.push({
          ...this.nuevaCapacitacion,
          ruta_almacenamiento: resp.ruta_almacenamiento
        });
        this.nuevaCapacitacion = {};
        this.capacitacionPreviewUrl = null;
        this.MessageService.add({severity:'success', summary:'Éxito', detail:'Capacitación agregada correctamente'});
      },
      error: (err) => {
        this.MessageService.add({severity:'error', summary:'Error', detail:'No se pudo subir la capacitación'});
        console.error('Error al subir capacitación:', err);
      }
    });
  } else {
    this.MessageService.add({severity:'error', summary:'Error', detail:'Todos los campos de capacitación son obligatorios'});
  }
}
getCapacitacionRutaArchivo(cap: any): string | null {
  // Si ya está en el backend
  if (cap.ruta_almacenamiento) {
    return 'http://localhost:5000/uploads/capacitaciones/' + cap.ruta_almacenamiento;
  }
   if (cap.archivo) {
    return URL.createObjectURL(cap.archivo);
  }
  return null;
}


editarCapacitacion(cap: any, index: number) {
  this.nuevaCapacitacion = { ...cap };
  this.indiceCapacitacionEditando = index;
  this.capacitacionPreviewUrl = this.getCapacitacionRutaArchivo(cap);
  this.mostrarDialogoEditarCapacitacion = true;
}

// Para guardar la edición:
guardarEdicionCapacitacion() {
  if (
    this.indiceCapacitacionEditando !== undefined &&
    this.indiceCapacitacionEditando !== -1
  ) {
    this.capacitacionesTempData[this.indiceCapacitacionEditando] = { ...this.nuevaCapacitacion };
    this.capacitacionesTempData = [...this.capacitacionesTempData];
    this.indiceCapacitacionEditando = -1;
    this.nuevaCapacitacion = {};
    this.capacitacionPreviewUrl = null;
    this.mostrarDialogoEditarCapacitacion = false;
  }
}

onCapacitacionFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.nuevaCapacitacion.archivo = file;
    if (file.type.startsWith('image/')) {
      this.isImage = true;
      const reader = new FileReader();
      reader.onload = (e: any) => this.capacitacionPreviewUrl = e.target.result;
      reader.readAsDataURL(file);
    } else {
      this.isImage = false;
      this.capacitacionPreviewUrl = null;
    }
  }
}



getNombreArchivoCapacitacion(cap: any): string {
  if (cap.archivo && cap.archivo.name) {
    return cap.archivo.name;
  }
  if (cap.ruta_almacenamiento) {
    // Si tu backend guarda el nombre original en la ruta, extráelo
    return decodeURIComponent(cap.ruta_almacenamiento.split('/').pop() || cap.ruta_almacenamiento);
  }
  return 'Sin archivo';
}

}

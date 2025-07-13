import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './middleware/auth.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { GestionmenuComponent } from './components/pages/administrador/gestionmenu/gestionmenu.component';
import { EtniaComponent } from './components/pages/etnia/etnia.component';
import { GeneroComponent } from './components/pages/genero/genero.component';
import { EstadocivilComponent } from './components/pages/estadocivil/estadocivil.component';
import { GradodiscapacidadComponent } from './components/pages/gradodiscapacidad/gradodiscapacidad.component';
import { ParroquiaComponent } from './components/pages/parroquia/parroquia.component';
import { ProvinciaComponent } from './components/pages/provincia/provincia.component';
import { CantonComponent } from './components/pages/canton/canton.component';
import { TipodiscapacidadComponent } from './components/pages/tipodiscapacidad/tipodiscapacidad.component';
import { TipodocumentoComponent } from './components/pages/tipodocumento/tipodocumento.component';
import { CargaFamiliarComponent } from './components/pages/cargafamiliar/cargafamiliar.component';
import { FuncionarioComponent } from './components/pages/funcionario/funcionario.component';
import { DocumentosComponent } from './components/pages/documentos/documentos.component';
import { InstitucionFinancieraComponent } from './components/pages/institucionfinanciera/institucionfinanciera.component';
import { InstitucionBancariaComponent } from './components/pages/institucionbancaria/institucionbancaria.component';
import { FormacionComponent } from './components/pages/formacionacademica/formacionacademica.component';
import { TrayectoriaComponent } from './components/pages/trayectorialaboral/trayectoria.component';
import { ContactosComponent } from './components/pages/contactos/contactos.component';
import { CapacitacionesComponent } from './components/pages/capacitaciones/capacitaciones.component';
import { DiscapacidadComponent } from './components/pages/discapacidad/discapacidad.component';
import { TipocuentaComponent } from './components/pages/tipocuenta/tipocuenta.component';
import { CargoAsignadoComponent } from './components/pages/cargoasignado/cargoasignado.component';
import { CargoComponent } from './components/pages/cargos/cargos.component';
import { VisualizacionFuncionariosComponent } from './components/pages/visualizacion-funcionarios/visualizacionfuncionarios.component';
import { PeriodoComponent } from './components/pages/periodo/periodo.component';
import { UnidadComponent } from './components/pages/unidad/unidad.component';
import { UnidadCargosComponent } from './components/pages/unidadcargos/unidadcargos.component';

export const routes: Routes = [

  { path: '',
    component:AppLayoutComponent,
    children:[
      { path:'', component:HomeComponent },
      
      { path: 'etnia', component: EtniaComponent },
      { path: 'genero', component: GeneroComponent },
      { path: 'estado_civil', component: EstadocivilComponent },
      { path: 'grado_discapacidad', component: GradodiscapacidadComponent },
      { path: 'parroquia', component: ParroquiaComponent },
      { path: 'provincia', component: ProvinciaComponent },
      { path: 'canton', component: CantonComponent },
      { path: 'tipo_discapacidad', component: TipodiscapacidadComponent },
      { path: 'tipodocumento',component: TipodocumentoComponent },
      { path: 'cargafamiliar',component: CargaFamiliarComponent },
      { path: 'funcionarios', component: FuncionarioComponent },
      { path: 'documentos', component: DocumentosComponent },
      { path: 'institucionfinanciera', component: InstitucionFinancieraComponent },
      { path: 'informacionfinaciera', component: InstitucionBancariaComponent },
      { path: 'formacionacademica', component: FormacionComponent },
      { path: 'trayectoria', component: TrayectoriaComponent },
      { path: 'contactos', component: ContactosComponent },
      { path: 'capacitaciones', component: CapacitacionesComponent },
      { path: 'discapacidad', component: DiscapacidadComponent },
      { path: 'usuario', component: VisualizacionFuncionariosComponent },

      // cargos y asignaciones
      { path: 'cargo_asignado', component: CargoAsignadoComponent },
      { path: 'cargos',component: CargoComponent },
      { path: 'periodo', component: PeriodoComponent },
      { path: 'unidad', component: UnidadComponent },
      { path: 'unidad_cargos', component: UnidadCargosComponent }
    ]
  },
  // { path:'home', component:HomeComponent }
      
];

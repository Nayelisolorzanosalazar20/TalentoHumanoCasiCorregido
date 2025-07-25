import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    menuAbierto: boolean = true; // <-- Agrega esta línea

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }
 toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
}

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Parametrizacion',
            //     items: [
            //         { label: 'Menu', icon: 'pi pi-fw pi-home', routerLink: ['/administrador'] }
            //     ]
            // },


            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                    label: 'Acciones',
                    items: [
                      
                        {
                          label: 'Gestión Talento Humano', icon: 'pi pi-list-check',
                          items: [

                                  // ...existing code...
                                  {label: 'Etnia', icon: 'pi pi-users', routerLink:['/etnia']},
                                  {label: 'Genero', icon: 'pi pi-user', routerLink:['/genero']},
                                  {label: 'Estado Civil', icon: 'pi pi-heart', routerLink:['/estado_civil']},
                                  {label: 'Grado Discapacidad', icon: 'pi pi-star', routerLink:['/grado_discapacidad']},
                                  {label: 'Parroquia', icon: 'pi pi-map-marker', routerLink:['/parroquia']},
                                  {label: 'Provincia', icon: 'pi pi-globe', routerLink:['/provincia']},
                                  {label: 'Canton', icon: 'pi pi-building', routerLink:['/canton']},
                                  {label: 'Tipo Documento', icon: 'pi pi-file', routerLink:['/tipodocumento']},
                                  {label: 'Institucion Financiera', icon: 'pi pi-money-bill', routerLink:['/institucionfinanciera']},
                                  {label: 'Agregar Funcionario', icon: 'pi pi-user-plus', routerLink:['/funcionarios']},
                           

                          ]
                      },
                    


                       {
                          label: 'Funcionarios', icon: 'pi pi-list-check',
                          items: [

                                  // ...existing code...
                                  {label: 'Usuario', icon: 'pi pi-users', routerLink:['/usuario']},
                          ]
                      },


                       {
                          label: 'Asignacion de Cargos de Funcionarios', icon: 'pi pi-list-check',
                          items: [

                                  {label: 'Asignar Cargos', icon: 'pi pi-briefcase', routerLink:['/cargo_asignado']},
                                  {label: 'Agregar Cargos', icon: 'pi pi-briefcase', routerLink:['/cargos']},
                                  {label: 'Periodo', icon: 'pi pi-calendar', routerLink:['/periodo']},
                                  {label: 'Unidad', icon: 'pi pi-building', routerLink:['/unidad']},
                                  {label: 'Unidad Cargo', icon: 'pi pi-briefcase', routerLink:['/unidad_cargos']},
                          ]
                      },
                    ]
            }





            // ,
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // }

            // ,
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // }

            // ,
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // }

            // ,
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // }


            // ,
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // }





            // ,
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}

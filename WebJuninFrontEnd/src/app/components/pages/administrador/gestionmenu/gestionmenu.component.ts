import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';

interface expandedRows {
  [key: string]: boolean;
}

//para ejemplo -------------------------------------
interface InventoryStatus {
  label: string;
  value: string;
}

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  category?: string;
  image?: string;
  rating?: number;
}
//--------------------------------------------------

@Component({
  selector: 'app-gestionmenu',
  standalone: true,
  imports: [
    ButtonModule, 
    ToastModule,
    TableModule,
    CommonModule,
    RatingModule,
    FormsModule
  ],
  templateUrl: './gestionmenu.component.html',
  styleUrl: './gestionmenu.component.css',
  providers: [MessageService, ConfirmationService]
})

export class GestionmenuComponent {

  products: Product[] = [];
  expandedRows: expandedRows = {};
  isExpanded: boolean = false;
  loading: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private http: HttpClient) {
    this.getProductsWithOrdersSmall().then(data => this.products = data);
    this.subir_menu();
  }


  //funcion para consultar en base de datos todos los menus
  subir_menu(){

    try {
      
      this.loading = true;
      this.http.get('http://192.168.10.58:1234/api/menu') 
      .subscribe((response: any) => { 
          this.loading = false;
          console.log(response);
      }, 
      error => {
        console.error(error.error.message);
      });

    } catch (error) {
      
    }

  }

  getProductsWithOrdersSmall() {
    return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
  }

  expandAll() {
      if (!this.isExpanded) {
          this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');
      } else {
          this.expandedRows = {};
      }
      this.isExpanded = !this.isExpanded;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}

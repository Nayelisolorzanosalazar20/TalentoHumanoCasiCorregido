import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UnidadCargo } from '../../../interface/unidadcargo.interface';


@Injectable({
  providedIn: 'root'
})
export class UnidadCargoService {

  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Si tu backend responde { unidad_cargo: UnidadCargo[] }
  getUnidadesCargo(): Observable<{ unidad_cargo: UnidadCargo[] }> {
    return this.http.get<{ unidad_cargo: UnidadCargo[] }>(`${this.Url}/unidad_cargos`).pipe(
      catchError(this.handleError)
    );
  }
   
  

  getUnidadCargoById(id: number): Observable<UnidadCargo> {
    return this.http.get<UnidadCargo>(`${this.Url}/unidad_cargos/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveUnidadCargo(unidad_cargo: UnidadCargo): Observable<UnidadCargo> {
    return this.http.post<UnidadCargo>(`${this.Url}/unidad_cargos`, unidad_cargo).pipe(
      catchError(this.handleError)
    );
  }

  updateUnidadCargo(id: number, unidad_cargo: UnidadCargo): Observable<UnidadCargo> {
    return this.http.patch<UnidadCargo>(`${this.Url}/unidad_cargos/${id}`, unidad_cargo).pipe(
      catchError(this.handleError)
    );
  }

  deleteUnidadCargo(id: number): Observable<UnidadCargo> {
    return this.http.delete<UnidadCargo>(`${this.Url}/unidad_cargos/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
export class PeriodoService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/periodo`).pipe(
      catchError(error => {
        console.error('Error al obtener periodo:', error);
        return throwError(() => new Error('No se pudo obtener periodo'));
      })
    );
  }
}
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TipoCuenta } from '../../../interface/tipocuenta.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getTiposCuenta(): Observable<TipoCuenta[]> {
    return this.http.get<TipoCuenta[]>(`${this.Url}/tipo_cuenta`).pipe(
      catchError(this.handleError)
    );
  }

  getTipoCuentaById(id: number): Observable<TipoCuenta> {
    return this.http.get<TipoCuenta>(`${this.Url}/tipo_cuenta/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveTipoCuenta(tipoCuenta: TipoCuenta): Observable<TipoCuenta> {
    return this.http.post<TipoCuenta>(`${this.Url}/tipo_cuenta`, tipoCuenta).pipe(
      catchError(this.handleError)
    );
  }

  updateTipoCuenta(id: number, tipoCuenta: TipoCuenta): Observable<TipoCuenta> {
    return this.http.patch<TipoCuenta>(`${this.Url}/tipo_cuenta/${id}`, tipoCuenta).pipe(
      catchError(this.handleError)
    );
  }

  deleteTipoCuenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/tipo_cuenta/${id}`).pipe(
      catchError(this.handleError)
    );
  }

}
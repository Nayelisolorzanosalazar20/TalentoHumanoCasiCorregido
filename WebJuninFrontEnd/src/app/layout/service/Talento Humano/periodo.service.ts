import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Periodo } from '../../../interface/perido.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Si tu backend responde { periodos: Periodo[] }
  getPeriodos(): Observable<{ periodos: Periodo[] }> {
    return this.http.get<{ periodos: Periodo[] }>('http://localhost:5000/api/periodo');
  }
  

  getPeriodoById(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.Url}/periodo/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  savePeriodo(periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(`${this.Url}/periodo`, periodo).pipe(
      catchError(this.handleError)
    );
  }

  updatePeriodo(id: number, periodo: Periodo): Observable<Periodo> {
    return this.http.patch<Periodo>(`${this.Url}/periodo/${id}`, periodo).pipe(
      catchError(this.handleError)
    );
  }

  deletePeriodo(id: number): Observable<Periodo> {
    return this.http.delete<Periodo>(`${this.Url}/periodo/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Unidad } from '../../../interface/unidad.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Si tu backend responde { unidades: Unidad[] }
  getUnidades(): Observable<{ unidades: Unidad[] }> {
    return this.http.get<{ unidades: Unidad[] }>('http://localhost:5000/api/unidad');
  }

  getUnidadById(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.Url}/unidad/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(`${this.Url}/unidad`, unidad).pipe(
      catchError(this.handleError)
    );
  }

  updateUnidad(id: number, unidad: Unidad): Observable<Unidad> {
    return this.http.patch<Unidad>(`${this.Url}/unidad/${id}`, unidad).pipe(
      catchError(this.handleError)
    );
  }

  deleteUnidad(id: number): Observable<Unidad> {
    return this.http.delete<Unidad>(`${this.Url}/unidad/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
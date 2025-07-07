import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Discapacidad } from '../../../interface/discapacidad.interface';
import {  map } from 'rxjs';
// ...existing code...
@Injectable({
  providedIn: 'root'
})
export class DiscapacidadService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getDiscapacidades(): Observable<Discapacidad[]> {
  return this.http.get<{ discapacidades: Discapacidad[] }>(`${this.Url}/discapacidad`).pipe(
    map(resp => resp.discapacidades)
  );
}

  getDiscapacidadById(id: number): Observable<Discapacidad> {
    return this.http.get<Discapacidad>(`${this.Url}/discapacidad/${id}`).pipe(
      catchError(this.handleError)
    );
  }

 getDiscapacidadesByFuncionario(funcionario_id: number): Observable<Discapacidad[]> {
  return this.http.get<Discapacidad[]>(`${this.Url}/discapacidad/funcionario/${funcionario_id}`);
}

  saveDiscapacidad(discapacidad: Discapacidad): Observable<Discapacidad> {
    return this.http.post<Discapacidad>(`${this.Url}/discapacidad`, discapacidad).pipe(
      catchError(this.handleError)
    );
  }

  updateDiscapacidad(id: number, discapacidad: Discapacidad): Observable<Discapacidad> {
    return this.http.patch<Discapacidad>(`${this.Url}/discapacidad/${id}`, discapacidad).pipe(
      catchError(this.handleError)
    );
  }

  deleteDiscapacidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/discapacidad/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
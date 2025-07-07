import { Injectable } from '@angular/core';
import { GradoDiscapacidad } from '../../../interface/gradodiscapacidad.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class GradoDiscapacidadService {

    private Url: string = environment.baseUrl;
    constructor(private http:HttpClient){}

    private handleError(error: any): Observable<never> {
      console.error('Error occurred:', error);
      return throwError(() => new Error('Something went wrong; please try again later.'));
  }


    getGrado(): Observable<GradoDiscapacidad[]> {
      return this.http.get<{ grado: GradoDiscapacidad[] }>(`${this.Url}/grado_discapacidad`).pipe(
        map((data: { grado: GradoDiscapacidad[] }) => data.grado),
        catchError(this.handleError)
      );
    }

    getGradoById(id: number): Observable<GradoDiscapacidad> {
      return this.http.get<{ grado: GradoDiscapacidad }>(`${this.Url}/grado_discapacidad/${id}`).pipe(
        map(response => response.grado),
        catchError(this.handleError)
      );
    }
    

    saveGrado(grado: GradoDiscapacidad): Observable<GradoDiscapacidad> {
      return this.http.post<{ grado: GradoDiscapacidad }>(`${this.Url}/grado_discapacidad`, grado).pipe(
        map(data => data.grado),
        catchError(this.handleError)
      );
    }
    updateGrado(id: number, grado: GradoDiscapacidad): Observable<GradoDiscapacidad> {
      return this.http.patch<GradoDiscapacidad>(`${this.Url}/grado_discapacidad/${id}`, grado);
    }



    deleteGrado(id: number): Observable<string> {
      return this.http.delete<{ message: string }>(`${this.Url}/grado_discapacidad/${id}`).pipe(
        map(response => response.message),
        catchError(this.handleError)
      );
    }





}

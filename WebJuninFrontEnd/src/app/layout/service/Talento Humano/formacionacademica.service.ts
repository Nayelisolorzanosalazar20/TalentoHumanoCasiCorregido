import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Formacion } from '../../../interface/formacion.interface';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
      
    getFormacion(): Observable<Formacion[]> {
      return this.http.get<Formacion[]>(`${this.Url}/formacionacademica`).pipe(
        catchError(this.handleError)
      );
    
      }

      getFormacionById(id: number): Observable<Formacion> {
        return this.http.get<Formacion>(`${this.Url}/formacionacademica/${id}`).pipe(
          catchError(this.handleError)
        );
      }
      


      saveFormacion(formacion: Formacion): Observable<Formacion> {
        // Esto funciona si el backend devuelve directamente el contacto creado
            return this.http.post<Formacion>(`${this.Url}/formacionacademica`, formacion).pipe(
              catchError(this.handleError)
);

      }
      updateFormacion(id: number, formacion: Formacion): Observable<Formacion> {
        return this.http.patch<Formacion>(`${this.Url}/formacionacademica/${id}`, formacion).pipe(
          catchError(this.handleError)
        );
      }


      deleteFormacion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.Url}/formacionacademica/${id}`).pipe(
          catchError(this.handleError)
        );
      }

}

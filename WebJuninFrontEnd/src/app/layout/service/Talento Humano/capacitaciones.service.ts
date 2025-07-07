import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Capacitaciones } from '../../../interface/capacitaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionesService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
      
    getCapacitaciones(): Observable<Capacitaciones[]> {
      return this.http.get<Capacitaciones[]>(`${this.Url}/capacitaciones`).pipe(
        catchError(this.handleError)
      );
    
      }

     getCapacitacionesById(funcionarioId: number) {
  return this.http.get<Capacitaciones[]>(`${this.Url}/capacitaciones/funcionario/${funcionarioId}`);
}
      


      saveCapacitaciones(capacitaciones: Capacitaciones): Observable<Capacitaciones> {
        // Esto funciona si el backend devuelve directamente el contacto creado
            return this.http.post<Capacitaciones>(`${this.Url}/capacitaciones`, capacitaciones).pipe(
              catchError(this.handleError)
);

      }
      updateCapacitaciones(id: number, capacitaciones: Capacitaciones): Observable<Capacitaciones> {
        return this.http.patch<Capacitaciones>(`${this.Url}/capacitaciones/${id}`, capacitaciones).pipe(
          catchError(this.handleError)
        );
      }


      deleteCapacitaciones(id: number): Observable<void> {
        return this.http.delete<void>(`${this.Url}/capacitaciones/${id}`).pipe(
          catchError(this.handleError)
        );
      }
// Ejemplo de método en tu servicio
subirCapacitacion(formData: FormData) {
  return this.http.post('http://localhost:5000/api/capacitaciones', formData);
}
}

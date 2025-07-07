import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Trayectoria } from '../../../interface/trayectoria.interface';

@Injectable({
  providedIn: 'root'
})
export class TrayectoriaService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
      
    getTrayectoria(): Observable<Trayectoria[]> {
      return this.http.get<Trayectoria[]>(`${this.Url}/trayectoria`).pipe(
        catchError(this.handleError)
      );
    
      }

      getTrayectoriaById(id: number): Observable<Trayectoria> {
        return this.http.get<Trayectoria>(`${this.Url}/trayectoria/${id}`).pipe(
          catchError(this.handleError)
        );
      }
      


      saveTrayectoria(trayectoria: Trayectoria): Observable<Trayectoria> {
        //Esto funciona si el backend devuelve directamente el contacto creado
            return this.http.post<Trayectoria>(`${this.Url}/trayectoria`, trayectoria).pipe(
              catchError(this.handleError)
);

      }
      updateTrayectoria(id: number, trayectoria: Trayectoria): Observable<Trayectoria> {
        return this.http.patch<Trayectoria>(`${this.Url}/trayectoria/${id}`, trayectoria).pipe(
          catchError(this.handleError)
        );
      }

      deleteTrayectoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.Url}/trayectoria/${id}`).pipe(
          catchError(this.handleError)
        );
      }

}

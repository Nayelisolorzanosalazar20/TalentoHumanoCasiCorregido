import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Contactos } from '../../../interface/contactos.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
      
    getContactos(): Observable<Contactos[]> {
      return this.http.get<Contactos[]>(`${this.Url}/contactos`).pipe(
        catchError(this.handleError)
      );
    
      }

      getContactosById(id: number): Observable<Contactos> {
        return this.http.get<Contactos>(`${this.Url}/contactos/${id}`).pipe(
          catchError(this.handleError)
        );
      }
      


      saveContactos(contactos: Contactos): Observable<Contactos> {
        //  Esto funciona si el backend devuelve directamente el contacto creado
            return this.http.post<Contactos>(`${this.Url}/contactos`, contactos).pipe(
              catchError(this.handleError)
);

      }
      updateContactos(id: number, contactos: Contactos): Observable<Contactos> {
        return this.http.patch<Contactos>(`${this.Url}/contactos/${id}`, contactos).pipe(
          catchError(this.handleError)
        );
      }


      deleteContactos(id: number): Observable<void> {
        return this.http.delete<void>(`${this.Url}/contactos/${id}`).pipe(
          catchError(this.handleError)
        );
      }

}

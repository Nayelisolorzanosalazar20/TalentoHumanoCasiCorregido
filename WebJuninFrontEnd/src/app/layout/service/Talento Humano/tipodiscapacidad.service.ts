import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Tipodiscapacidad } from '../../../interface/tipodiscapacidad.interface';

@Injectable({
  providedIn: 'root'
})
export class TipodiscapacidadService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getTipodiscapacidad(): Observable<Tipodiscapacidad[]> {
      return this.http.get<{tcapacidad: Tipodiscapacidad[]}>(`${this.Url}/tipo_discapacidad`).pipe(
      map((data: { tcapacidad: Tipodiscapacidad[] }) => data.tcapacidad),
      catchError(this.handleError)
      );
    }

      getTipodiscapacidadById(id: number): Observable<Tipodiscapacidad> {
        return this.http.get<{ tcapacidad: Tipodiscapacidad }>(`${this.Url}/tipo_discapacidad/${id}`).pipe(
          map(response => response.tcapacidad),
          catchError(this.handleError)
        );
      }


      saveTipodiscapacidad(tcapacidad: Tipodiscapacidad): Observable<Tipodiscapacidad> {
        return this.http.post<{ tcapacidad: Tipodiscapacidad }>(`${this.Url}/tipo_discapacidad`, tcapacidad).pipe(
          map(data => data.tcapacidad),
          catchError(this.handleError)
        );
      }
      updateTipodiscapacidad(id: number, tcapacidad: Tipodiscapacidad): Observable<Tipodiscapacidad> {
        return this.http.patch<Tipodiscapacidad>(`${this.Url}/tipo_discapacidad/${id}`, tcapacidad);
      }



      deleteTipodiscapacidad(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/tipo_discapacidad/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

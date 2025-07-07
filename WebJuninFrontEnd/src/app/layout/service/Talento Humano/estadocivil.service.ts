import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { EstadoCivil } from '../../../interface/estadocivil.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getEstadocivil(): Observable<EstadoCivil[]> {
        return this.http.get<{ ecivil: EstadoCivil[] }>(`${this.Url}/estado_civil`).pipe(
          map((data: { ecivil: EstadoCivil[] }) => data.ecivil),
          catchError(this.handleError)
        );
      }

      getEstadocivilById(id: number): Observable<EstadoCivil> {
        return this.http.get<{ ecivil: EstadoCivil }>(`${this.Url}/estado_civil/${id}`).pipe(
          map(response => response.ecivil),
          catchError(this.handleError)
        );
      }


      saveEstadocivil(ecivil: EstadoCivil): Observable<EstadoCivil> {
        return this.http.post<{ ecivil: EstadoCivil }>(`${this.Url}/estado_civil`, ecivil).pipe(
          map(data => data.ecivil),
          catchError(this.handleError)
        );
      }
      updateEstadocivil(id: number, ecivil: EstadoCivil): Observable<EstadoCivil> {
        return this.http.patch<EstadoCivil>(`${this.Url}/estado_civil/${id}`, ecivil);
      }



      deleteEstadocivil(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/estado_civil/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

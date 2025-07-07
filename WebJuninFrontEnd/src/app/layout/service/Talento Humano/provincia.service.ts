import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Provincia } from '../../../interface/provincia.interface.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getProvincia(): Observable<Provincia[]> {
        return this.http.get<{ provincia: Provincia[] }>(`${this.Url}/provincia`).pipe(
          map((data: { provincia: Provincia[] }) => data.provincia),
          catchError(this.handleError)
        );
      }

      getProvinciaById(id: number): Observable<Provincia> {
        return this.http.get<{ provincia: Provincia }>(`${this.Url}/provincia/${id}`).pipe(
          map(response => response.provincia),
          catchError(this.handleError)
        );
      }


      saveProvincia(provincia: Provincia): Observable<Provincia> {
        return this.http.post<{ provincia: Provincia }>(`${this.Url}/provincia`, provincia).pipe(
          map(data => data.provincia),
          catchError(this.handleError)
        );
      }
      updateProvincia(id: number, provincia: Provincia): Observable<Provincia> {
        return this.http.patch<Provincia>(`${this.Url}/provincia/${id}`, provincia);
      }



      deleteProvincia(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/provincia/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

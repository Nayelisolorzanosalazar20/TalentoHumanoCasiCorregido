import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CargaFamiliar } from '../../../interface/cargafamiliar.interface';

@Injectable({
  providedIn: 'root'
})
export class CargaFamiliarService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


     getCargaFamiliar(): Observable<CargaFamiliar[]> {
     return this.http.get<CargaFamiliar[]>(`${this.Url}/cargafamiliar`).pipe(
    catchError(this.handleError)
     );
    }

      getCargaFamiliarById(id: number): Observable<CargaFamiliar> {
        return this.http.get<{ cargaFamiliar: CargaFamiliar }>(`${this.Url}/cargafamiliar/${id}`).pipe(
          map(response => response.cargaFamiliar),
          catchError(this.handleError)
        );
      }


      saveCargaFamiliar(cargaFamiliar: CargaFamiliar): Observable<CargaFamiliar> {
        return this.http.post<{ cargaFamiliar: CargaFamiliar }>(`${this.Url}/cargafamiliar`, cargaFamiliar).pipe(
          map(data => data.cargaFamiliar),
          catchError(this.handleError)
        );
        
      }
      
      updateCargaFamiliar(id: number, cargaFamiliar: CargaFamiliar): Observable<CargaFamiliar> {
        return this.http.patch<CargaFamiliar>(`${this.Url}/cargafamiliar/${id}`, cargaFamiliar);
      }



      deleteCargaFamiliar(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/cargafamiliar/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

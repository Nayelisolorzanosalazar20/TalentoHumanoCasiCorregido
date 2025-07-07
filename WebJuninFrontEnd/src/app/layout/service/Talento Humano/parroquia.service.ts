import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Parroquia } from '../../../interface/parroquia.interface.interface';

@Injectable({
  providedIn: 'root'
})
export class ParroquiaService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getParroquia(): Observable<Parroquia[]> {
        return this.http.get<{ parroquia: Parroquia[] }>(`${this.Url}/parroquia`).pipe(
          map((data: { parroquia: Parroquia[] }) => data.parroquia),
          catchError(this.handleError)
        );
      }
// parroquia.service.ts
getParroquiasByCanton(cantonId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.Url}/parroquia/canton/${cantonId}`);
}
      getParroquiaById(id: number): Observable<Parroquia> {
        return this.http.get<{ parroquia: Parroquia }>(`${this.Url}/parroquia/${id}`).pipe(
          map(response => response.parroquia),
          catchError(this.handleError)
        );
      }


      saveParroquia(parroquia: Parroquia): Observable<Parroquia> {
        return this.http.post<{ parroquia: Parroquia }>(`${this.Url}/parroquia`, parroquia).pipe(
          map(data => data.parroquia),
          catchError(this.handleError)
        );
      }
      updateParroquia(id: number, parroquia: Parroquia): Observable<Parroquia> {
        return this.http.patch<Parroquia>(`${this.Url}/parroquia/${id}`, parroquia);
      }



      deleteParroquia(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/parroquia/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

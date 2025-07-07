import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Canton } from '../../../interface/canton.interface';

@Injectable({
  providedIn: 'root'
})
export class CantonService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getCanton(): Observable<Canton[]> {
        return this.http.get<{ canton: Canton[] }>(`${this.Url}/canton`).pipe(
          map((data: { canton: Canton[] }) => data.canton),
          catchError(this.handleError)
        );
      }

      getCantonById(id: number): Observable<Canton> {
        return this.http.get<{ canton: Canton }>(`${this.Url}/canton/${id}`).pipe(
          map(response => response.canton),
          catchError(this.handleError)
        );
      }


      saveCanton(canton: Canton): Observable<Canton> {
        return this.http.post<{ canton: Canton }>(`${this.Url}/canton`, canton).pipe(
          map(data => data.canton),
          catchError(this.handleError)
        );
      }
      updateCanton(id: number, canton: Canton): Observable<Canton> {
        return this.http.patch<Canton>(`${this.Url}/canton/${id}`, canton);
      }



      deleteCanton(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/canton/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

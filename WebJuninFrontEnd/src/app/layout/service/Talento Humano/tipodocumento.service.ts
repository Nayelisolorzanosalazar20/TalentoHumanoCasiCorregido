import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Tipodocumento } from '../../../interface/tipodocumuento.interface';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getTipodocumento(): Observable<Tipodocumento[]> {
      return this.http.get<{tipodocumento: Tipodocumento[]}>(`${this.Url}/tipodocumento`).pipe(
      map((data: { tipodocumento: Tipodocumento[] }) => data.tipodocumento),
      catchError(this.handleError)
      );
    }

      getTipodocumentoById(id: number): Observable<Tipodocumento> {
        return this.http.get<{ tipodocumento: Tipodocumento }>(`${this.Url}/tipodocumento/${id}`).pipe(
          map(response => response.tipodocumento),
          catchError(this.handleError)
        );
      }


      saveTipodocumento(tipodocumento: Tipodocumento): Observable<Tipodocumento> {
        return this.http.post<{ tipodocumento: Tipodocumento }>(`${this.Url}/tipodocumento`, tipodocumento).pipe(
          map(data => data.tipodocumento),
          catchError(this.handleError)
        );
      }
      updateTipodocumento(id: number, tipodocumento: Tipodocumento): Observable<Tipodocumento> {
        return this.http.patch<Tipodocumento>(`${this.Url}/tipodocumento/${id}`, tipodocumento);
      }



      deleteTipodocumento(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/tipodocumento/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }

}

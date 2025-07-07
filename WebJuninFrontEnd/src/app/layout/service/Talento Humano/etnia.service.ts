import { Injectable } from '@angular/core';
import { Etnia } from '../../../interface/etnia.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class EtniaService {

    private Url: string = environment.baseUrl;
    constructor(private http:HttpClient){}

    private handleError(error: any): Observable<never> {
      console.error('Error occurred:', error);
      return throwError(() => new Error('Something went wrong; please try again later.'));
  }


    getEtnia(): Observable<Etnia[]> {
      return this.http.get<{ etnias: Etnia[] }>(`${this.Url}/etnia`).pipe(
        map((data: { etnias: Etnia[] }) => data.etnias),
        catchError(this.handleError)
      );
    }

    getEtniaById(id: number): Observable<Etnia> {
      return this.http.get<{ etnia: Etnia }>(`${this.Url}/etnia/${id}`).pipe(
        map(response => response.etnia),
        catchError(this.handleError)
      );
    }
    

    saveEtnia(etnia: Etnia): Observable<Etnia> {
      return this.http.post<{ etnia: Etnia }>(`${this.Url}/etnia`, etnia).pipe(
        map(data => data.etnia),
        catchError(this.handleError)
      );
    }
    updateEtnia(id: number, etnia: Etnia): Observable<Etnia> {
      return this.http.patch<Etnia>(`${this.Url}/etnia/${id}`, etnia);
    }



    deleteEtnia(id: number): Observable<string> {
      return this.http.delete<{ message: string }>(`${this.Url}/etnia/${id}`).pipe(
        map(response => response.message),
        catchError(this.handleError)
      );
    }





}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import {  InstitucionFinanciera } from '../../../interface/institucionfinanciera.interface';
@Injectable({
  providedIn: 'root'
})
export class InstitucionFinancieraService {

  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

getInstitucionFinanciera(): Observable<InstitucionFinanciera[]> {
  return this.http.get<InstitucionFinanciera[]>(`${this.Url}/institucionfinanciera`).pipe(
    catchError(this.handleError)
  );
}

getInstitucionFinancieraById(id: number): Observable<InstitucionFinanciera> {
  return this.http.get<InstitucionFinanciera>(`${this.Url}/institucionfinanciera/${id}`).pipe(
    catchError(this.handleError)
  );
}

saveInstitucionFinanciera(info: InstitucionFinanciera): Observable<InstitucionFinanciera> {
  return this.http.post<InstitucionFinanciera>(`${this.Url}/institucionfinanciera`, info).pipe(
    catchError(this.handleError)
  );
}

updateInstitucionFinanciera(id: number, info: InstitucionFinanciera): Observable<InstitucionFinanciera> {
  return this.http.patch<InstitucionFinanciera>(`${this.Url}/institucionfinanciera/${id}`, info).pipe(
    catchError(this.handleError)
  );
}

  deleteInstitucionFinanciera(id: number): Observable<string> {
    return this.http.delete<{ message: string }>(`${this.Url}/institucionfinaciera/${id}`).pipe(
      map(response => response.message),
      catchError(this.handleError)
    );
  }
}
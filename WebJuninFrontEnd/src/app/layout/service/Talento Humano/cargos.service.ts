import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Cargo } from '../../../interface/cargos.interface';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Si tu backend responde { cargos: Cargo[] }
  getCargos(): Observable<{ cargos: Cargo[] }> {
    return this.http.get<{ cargos: Cargo[] }>(`${this.Url}/cargos`).pipe(
      catchError(this.handleError)
    );
  }

  getCargoById(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.Url}/cargos/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.Url}/cargos`, cargo).pipe(
      catchError(this.handleError)
    );
  }

  updateCargo(id: number, cargo: Cargo): Observable<Cargo> {
    return this.http.patch<Cargo>(`${this.Url}/cargos/${id}`, cargo).pipe(
      catchError(this.handleError)
    );
  }

  deleteCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/cargos/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
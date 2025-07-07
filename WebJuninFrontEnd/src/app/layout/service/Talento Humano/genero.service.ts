import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Genero } from '../../../interface/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }


      getGenero(): Observable<Genero[]> {
        return this.http.get<{ generos: Genero[] }>(`${this.Url}/genero`).pipe(
          map((data: { generos: Genero[] }) => data.generos),
          catchError(this.handleError)
        );
      }

      getGeneroById(id: number): Observable<Genero> {
        return this.http.get<{ generos: Genero }>(`${this.Url}/genero/${id}`).pipe(
          map(response => response.generos),
          catchError(this.handleError)
        );
      }


      saveGenero(generos: Genero): Observable<Genero> {
        return this.http.post<{ generos: Genero }>(`${this.Url}/genero`, generos).pipe(
          map(data => data.generos),
          catchError(this.handleError)
        );
      }
      updateGenero(id: number, generos: Genero): Observable<Genero> {
        return this.http.patch<Genero>(`${this.Url}/genero/${id}`, generos);
      }



      deleteGenero(id: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.Url}/genero/${id}`).pipe(
          map(response => response.message),
          catchError(this.handleError)
        );
      }


}

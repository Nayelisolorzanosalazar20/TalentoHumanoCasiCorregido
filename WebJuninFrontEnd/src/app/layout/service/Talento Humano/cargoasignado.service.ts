import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CargoAsignado } from '../../../interface/cargoasignado.interface';

@Injectable({
  providedIn: 'root'
})
export class CargoAsignadoService {

  private Url: string = environment.baseUrl;
      constructor(private http:HttpClient){}

      private handleError(error: any): Observable<never> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
      
   getCargosAsignados(): Observable<{ cargo_asignado: CargoAsignado[] }> {
  return this.http.get<{ cargo_asignado: CargoAsignado[] }>('http://localhost:5000/api/cargo_asignado');
}

     getCargosAsignadosById(funcionarioId: number) {
  return this.http.get<CargoAsignado[]>(`${this.Url}/cargo_asignado/funcionario/${funcionarioId}`);
}
      


      saveCargoAsignado(CargoAsignado: CargoAsignado): Observable<CargoAsignado> {
        // Esto funciona si el backend devuelve directamente el contacto creado
            return this.http.post<CargoAsignado>(`${this.Url}/cargo_asignado`, CargoAsignado).pipe(
              catchError(this.handleError)
);

      }
      updateCargoAsignado(id: number, CargoAsignado: CargoAsignado): Observable<CargoAsignado> {
        return this.http.patch<CargoAsignado>(`${this.Url}/cargo_asignado/${id}`, CargoAsignado).pipe(
          catchError(this.handleError)
        );
      }


      deleteCargoAsignado(id: number): Observable<void> {
        return this.http.delete<void>(`${this.Url}/cargo_asignado/${id}`).pipe(
          catchError(this.handleError)
        );
      }

}

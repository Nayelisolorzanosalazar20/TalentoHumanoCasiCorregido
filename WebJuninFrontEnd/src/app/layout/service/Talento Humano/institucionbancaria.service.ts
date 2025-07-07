import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InstitucionBancaria } from '../../../interface/institucionbancaria.interface';
import { Funcionario } from '../../../interface/funcionario.interface';

@Injectable({
  providedIn: 'root'
})
export class InstitucionBancariaService {

  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
getInstitucionBancaria(): Observable<InstitucionBancaria[]> {
  return this.http.get<InstitucionBancaria[]>(`${this.Url}/informacionfinanciera`).pipe(
    catchError(this.handleError)
  );
}
getFuncionario(): Observable<Funcionario[]> {
  return this.http.get<{ funcionarios: Funcionario[] }>(`${this.Url}/funcionarios`).pipe(
    map(resp => resp.funcionarios), // <-- minúscula y plural
    catchError(this.handleError)
  );
}
getInstitucionBancariaById(id: number): Observable<InstitucionBancaria> {
  return this.http.get<InstitucionBancaria>(`${this.Url}/informacionfinanciera/${id}`).pipe(
    catchError(this.handleError)
  );
}
saveInstitucionBancaria(info: InstitucionBancaria): Observable<InstitucionBancaria> {
  return this.http.post<InstitucionBancaria>(`${this.Url}/informacionfinanciera`, info).pipe(
    catchError(this.handleError)
  );
}
updateInstitucionBancaria(id: number, info: InstitucionBancaria): Observable<InstitucionBancaria> {
  return this.http.patch<InstitucionBancaria>(`${this.Url}/informacionfinanciera/${id}`, info).pipe(
    catchError(this.handleError)
  );
}
deleteInstitucionBancaria(id: number): Observable<string> {
  return this.http.delete<{ message: string }>(`${this.Url}/informacionfinanciera/${id}`).pipe(
    map(response => response.message),
    catchError(this.handleError)
  );
}
}
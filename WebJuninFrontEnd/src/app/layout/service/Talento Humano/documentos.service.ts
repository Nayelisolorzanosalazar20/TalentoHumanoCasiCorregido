import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Documentos } from '../../../interface/documentos.interface';
import { Funcionario } from '../../../interface/funcionario.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  // private Url: string = environment.baseUrl;
  private Url = 'http://localhost:5000/api/documentos'; // Ajusta si tu ruta es diferente

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  subirDocumento(formData: FormData): Observable<any> {
    return this.http.post<any>(this.Url, formData);
  }

  getDocumentos(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(this.Url).pipe(
      catchError(this.handleError)
    );
  }

  getDocumentosById(id: number): Observable<Documentos> {
    return this.http.get<Documentos>(`${this.Url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getFuncionario(): Observable<Funcionario[]> {
    return this.http.get<{ funcionarios: Funcionario[] }>(`${this.Url.replace('/documentos', '/funcionarios')}`).pipe(
      map((data: { funcionarios: Funcionario[] }) => {
        console.log('Respuesta del backend:', data);
        return data.funcionarios;
      }),
      catchError(this.handleError)
    );
  }

  saveDocumentos(documento: FormData) {
    return this.http.post<Documentos>(this.Url, documento);
  }

  updateDocumentos(id: number, documentos: FormData) {
    return this.http.patch<Documentos>(`${this.Url}/${id}`, documentos);
  }
  actualizarDocumento(id: number, formData: FormData): Observable<Documentos> {
  return this.http.patch<Documentos>(`${this.Url}/${id}`, formData);
}

  deleteDocumentos(id: number): Observable<string> {
    return this.http.delete<{ message: string }>(`${this.Url}/${id}`).pipe(
      map(response => response.message),
      catchError(this.handleError)
    );
  }
}
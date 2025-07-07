import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Funcionario } from '../../../interface/funcionario.interface';
import { Contactos } from '../../../interface/contactos.interface';
import { Documentos } from '../../../interface/documentos.interface';
import { Trayectoria } from '../../../interface/trayectoria.interface';
import { InstitucionBancaria } from '../../../interface/institucionbancaria.interface';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

getFuncionarios(): Observable<Funcionario[]> {
  return this.http.get<{ funcionarios: Funcionario[] }>(`${this.Url}/funcionarios`).pipe(
    map(response => response.funcionarios), // <-- extrae el array
    catchError(this.handleError)
  );
}

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<{ funcionario: Funcionario }>(`${this.Url}/funcionarios/${id}`).pipe(
      map(response => response.funcionario),
      catchError(this.handleError)
    );
  }
getContratosByFuncionario(funcionarioId: number) {
  return this.http.get<any[]>(`${this.Url}/contratos?funcionario_id=${funcionarioId}`);
}
  saveFuncionario(funcionario: FormData): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.Url}/funcionarios`, funcionario).pipe(
      catchError(this.handleError)
    );
  }
getParroquiasByCanton(cantonId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.Url}/parroquia/canton/${cantonId}`);
}
updateFuncionario(id: number, funcionario: FormData): Observable<any> {
  return this.http.patch<any>(`${this.Url}/funcionarios/${id}`, funcionario).pipe(
    catchError(this.handleError)
  );
}
getDiscapacidadByFuncionario(funcionarioId: number) {
  return this.http.get<any[]>(`${this.Url}/discapacidad/funcionario/${funcionarioId}`);
}

  deleteFuncionario(id: number): Observable<string> {
    return this.http.delete<{ message: string }>(`${this.Url}/funcionarios/${id}`).pipe(
      map(response => response.message),
      catchError(this.handleError)
    );
  }
}
export class EtniaService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getEtnia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/etnia`).pipe(
      catchError(error => {
        console.error('Error al obtener etnias:', error);
        return throwError(() => new Error('No se pudo obtener etnias'));
      })
    );
  }
}
export class ParroquiaService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getParroquia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/parroquia`).pipe(
      catchError(error => {
        console.error('Error al obtener parroquias:', error);
        return throwError(() => new Error('No se pudo obtener parroquias'));
      })
    );
  }
}
export class CantonService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCanton(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/canton`).pipe(
      catchError(error => {
        console.error('Error al obtener cantones:', error);
        return throwError(() => new Error('No se pudo obtener cantones'));
      })
    );
  }
}
export class ContactosService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contactos[]> {
    return this.http.get<Contactos[]>(`${this.Url}/contactos`).pipe(
      catchError(error => {
        console.error('Error al obtener contactos:', error);
        return throwError(() => new Error('No se pudo obtener contactos'));
      })
    );
  }
}

export class CargaFamiliarService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contactos[]> {
    return this.http.get<Contactos[]>(`${this.Url}/cargafamiliar`).pipe(
      catchError(error => {
        console.error('Error al obtener contactos:', error);
        return throwError(() => new Error('No se pudo obtener contactos'));
      })
    );
  }
}
export class ProvinciaService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getProvincia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/provincia`).pipe(
      catchError(error => {
        console.error('Error al obtener provincias:', error);
        return throwError(() => new Error('No se pudo obtener provincias'));
      })
    );
  }
}

export class DocumentoService {
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  

  getDocumento(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.Url}/documentos`).pipe(
      catchError(error => {
        console.error('Error al obtener  documento:', error);
        return throwError(() => new Error('No se pudo obtener los documento'));
      })
    );
  }
}

export class TrayectoriaService {
  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener todas las trayectorias laborales
  getTrayectorias(): Observable<Trayectoria[]> {
    return this.http.get<Trayectoria[]>(`${this.Url}/trayectorias`).pipe(
      catchError(error => {
        console.error('Error al obtener trayectorias:', error);
        return throwError(() => new Error('No se pudo obtener trayectorias'));
      })
    );
  }
}
export class InformacionBancariaService {
  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener toda la información bancaria
  getInformacionBancaria(): Observable<InstitucionBancaria[]> {
    return this.http.get<InstitucionBancaria[]>(`${this.Url}/informacionfinanciera`).pipe(
      catchError(error => {
        console.error('Error al obtener información bancaria:', error);
        return throwError(() => new Error('No se pudo obtener información bancaria'));
      })
    );
  }
}
export class FormacionAcademicaService {
  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener toda la formación académica
  getFormacionAcademica(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/formacionacademica`).pipe(
      catchError(error => {
        console.error('Error al obtener formación académica:', error);
        return throwError(() => new Error('No se pudo obtener formación académica'));
      })
    );
  }
}
  // ...existing imports...
export class DiscapacidadService {
  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener todas las discapacidades
  getDiscapacidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/discapacidad`).pipe(
      catchError(error => {
        console.error('Error al obtener discapacidades:', error);
        return throwError(() => new Error('No se pudo obtener discapacidades'));
      })
    );
  }
}
export class TipoCuentaService {
  private Url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener todas las tipos de cuenta
  getTipoCuenta(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/tipo_cuenta`).pipe(
      catchError(error => {
        console.error('Error al obtener tipos de cuenta:', error);
        return throwError(() => new Error('No se pudo obtener tipos de cuenta'));
      })
    );
  }
}

  export class CapacitacionesService {
    
  private Url: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
   getCapacitaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/capacitaciones`).pipe(
      catchError(error => {
        console.error('Error al obtener capacitaciones:', error);
        return throwError(() => new Error('No se pudo obtener capacitaciones'));
      })
    );
  }
}

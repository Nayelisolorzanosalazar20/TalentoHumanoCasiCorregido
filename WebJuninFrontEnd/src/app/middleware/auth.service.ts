
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLoggedIn(): boolean {
    // Verificar si el token JWT está presente en las cookies
    console.log(document.cookie);
    return document.cookie.includes('jwt_token');
  }

  login(token: string): void {
    // Guardar el token en las cookies
    document.cookie = `jwt_token=${token}; path=/`;
  }

  logout(): void {
    // Eliminar el token de las cookies
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

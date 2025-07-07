import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
  // Mock HttpHandler
  const mockHandler: HttpHandler = {
    handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => of()
  };

  const interceptor: HttpInterceptorFn = (req, _next) =>
    TestBed.runInInjectionContext(() => new AuthInterceptor().intercept(req, mockHandler));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});

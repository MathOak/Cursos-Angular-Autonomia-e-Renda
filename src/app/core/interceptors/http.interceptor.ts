import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.services';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  //Token
  const token = authService.obterToken();
  const novaReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  console.log('Interceptando requisição:', req.url);
  return next(novaReq).pipe(
    tap({
      next: (event) => {
        console.log('RESPONSE:', event);
      },
      error: (error) => {
        console.log('ERROR:', error);
      },
    }),
    catchError((error) => {
      console.log('ERROR GLOBAL:', error);

      if (error.status === 401) {
        console.warn('Não Autorizado');
      }
      if (error.status === 404) {
        console.warn('Conteudo não encontrado!');
      }
      if (error.status === 500) {
        console.warn('Error do servidor!');
      }
      return throwError(() => error);
    }),
  );
};

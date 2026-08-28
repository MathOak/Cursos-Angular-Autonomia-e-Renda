import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { AuthFacade } from '../facades/auth.facade';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authFacade = inject(AuthFacade);
  //Token
  const token = authFacade.obterToken();
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
      // 401 -> ausência de autenticação ou token inválido.
      if (error.status === 401) {
        console.warn('Não autorizado. Faça login novamente.');
        authFacade.sair();
        router.navigateByUrl('/login');
      }
      // 403 -> usuario autenticado, mas sem permissão.
      if (error.status === 403) {
        console.warn('Acesso proibido. Perfil sem permissão.');
        router.navigateByUrl('/produtos');
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

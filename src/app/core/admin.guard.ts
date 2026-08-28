import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from './facades/auth.facade';
export const adminGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  // Primeiro verifica se o usuário está logado.
  // Se não estiver, envia para a tela de login.
  if (!authFacade.estaLogado()) {
    return router.createUrlTree(['/login']);
  }
  // Depois verifica se o usuário possui perfil de administrador.
  // Se estiver logado, mas não for admin, envia para produtos.
  if (!authFacade.ehAdmin()) {
    return router.createUrlTree(['/acesso-negado']);
  }
  // Se estiver logado e for admin, libera o acesso.
  return true;
};

import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.services';
@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // A facade centraliza o acesso da aplicação à autenticação.
  // Componentes, guards e header passam a usar esta camada simplificada.
  private authService = inject(AuthService);
  // Sinais de autenticação expostos para leitura.
  usuarioAtual = this.authService.usuarioAtual;
  estaLogado = this.authService.estaLogado;
  ehAdmin = this.authService.ehAdmin;
  token = this.authService.token;
  // Ação de alto nível para login.
  realizarLogin(email: string, senha: string): boolean {
    return this.authService.login(email, senha);
  }
  // Ação de alto nível para logout.
  sair() {
    this.authService.logout();
  }
  // Método mantido para integrações técnicas, como interceptor HTTP.
  obterToken(): string | null {
    return this.authService.obterToken();
  }
  // Método de leitura do perfil atual.
  obterPerfil() {
    return this.authService.obterPerfil();
  }
}

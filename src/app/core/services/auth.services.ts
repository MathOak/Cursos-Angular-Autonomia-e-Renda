import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
type Usuario = {
  email: string;
  perfil: 'usuario';
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private usuario = signal<Usuario | null>(null);
  private tokenJwt = signal<string | null>(null);
  usuarioAtual = computed(() => this.usuario());
  estaLogado = computed(() => this.usuario() !== null);
  token = computed(() => this.tokenJwt());
  login(email: string, senha: string): boolean {
    if (!email || !senha) {
      return false;
    }
    const tokenSimulado =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJwZXJmaWwiOiJ1c3VhcmlvIn0.' +
      'assinatura-simulada';
    this.usuario.set({
      email,
      perfil: 'usuario',
    });
    this.tokenJwt.set(tokenSimulado);
    return true;
  }
  logout() {
    this.usuario.set(null);
    this.tokenJwt.set(null);
    this.router.navigate(['/login']);
  }
  obterToken(): string | null {
    return this.tokenJwt();
  }
}

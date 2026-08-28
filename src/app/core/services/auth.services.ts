import { Injectable, computed, inject, signal } from '@angular/core';

type Usuario = {
  email: string;
  perfil: PerfilType;
};
type PerfilType = 'usuario' | 'admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario = signal<Usuario | null>(null);
  private tokenJwt = signal<string | null>(null);
  usuarioAtual = computed(() => this.usuario());
  estaLogado = computed(() => this.usuario() !== null);
  token = computed(() => this.tokenJwt());
  ehAdmin = computed(() => this.usuario()?.perfil === 'admin');
  login(email: string, senha: string): boolean {
    if (!email || !senha) {
      return false;
    }
    const perfil: PerfilType =
      email === 'admin@email.com' ? 'admin' : 'usuario';
    const tokenSimulado =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJwZXJmaWwiOiJ1c3VhcmlvIn0.' +
      'assinatura-simulada';
    this.usuario.set({
      email,
      perfil,
    });
    this.tokenJwt.set(tokenSimulado);
    return true;
  }
  logout() {
    this.usuario.set(null);
    this.tokenJwt.set(null);
  }
  obterToken(): string | null {
    return this.tokenJwt();
  }
  obterPerfil(){
    return this.usuario();
  }
}

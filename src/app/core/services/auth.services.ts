import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

type Usuario = {
  email: string;
  perfil: PerfilType;
};
type PerfilType = 'usuario' | 'admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly chaveUsuario = 'minha-loja-usuario';
  private readonly chaveToken = 'minha-loja-token';
  private platformId = inject(PLATFORM_ID);
  private usuario = signal<Usuario | null>(this.carregarUsuarioSalvo());
  private tokenJwt = signal<string | null>(this.carregarTokenSalvo());
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
    const usuarioLogado: Usuario = {
      email,
      perfil,
    };
    this.usuario.set(usuarioLogado);
    this.tokenJwt.set(tokenSimulado);
    // Salva login simulado para manter a sessão após atualizar a página.
    this.salvarAutenticacao(usuarioLogado, tokenSimulado);
    return true;
  }
  logout() {
    this.usuario.set(null);
    this.tokenJwt.set(null);
    // Remove dados de autenticação ao sair.
    this.limparAutenticacaoSalva();
  }
  obterToken(): string | null {
    return this.tokenJwt();
  }
  obterPerfil() {
    return this.usuario();
  }
  // Evita acessar localStorage fora do navegador.
  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  // Recupera usuário salvo.
  private carregarUsuarioSalvo(): Usuario | null {
    if (!this.estaNoNavegador()) {
      return null;
    }
    const dadosSalvos = localStorage.getItem(this.chaveUsuario);
    if (!dadosSalvos) {
      return null;
    }
    try {
      return JSON.parse(dadosSalvos) as Usuario;
    } catch {
      return null;
    }
  }
  // Recupera token salvo.
  private carregarTokenSalvo(): string | null {
    if (!this.estaNoNavegador()) {
      return null;
    }
    return localStorage.getItem(this.chaveToken);
  }
  // Salva usuário e token simulados.
  private salvarAutenticacao(usuario: Usuario, token: string) {
    if (!this.estaNoNavegador()) {
      return;
    }
    localStorage.setItem(this.chaveUsuario, JSON.stringify(usuario));
    localStorage.setItem(this.chaveToken, token);
  }
  // Limpa autenticação salva.
  private limparAutenticacaoSalva() {
    if (!this.estaNoNavegador()) {
      return;
    }
    localStorage.removeItem(this.chaveUsuario);
    localStorage.removeItem(this.chaveToken);
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
@Component({
selector: 'app-admin',
imports: [],
templateUrl: './admin.html',
styleUrl: './admin.css',
})
export class Admin {
// A área administrativa passa a ler dados do usuário autenticado.
private authFacade = inject(AuthFacade);
// Router usado para voltar para a área pública após logout.
private router = inject(Router);
// Signals simulando indicadores administrativos do sistema.
totalProdutosCadastrados = signal(20);
pedidosPendentes = signal(3);
usuariosCadastrados = signal(8);
// Computed signal derivado do usuário atual.
usuarioAtual = this.authFacade.usuarioAtual;
// Texto calculado para reforçar o perfil atualmente autenticado.
mensagemPerfil = computed(() => {
const usuario = this.usuarioAtual();
if (!usuario) {
return 'Nenhum usuário autenticado.';
}
return `Usuário autenticado como ${usuario.perfil}.`;
});
sair() {
this.authFacade.sair();
this.router.navigateByUrl('/login');
}
}

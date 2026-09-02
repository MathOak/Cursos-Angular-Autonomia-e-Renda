import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // o Header deixa de acessar diretamente os services.
  // Agora ele consome facades, que simplificam o acesso ao carrinho e à autenticação.
  private carrinhoFacade = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);
  // Sinais recebidos da facade do carrinho.
  quantidade = this.carrinhoFacade.quantidade;
  // Sinais recebidos da facade de autenticação.
  estaLogado = this.authFacade.estaLogado;
  usuarioAtual = this.authFacade.usuarioAtual;
  sair() {
    // Logout feito pela facade, não mais diretamente pelo service.
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}

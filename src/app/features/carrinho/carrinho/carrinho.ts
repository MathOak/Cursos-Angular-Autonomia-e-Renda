import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CarrinhoService } from '../../../core/services/carrinho.services';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  carrinhoService = inject(CarrinhoService);

  quantidadeCarrinho = this.carrinhoService.quantidade;
  totalCarrinho = this.carrinhoService.total;
}

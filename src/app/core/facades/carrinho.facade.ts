import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.services';
import { ItemCarrinhoType } from '../models/item-carrinho';
@Injectable({
  providedIn: 'root',
})
export class CarrinhoFacade {
  // A facade passa a ser a camada usada pelos componentes,
  // evitando que as telas dependam diretamente dos detalhes internos do service.
  private carrinhoService = inject(CarrinhoService);
  // Sinais expostos para leitura pelas telas.
  itens = this.carrinhoService.itens;
  quantidade = this.carrinhoService.quantidade;
  total = this.carrinhoService.total;
  carrinhoVazio = this.carrinhoService.carrinhoVazio;
  // Ação de alto nível para adicionar produto ao carrinho.
  adicionarProduto(produto: ItemCarrinhoType) {
    this.carrinhoService.adicionar(produto);
  }
  // Ação de alto nível para limpar o carrinho.
  limparCarrinho() {
    this.carrinhoService.limpar();
  }
  deletar(produto: ItemCarrinhoType) {
    this.carrinhoService.deletar(produto);
  }
}

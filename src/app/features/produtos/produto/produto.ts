import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarrinhoService } from '../../../core/services/carrinho.services';
import { RouterLink } from '@angular/router';
import { ItemCarrinhoType } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  private carrinhoService = inject(CarrinhoService);
  @Input() nome: string = '';
  @Input() preco: number = 0;
  @Output() produtoSelecionado = new EventEmitter();
  @Output() adicionarProdutoAoCarrinho = new EventEmitter<ItemCarrinhoType>();

  itemRepetido = computed(() => {
    return this.carrinhoService.itens().find((item) => item.nome == this.nome);
  });

  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }
  adicionarAoCarrinho() {
    this.adicionarProdutoAoCarrinho.emit({
      nome: this.nome,
      preco: this.preco,
    });
  }
}

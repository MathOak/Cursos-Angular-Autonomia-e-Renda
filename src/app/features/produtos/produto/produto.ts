import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, MatButtonModule, MatCardModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  @Input() nome: string = '';
  @Input() preco: number = 0;
  @Output() produtoSelecionado = new EventEmitter();
  @Output() adicionarProdutoAoCarrinho = new EventEmitter();

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

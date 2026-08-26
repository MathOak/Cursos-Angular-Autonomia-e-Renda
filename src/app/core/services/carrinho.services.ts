import { computed, Injectable, signal } from '@angular/core';

type CarrinhoType = {
  nome: string;
  preco: number;
};

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  //Estado Global
  private carrinho = signal<CarrinhoType[]>([]);

  // SELECTORS
  itens = computed(() => this.carrinho());
  public quantidade = computed(() => this.carrinho().length);
  public total = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0),
  );
  carrinhoVazio = computed(() => this.carrinho().length === 0);
  // ACTIONS
  public adicionar(produto: CarrinhoType) {
    this.carrinho.update((lista) => [...lista, produto]);
  }
  public deletar(produto: CarrinhoType) {
    const newList = this.carrinho().filter((item) => item !== produto);
    this.carrinho.set(newList);
  }
  public limpar() {
    this.carrinho.set([]);
  }
}

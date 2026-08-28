import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ItemCarrinhoType } from '../models/item-carrinho';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  //Estado Global
  private carrinho = signal<ItemCarrinhoType[]>(this.carregarCarrinhoSalvo());
  private readonly chaveStorage = 'minha-loja-carrinho';
  private platformId = inject(PLATFORM_ID);
  constructor() {
    // Sempre que o carrinho mudar, a lista atualizada será persistida.
    effect(() => {
      this.salvarCarrinho(this.carrinho());
    });
  }
  // SELECTORS
  itens = computed(() => this.carrinho());
  public quantidade = computed(() => this.carrinho().length);
  public total = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0),
  );
  carrinhoVazio = computed(() => this.carrinho().length === 0);
  // ACTIONS
  public adicionar(produto: ItemCarrinhoType) {
    this.carrinho.update((lista) => [...lista, produto]);
  }
  public deletar(produto: ItemCarrinhoType) {
    const newList = this.carrinho().filter((item) => item !== produto);
    this.carrinho.set(newList);
  }
  public limpar() {
    this.carrinho.set([]);
  }
  // Método auxiliar para impedir uso de localStorage fora do navegador.
  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  // Recupera o carrinho salvo, se existir.
  private carregarCarrinhoSalvo(): ItemCarrinhoType[] {
    if (!this.estaNoNavegador()) {
      return [];
    }
    const dadosSalvos = localStorage.getItem(this.chaveStorage);
    if (!dadosSalvos) {
      return [];
    }
    try {
      return JSON.parse(dadosSalvos) as ItemCarrinhoType[];
    } catch {
      return [];
    }
  }
  // Salva o carrinho atualizado no navegador.
  private salvarCarrinho(itens: ItemCarrinhoType[]) {
    if (!this.estaNoNavegador()) {
      return;
    }
    localStorage.setItem(this.chaveStorage, JSON.stringify(itens));
  }
}

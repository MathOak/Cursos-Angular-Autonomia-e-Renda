import { Component, signal, computed } from '@angular/core';
import { Produto } from '../produto/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, CurrencyPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal<
    {
      nome: string;
      preco: number;
    }[]
  >([]);

  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 5);
  });

  produtosNovos = [
    { nome: 'notebook', preco: 3500 },
    { nome: 'mouse', preco: 150 },
    { nome: 'teclado', preco: 250.55 },
  ];

  filtrarNovoProduto() {
    /* Esta função irá filtar a lista atual de produtos 
    e irá retornar um objeto novo que 
    não esteja atualmente na lista de produtos */

    /* Caso a lista de produtos não tenha item nenhum 
    ele retorna e adiciona o primeiro item da lista de produtosNovos */
    if (this.produtos().length === 0) return this.produtosNovos[0];

    /* Verifica o tamanho da lista na tela, com o tamanho da lista de novos produtos
    caso a lista de novos produtos seja maior ou igual, ele continua adicionando na tela
    caso a lista de novos produtos seja menor, ele não faz nada
    */
    if (this.produtosNovos.length >= this.produtos().length) {
      /* Returna o item na posição atual baseada na quantidade de itens na tela
      Se tiver 2 item na tela, ele vai pegar o terceiro item na lista de novos produtos
      */
      return this.produtosNovos[this.produtos().length];
    }
    /* Caso nenhuma das condições anteriores sejam aplicadas, 
    ele retorna um valor nulo para verificação na inclusão da lista */
    return null;
  }

  adicionarProduto() {
    let novoproduto: { nome: string; preco: number } | null = this.filtrarNovoProduto();

    /* Caso a minha função retorne um item novo, eu adiciono na lista */
    if (novoproduto) {
      this.produtos.update((listaAtual) => [...listaAtual, novoproduto]);
    } else {
      /* Caso contrario, não faço nada */
    }
  }

  exibirProduto(nome: string) {
    console.log('Produto selecionado é ' + nome);
  }

  substituirProduto() {
    // Desafio, atualizar somente o valor do item "notebook" sem alterar os valores de outros items
    /* Utilizar a função "map" do javascript para percorrer a lista
    de produtos atuais, e verificar o item com nome notebook e fazer
    a alteração de valor */
    const novaLista = this.produtos().map((item) => {
      /* Verificando cada item da lista, caso o item tenha o 
      nome diferente de notebook ele retorna o item sem alteração */
      if (item.nome !== 'notebook') return item;

      /* Caso o item tenha o nome igual a 'notebook' ele altera o
      valor de preço e retorna o item novo com o valor alterado */
      return {
        ...item,
        preco: 4000,
      };
    });

    /* Altera a lista antiga de produtos, com a nova lista */
    this.produtos.set(novaLista);
  }
}

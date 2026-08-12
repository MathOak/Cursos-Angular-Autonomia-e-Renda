import { Component } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
    produtos = [
    {nome: "notebook", preco:3500},
    {nome: "mouse", preco: 150},
    // {nome:"teclado", preco: 250.55}
  ]
  

  exibirProduto(nome:string){
    this.produtos.push({nome:"teclado", preco: 250.55})
    console.log('Produto selecionado é '+ nome)
  }
}

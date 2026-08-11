import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';
import { CaptalizePipe } from '../../pipes/captalize-pipe';
@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe,PrecoFormatadoPipe, CaptalizePipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  nome = "Produto Exemplo";
  preco = 199.90;
  mostrarpreco = true;
  produtos = [
    {nome: "notebook", preco:3500},
    {nome: "mouse", preco: 150},
    {nome:"teclado", preco: 250}
  ]
}

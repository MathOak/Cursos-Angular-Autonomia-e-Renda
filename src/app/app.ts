import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto } from './components/produto/produto';
import { ListaProdutos } from './components/lista-produtos/lista-produtos';

@Component({
  selector: 'app-root',
  imports: [Produto, ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-teste');
}

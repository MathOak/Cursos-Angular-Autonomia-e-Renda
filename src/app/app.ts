import { Component, signal } from '@angular/core';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ListaProdutos, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-teste');
}

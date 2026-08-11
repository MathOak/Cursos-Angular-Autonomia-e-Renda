import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto } from './components/produto/produto';

@Component({
  selector: 'app-root',
  imports: [Produto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-teste');
}

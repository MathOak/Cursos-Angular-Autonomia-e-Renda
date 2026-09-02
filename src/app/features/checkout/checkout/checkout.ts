import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
function nomeSemNumeros(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;
  if (/\d/.test(valor)) {
    return { numeroInvalido: true };
  }
  return null;
}
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  // Checkout usa a facade apenas para ler resumo, validar carrinho vazio e limpar após compra.
  carrinhoFacade = inject(CarrinhoFacade);
  compraFinalizada = signal(false);
  formulario = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      nomeSemNumeros,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  finalizar() {
    this.compraFinalizada.set(false);
    if (this.carrinhoFacade.carrinhoVazio()) {
      console.log('Não é possível finalizar uma compra com o carrinho vazio.');
      return;
    }
    if (this.formulario.invalid) {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itens();
    const total = this.carrinhoFacade.total();
    console.log('Compra finalizada com sucesso!');
    console.log('Dados do formulário:', dados);
    console.log('Itens do carrinho:', itens);
    console.log('Total da compra:', total);
    // Após finalizar, o carrinho global é limpo.
    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.compraFinalizada.set(true);
  }
}

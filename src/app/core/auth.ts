import { signal } from '@angular/core';

export const usuarioLogado = signal<boolean>(false);

export function login() {
  usuarioLogado.set(true);
}
export function logout() {
  usuarioLogado.set(false);
}

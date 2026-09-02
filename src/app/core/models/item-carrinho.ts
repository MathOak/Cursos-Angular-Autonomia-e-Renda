// Tipo compartilhado para representar um item do carrinho.
// Essa refatoração evita repetir o mesmo type em vários arquivos do projeto.

export type ItemCarrinhoType = {
  nome: string;
  preco: number;
  quantidade?: number;
};

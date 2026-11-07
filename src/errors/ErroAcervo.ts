export class ErroAcervo extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErroAcervo";
  }
}

export class ItemIndisponivelError extends ErroAcervo {
  constructor() {
    super("Este item não está disponível para empréstimo.");
    this.name = "ItemIndisponivelError";
  }
}

export class ItemNaoEncontradoError extends ErroAcervo {
  constructor(id: number) {
    super(`Nenhum item foi encontrado com o ID ${id}.`);
    this.name = "ItemNaoEncontradoError";
  }
}

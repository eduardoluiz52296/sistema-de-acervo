export interface EntidadeIdentificavel {
  readonly id: number;
}

export class RepositorioMemoria<T extends EntidadeIdentificavel> {
  private readonly itens: T[] = [];

  public adicionar(item: T): void {
    if (this.buscarPorId(item.id)) {
      throw new Error(`Já existe um registro com o ID ${item.id}.`);
    }
    this.itens.push(item);
  }

  public listar(): readonly T[] {
    return [...this.itens];
  }

  public buscarPorId(id: number): T | undefined {
    return this.itens.find((item) => item.id === id);
  }

  public remover(id: number): boolean {
    const indice = this.itens.findIndex((item) => item.id === id);
    if (indice === -1) return false;
    this.itens.splice(indice, 1);
    return true;
  }

  public get quantidade(): number {
    return this.itens.length;
  }
}

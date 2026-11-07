import { ItemIndisponivelError } from "../errors/ErroAcervo";

export abstract class ItemAcervo {
  private static _contadorId = 1;

  public readonly id: number;
  private _emprestado = false;
  private _dataEmprestimo: Date | null = null;

  protected constructor(
    public readonly titulo: string,
    public readonly ano: number
  ) {
    this.id = ItemAcervo._contadorId++;
  }

  public get statusDisponibilidade(): string {
    return this._emprestado ? "Emprestado" : "Disponível";
  }

  public get emprestado(): boolean {
    return this._emprestado;
  }

  public emprestar(): void {
    if (this._emprestado) {
      throw new ItemIndisponivelError();
    }
    this._emprestado = true;
    this._dataEmprestimo = new Date();
  }

  public devolver(): void {
    if (!this._emprestado) {
      throw new Error("Este item não está emprestado.");
    }
    this._emprestado = false;
    this._dataEmprestimo = null;
  }

  public get dataEmprestimo(): Date | null {
    return this._dataEmprestimo ? new Date(this._dataEmprestimo) : null;
  }

  public abstract calcularMulta(diasAtraso: number): number;

  public resumo(): string {
    return `#${this.id} | ${this.titulo} (${this.ano}) | ${this.statusDisponibilidade}`;
  }
}

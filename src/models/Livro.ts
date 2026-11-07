import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "../interfaces/Reservavel";

export class Livro extends ItemAcervo implements Reservavel {
  private _nomeReservante: string | null = null;

  constructor(
    titulo: string,
    ano: number,
    public readonly autor: string
  ) {
    super(titulo, ano);
  }

  public override calcularMulta(diasAtraso: number): number {
    this.validarDiasAtraso(diasAtraso);
    return diasAtraso * 1.5;
  }

  public reservar(nomePessoa: string): void {
    if (this.emprestado) {
      throw new Error("Não é possível reservar um livro que está emprestado.");
    }
    if (this._nomeReservante !== null) {
      throw new Error("Este livro já possui uma reserva ativa.");
    }
    const nome = nomePessoa.trim();
    if (!nome) throw new Error("Informe o nome de quem fará a reserva.");
    this._nomeReservante = nome;
  }

  public cancelarReserva(): void {
    if (!this._nomeReservante) throw new Error("Não existe reserva ativa.");
    this._nomeReservante = null;
  }

  public get reservaAtiva(): boolean {
    return this._nomeReservante !== null;
  }

  public get nomeReservante(): string | null {
    return this._nomeReservante;
  }

  private validarDiasAtraso(dias: number): void {
    if (!Number.isInteger(dias) || dias < 0) {
      throw new Error("Os dias de atraso devem ser um número inteiro não negativo.");
    }
  }

  public override resumo(): string {
    return `${super.resumo()} | Livro | Autor: ${this.autor}`;
  }
}

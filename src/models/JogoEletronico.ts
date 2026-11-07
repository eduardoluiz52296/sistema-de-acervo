import { ItemAcervo } from "./ItemAcervo";

export class JogoEletronico extends ItemAcervo {
  constructor(
    titulo: string,
    ano: number,
    public readonly plataforma: string
  ) {
    super(titulo, ano);
  }

  public override calcularMulta(diasAtraso: number): number {
    if (!Number.isInteger(diasAtraso) || diasAtraso < 0) {
      throw new Error("Os dias de atraso devem ser um número inteiro não negativo.");
    }
    return diasAtraso * 3.0;
  }

  public override resumo(): string {
    return `${super.resumo()} | Jogo eletrônico | Plataforma: ${this.plataforma}`;
  }
}

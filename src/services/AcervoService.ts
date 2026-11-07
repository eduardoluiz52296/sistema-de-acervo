import { ItemAcervo } from "../models/ItemAcervo";
import { Livro } from "../models/Livro";
import { JogoEletronico } from "../models/JogoEletronico";
import { RepositorioMemoria } from "../repositories/RepositorioMemoria";
import { ItemNaoEncontradoError } from "../errors/ErroAcervo";

export type NovoLivro = Omit<Livro, "id" | "emprestado" | "statusDisponibilidade" |
  "dataEmprestimo" | "reservaAtiva" | "nomeReservante" | "resumo" |
  "calcularMulta" | "emprestar" | "devolver" | "reservar" | "cancelarReserva">;

export type AtualizacaoItem = Partial<Pick<ItemAcervo, "titulo" | "ano">>;

export class AcervoService {
  private readonly repositorio = new RepositorioMemoria<ItemAcervo>();

  public cadastrar(item: ItemAcervo): void {
    this.repositorio.adicionar(item);
  }

  public listar(): readonly ItemAcervo[] {
    return this.repositorio.listar();
  }

  public buscar(id: number): ItemAcervo {
    const item = this.repositorio.buscarPorId(id);
    if (!item) throw new ItemNaoEncontradoError(id);
    return item;
  }

  public emprestar(id: number): void {
    this.buscar(id).emprestar();
  }

  public devolver(id: number): void {
    this.buscar(id).devolver();
  }

  public calcularMulta(id: number, diasAtraso: number): number {
    return this.buscar(id).calcularMulta(diasAtraso);
  }

  public cadastrarExemplos(): void {
    if (this.repositorio.quantidade > 0) return;
    this.cadastrar(new Livro("O Hobbit", 1937, "J. R. R. Tolkien"));
    this.cadastrar(new Livro("Dom Casmurro", 1899, "Machado de Assis"));
    this.cadastrar(new JogoEletronico("Minecraft", 2011, "PC"));
    this.cadastrar(new JogoEletronico("The Legend of Zelda", 2017, "Nintendo Switch"));
  }
}

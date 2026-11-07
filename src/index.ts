import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { AcervoService } from "./services/AcervoService";
import { Livro } from "./models/Livro";
import { JogoEletronico } from "./models/JogoEletronico";
import { ItemAcervo } from "./models/ItemAcervo";

const terminal = createInterface({ input, output });
const acervo = new AcervoService();
acervo.cadastrarExemplos();

async function perguntar(mensagem: string): Promise<string> {
  return (await terminal.question(mensagem)).trim();
}

async function lerNumero(mensagem: string): Promise<number> {
  const valor = Number(await perguntar(mensagem));
  if (!Number.isInteger(valor)) throw new Error("Digite um número inteiro válido.");
  return valor;
}

function exibirItens(itens: readonly ItemAcervo[]): void {
  if (itens.length === 0) {
    console.log("\\nO acervo está vazio.");
    return;
  }
  console.log("\\n--- ITENS DO ACERVO ---");
  itens.forEach((item) => console.log(item.resumo()));
}

async function cadastrarItem(): Promise<void> {
  console.log("\\n1 - Livro | 2 - Jogo eletrônico");
  const tipo = await perguntar("Tipo: ");
  const titulo = await perguntar("Título: ");
  const ano = await lerNumero("Ano: ");

  if (tipo === "1") {
    const autor = await perguntar("Autor: ");
    acervo.cadastrar(new Livro(titulo, ano, autor));
  } else if (tipo === "2") {
    const plataforma = await perguntar("Plataforma: ");
    acervo.cadastrar(new JogoEletronico(titulo, ano, plataforma));
  } else {
    throw new Error("Tipo inválido.");
  }
  console.log("Item cadastrado com sucesso!");
}

async function executar(): Promise<void> {
  let continuar = true;
  while (continuar) {
    console.log(`
========== SISTEMA DE ACERVO ==========
1 - Listar itens
2 - Cadastrar livro ou jogo
3 - Emprestar item
4 - Devolver item
5 - Reservar livro
6 - Calcular multa
0 - Sair
=======================================`);
    try {
      const opcao = await perguntar("Escolha uma opção: ");
      switch (opcao) {
        case "1":
          exibirItens(acervo.listar());
          break;
        case "2":
          await cadastrarItem();
          break;
        case "3": {
          const id = await lerNumero("ID do item: ");
          acervo.emprestar(id);
          console.log("Empréstimo realizado!");
          break;
        }
        case "4": {
          const id = await lerNumero("ID do item: ");
          acervo.devolver(id);
          console.log("Devolução realizada!");
          break;
        }
        case "5": {
          const id = await lerNumero("ID do livro: ");
          const item = acervo.buscar(id);
          if (!(item instanceof Livro)) {
            throw new Error("Somente livros podem ser reservados.");
          }
          const nome = await perguntar("Nome para a reserva: ");
          item.reservar(nome);
          console.log("Reserva realizada!");
          break;
        }
        case "6": {
          const id = await lerNumero("ID do item: ");
          const dias = await lerNumero("Dias de atraso: ");
          const multa = acervo.calcularMulta(id, dias);
          console.log(`Multa: R$ ${multa.toFixed(2)}`);
          break;
        }
        case "0":
          continuar = false;
          console.log("Até logo!");
          break;
        default:
          console.log("Opção inválida.");
      }
    } catch (erro: unknown) {
      const mensagem = erro instanceof Error ? erro.message : "Ocorreu um erro inesperado.";
      console.log(`\n[ERRO] ${mensagem}`);
    }
  }
  terminal.close();
}

executar().catch((erro: unknown) => {
  console.error("Falha ao iniciar a aplicação:", erro);
  terminal.close();
});

# Sistema de Gerenciamento de Acervo

Aplicação simplificada de console desenvolvida em TypeScript para demonstrar conceitos de Programação Orientada a Objetos.

## Requisitos

- Node.js 18 ou superior
- npm

## Como executar

1. Extraia o ZIP e abra a pasta `sistema-acervo-typescript` no VS Code.
2. Abra o terminal nessa pasta.
3. Instale as dependências:

```bash
npm install
```

4. Execute em modo de desenvolvimento:

```bash
npm run dev
```

5. Para compilar para a pasta `dist/`:

```bash
npm run build
```

6. Para executar a versão compilada:

```bash
npm start
```

## Funcionalidades

- Listagem de itens do acervo.
- Cadastro de livros e jogos eletrônicos.
- Empréstimo e devolução com validações.
- Reserva de livros.
- Cálculo de multas: livro R$ 1,50 por dia e jogo R$ 3,00 por dia.
- Tratamento de erros sem encerrar o menu.

## Organização

```text
sistema-acervo-typescript/
├── src/
│   ├── errors/
│   ├── interfaces/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Conceitos de POO demonstrados

1. **Configuração:** `tsconfig.json` com `strict: true`, scripts para `ts-node` e `tsc`.
2. **Classes e construtores:** `ItemAcervo`, `Livro` e `JogoEletronico`; construtores usam parameter properties.
3. **Encapsulamento:** atributos privados, operações por métodos e identificador `readonly`.
4. **Getters e static:** `statusDisponibilidade` é calculado; `_contadorId` é estático e privado.
5. **Herança e abstração:** `ItemAcervo` é abstrata; subclasses usam `extends`, `super()` e `override`.
6. **Interface:** `Livro implements Reservavel`.
7. **Generics, Utility Types e exceções:** `RepositorioMemoria<T>`, uso de `Omit` e `Partial`, além de erros personalizados e captura com `unknown`.

## Publicar no GitHub

Crie um repositório vazio no GitHub com o nome `sistema-acervo-typescript`. Depois, no terminal, dentro desta pasta, execute:

```bash
git init
git add .
git commit -m "Entrega: sistema de acervo em TypeScript"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/sistema-acervo-typescript.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu usuário do GitHub. O link final será:

`https://github.com/SEU-USUARIO/sistema-acervo-typescript`
# sistema-de-acervo

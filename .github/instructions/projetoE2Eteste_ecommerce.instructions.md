---
applyTo: '**'
---

Responder em Português ao usuário em todas as interações.

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

Projeto: ecommerce-playwright-tests

Objetivo:
Automatizar testes de um e-commerce de demonstração usando Playwright com TypeScript e Node.js, destacando boas práticas de QA, arquitetura por camadas e um repositório de portfólio profissional.

Cenário:
Automatizar um e-commerce de demonstração. Um dos melhores sites para isso é:
https://www.saucedemo.com/

Ele foi criado justamente para automação de testes e é amplamente usado por profissionais e recrutadores de QA.

Funcionalidades principais a cobrir:
- Login
- Produtos
- Carrinho
- Checkout
- Logout
- Erros de login
- Diferentes usuários

Tecnologias:
- Playwright
- TypeScript
- Node.js
- npm
- Faker (para geração de dados quando necessário)
- dotenv
- ESLint
- GitHub Actions (diferencial de CI)

Estrutura esperada:
playwright-typescript-e2e/
│
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── users.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md

O que mostrar nos testes:
- Login válido: entrar na página de produtos.
- Login inválido: exibir mensagem de erro.
- Adicionar produto: carrinho deve ter 1 item.
- Remover produto: carrinho deve ficar vazio.
- Checkout completo: fluxo login > adicionar produto > carrinho > checkout > finalizar > mensagem de sucesso.
- Logout: retornar para a página de login.

Critérios de validação:
- Login válido: entrar na página de produtos.
- Login inválido: mensagem de erro.
- Adicionar produto: carrinho com 1 item.
- Remover produto: carrinho vazio.
- Checkout completo: fluxo finalizado com mensagem de sucesso.
- Logout: voltar para a página de login.

Padrão Page Object:
Usar Page Object Model (POM) em todos os testes.

Exemplo de POM:
```ts
export class LoginPage {
	constructor(private page: Page){}

	async login(username: string, password: string) {
		await this.page.fill('#user-name', username);
		await this.page.fill('#password', password);
		await this.page.click('#login-button');
	}
}
```

Exemplo de teste:
```ts
test('Login', async ({ page }) => {
	const login = new LoginPage(page);
	await login.login(
		'standard_user',
		'secret_sauce'
	);
});
```

Fixtures:
```ts
export const users = {
	standard: {
		username: 'standard_user',
		password: 'secret_sauce'
	},
	locked: {
		username: 'locked_out_user',
		password: 'secret_sauce'
	}
};
```

README:
Adicionar imagens e GIFs para deixar o projeto mais atrativo.

Exemplo de seções no README:
- Playwright + TypeScript
- ✔ Login
- ✔ Logout
- ✔ Carrinho
- ✔ Checkout
- ✔ Page Object
- ✔ Fixtures
- ✔ Playwright Reports

Incluir um GIF da execução dos testes para destacar o projeto no portfólio.

GitHub Actions:
Configurar CI para rodar sempre no push:
- npm install
- npx playwright install
- npm test

Isso gera um selo verde no GitHub e demonstra conhecimento de integração contínua.

Extras que impressionam:
- Page Object Model
- Fixtures
- Variáveis de ambiente (.env)
- Testes parametrizados
- Execução paralela
- Retries em caso de falha
- Screenshots em falhas
- Vídeo da execução
- Relatório HTML do Playwright
- Pipeline no GitHub Actions
- ESLint
- Organização por camadas

O que esse projeto demonstra:
- Automação E2E com Playwright
- TypeScript
- Estruturação de testes
- Page Object Model
- Boas práticas de organização de código
- Tratamento de dados de teste (fixtures)
- Relatórios de execução
- Integração contínua (GitHub Actions)

Como QA em transição para um perfil mais próximo do desenvolvimento, este projeto deve evidenciar familiaridade com TypeScript, orientação a objetos, organização de código e uso de ferramentas de CI/CD.

Recomendação de portfólio:
Construir um repositório com qualidade de projeto interno: commits bem organizados, README completo com badges e GIF, arquitetura limpa, GitHub Actions e testes escritos seguindo boas práticas.

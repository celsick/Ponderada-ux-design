# Habita+ - Agendamento residencial com Material Design 3

## Contexto da atividade

Esta atividade ponderada apresenta uma tela mobile original criada com React Native, Expo Go, React Native Paper e Material Design 3. A proposta do **Habita+** é ajudar moradores a encontrar serviços de manutenção residencial, comparar disponibilidade e montar uma agenda de chamados.

A solução segue o fluxo solicitado no material da aula:

1. Escolha de uma paleta no Material Theme Builder.
2. Exportação do arquivo `material-theme.json`.
3. Uso do bloco `schemes.light` como base do tema.
4. Mapeamento dos tokens para o `MD3LightTheme` do React Native Paper.
5. Construção de uma tela funcional com componentes Material Design 3.
6. Registro das decisões de cor, tipografia, hierarquia, componentes e acessibilidade.

## Tela desenvolvida

A interface foi desenhada como um painel de serviços para casa. Em vez de um catálogo de produtos, o app trabalha com uma jornada de manutenção: buscar um problema, filtrar por área, ver pacotes de plantão e abrir chamados.

Principais áreas:

- **Appbar** com identidade do app e atalho para agenda.
- **Badge** persistente indicando quantos chamados foram adicionados.
- **Surface inicial** com resumo, busca e indicadores operacionais.
- **Searchbar** para procurar por serviço, categoria ou descrição do problema.
- **Chips** para filtrar por Elétrica, Hidráulica, Limpeza e Segurança.
- **Carousel de plantões** com cards horizontais para pacotes e atendimentos prioritários.
- **Cards de serviços** com preço, horário sugerido, avaliação, prioridade e ação de agendamento.
- **ProgressBar** para comunicar prioridade da agenda sem depender só de texto.
- **FAB** para criar roteiro de atendimentos.
- **Snackbar** para confirmar todas as interações principais.

## Cores

O arquivo `material-theme.json` foi importado diretamente no `App.js`, e os tokens de `schemes.light` foram mapeados para papéis corretos do Material Design 3:

- `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
- `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
- `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`
- `surface`, `surfaceVariant`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`
- `onSurface`, `onSurfaceVariant`, `outline`, `outlineVariant`
- `error`, `background`, `inverseSurface`

A cor principal verde foi escolhida por associação com casa, cuidado e solução de problemas. Os containers secundário e terciário criam variação entre plantões e serviços sem perder consistência semântica.

## Tipografia

A hierarquia tipográfica usa variantes do componente `Text` do React Native Paper:

- `headlineSmall` no título principal.
- `titleLarge` em seções e indicadores relevantes.
- `titleMedium` nos nomes dos serviços e cards.
- `bodyMedium` em descrições.
- `labelLarge`, `labelMedium` e `labelSmall` em etiquetas, filtros, metadados e apoio visual.

Essa organização facilita a leitura em celular: primeiro o usuário entende o objetivo da tela, depois vê filtros e pacotes, e por fim compara serviços específicos.

## Componentes Material Design 3 usados

Foram usados mais de 11 componentes do React Native Paper, todos com papel claro na experiência:

- `PaperProvider`: aplica o tema Material Design 3.
- `Appbar`: estrutura o topo e a navegação.
- `Badge`: mostra quantidade de chamados planejados.
- `Searchbar`: permite busca textual.
- `Chip`: filtra categorias rapidamente.
- `Surface`: cria áreas com elevação e papel de superfície.
- `Card`: organiza plantões e serviços.
- `IconButton`: representa ações de agenda, salvar, ordenar e detalhes.
- `Button`: executa o agendamento.
- `ProgressBar`: comunica prioridade visualmente.
- `Divider`: separa blocos de conteúdo.
- `FAB`: destaca a criação de roteiro.
- `Snackbar`: entrega feedback imediato.

## Hierarquia visual

A tela segue uma ordem de uso natural:

1. Identidade e agenda na Appbar.
2. Busca como ação principal.
3. Indicadores resumidos para contexto rápido.
4. Filtros por categoria.
5. Plantões e pacotes em destaque horizontal.
6. Lista de serviços comparáveis.
7. Ações de salvar, agendar e criar roteiro.

Essa hierarquia evita excesso de informação no topo e mantém as ações principais próximas dos itens de serviço.

## Interação e feedback

Todas as ações relevantes exibem `Snackbar`:

- Abrir painel residencial.
- Abrir agenda de chamados.
- Atualizar busca.
- Selecionar categoria.
- Abrir card de plantão.
- Visualizar resumo de serviço.
- Salvar ou remover serviço.
- Ordenar serviços.
- Agendar chamado.
- Criar roteiro de atendimentos.

O contador de chamados usa `Badge` e persiste no estado enquanto o app está aberto. O filtro usa `useMemo`, evitando recalcular a lista completa a cada renderização desnecessária.

## Acessibilidade

Os elementos interativos possuem `accessibilityLabel`, incluindo Appbar, agenda, busca, chips, cards de plantão, ícones de serviço, salvar, ordenar, botões de agendamento, `ProgressBar` e FAB.

As cores foram aplicadas por papéis semânticos do tema, o que ajuda contraste e coerência visual. A tela também evita depender apenas de cor para comunicar informação: há texto, ícones, badges e barra de progresso.

## Como executar

Na pasta do projeto, instale as dependências se necessário:

```bash
npm install
```

Depois execute:

```bash
npx expo start
```

Abra o Expo Go no celular e escaneie o QR Code exibido no terminal. O computador e o celular precisam estar na mesma rede Wi-Fi.

## Arquivos principais

- `App.js`: implementação da tela, estados, filtros, tema, componentes e estilos.
- `material-theme.json`: tema exportado e usado como origem dos tokens.
- `decisoes-design.md`: documentação das escolhas de design e critérios técnicos.
- `app.json`: configuração do projeto Expo.
- `package.json`: dependências e scripts.

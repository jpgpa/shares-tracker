# CLAUDE.md — Orientações do Projeto (Senior Level)

Este ficheiro contém as regras de ouro para o desenvolvimento neste repositório. O Claude deve consultar este ficheiro antes de cada tarefa.

## 1. Comandos de Ambiente
- **Instalação:** `npm install`
- **Build:** `npm run build`
- **Linting:** `npm run lint`
- **Type-Check:** `npx tsc --noEmit`
- **Contexto (Pre-script):** `sh scripts/context.sh`

## 2. Princípios de Arquitetura e Código
- **Regra dos 150:** Nenhum ficheiro/componente deve exceder 150 linhas. Se exceder, refactorizar para sub-componentes ou hooks.
- **S.O.L.I.D:** Responsabilidade única por ficheiro.
- **Modularização:** Separar lógica de negócio (Hooks/Services) da UI (Componentes).
- **Typescript:** Tipagem estrita. Proibido o uso de `any`. Preferir Interfaces a Types para definições de objetos públicos.
- **Design Patterns:** Utilizar padrões de composição e evitar repetição de código (DRY).

## 3. Estrutura de Pastas Esperada
Sempre que criares uma nova funcionalidade, segue este padrão:
```text
feature-name/
├── components/      # Sub-componentes pequenos
├── hooks/           # Lógica (useFeature.ts)
├── types.ts         # Definições de tipos
└── index.tsx        # Ponto de entrada limpo
# 🗂️ PLAN: brModelo Web — Desktop → Web Conversion

> **Projeto:** Converter o aplicativo desktop brModelo (Delphi) em uma aplicação web moderna com React + Vite.  
> **Agente:** `project-planner` + `frontend-specialist` + `orchestrator`

---

## 📋 Sumário Executivo

O brModelo é uma ferramenta de modelagem ER (Entidade-Relacionamento) escrita em Delphi Pascal (~10.684 linhas no `mer.pas`). O objetivo é recriar todas suas funcionalidades como uma aplicação web moderna com React, salvamento local (LocalStorage/IndexedDB), e exportação em arquivo `.brM` (formato JSON customizado).

---

## 🔍 Análise do Código Fonte Original

### Hierarquia de Classes (mer.pas)

```
TGraphicControl
└── TOrigem (base visual)
    ├── THintBalao (tooltips)
    ├── TPonto (pontos de conexão)
    ├── TSeta (setas de direção)
    ├── TLinha (linhas de ligação)
    └── TSelecao (seleção múltipla)

TPaintBox
└── TBase (base de pintura)
    ├── TBaseTexto
    │   ├── TTexto (texto livre)
    │   └── TAtributo (atributos com propriedades)
    ├── TBarraDeAtributos (barra de atributos)
    ├── TEntidade (entidade ER)
    ├── TBaseRelacao
    │   ├── TRelacao (relacionamento)
    │   ├── TChildRelacao (relacionamento filho)
    │   └── TAutoRelacao (auto-relacionamento)
    ├── TEntidadeAssociativa (entidade associativa)
    └── TEspecializacao (generalização/especialização)

TWinControl
└── TModelo (canvas principal)

TComponent
├── TLigacao (conexão lógica)
└── TCardinalidade (cardinalidade)
```

### 73 Ações Mapeadas do Aplicativo Original

| Categoria | Ações |
|-----------|-------|
| **Arquivo** | Novo, Abrir, Fechar, Salvar, Salvar Como, Auto-Salvar |
| **Criar (Conceitual)** | Entidade, Relacionamento, Atributo (Normal/Opcional/Multivalorado/Composto/Identificador), Generalização/Especialização, Auto-Relacionamento, Ligação, Texto Livre |
| **Criar (Lógico)** | Tabela, Relação, Campo, FK, Chave, Separador, Texto |
| **Edição** | Desfazer, Refazer, Copiar, Colar, Recortar, Excluir, Ocultar, Selecionar Atributos, Organizar Atributos |
| **Conversão** | Gerar Modelo Lógico (Conceitual→Lógico), Gerar Esquema Físico (Lógico→SQL), Converter Obrigatório/Opcional |
| **Exportação** | Exportar BMP, Exportar JPG, Exportar Lógico, Imprimir |
| **Configuração** | Editar Fonte, Editar Dicionário (parcial/completo), Templates XSL, Configurações |
| **Ajuda** | Sobre, Site, Logs |

### Formato do Arquivo .brM (Original)

O formato original é **Delphi TPF0 Binary Stream** — uma serialização binária nativa do Delphi. Contém:

- `TModelo` (raiz) com dimensões e tipo de modelo
- Objetos filhos: `TEntidade`, `TRelacao`, `TChildRelacao`, `TAtributo`, `TBarraDeAtributos`, `TCardinalidade`, `TEntidadeAssociativa`
- Propriedades: posição (Left/Top/Width/Height), Nome, OID, FontColor, FontStyles, Cardinalidade, Identificador, Multivalorado, TipoDoValor, etc.

### Propriedades-chave dos Objetos

| Propriedade | Descrição | Objetos |
|-------------|-----------|---------|
| `Left`, `Top`, `Width`, `Height` | Posição e dimensão | Todos |
| `Nome` | Nome do elemento | Entidade, Relação, Atributo |
| `OID` | Identificador único | Todos |
| `FontColor`, `FontStyles` | Estilo do texto | Todos |
| `Cardinalidade` | Valor de cardinalidade | TCardinalidade |
| `OrientacaoLinha` | Orientação de linha | TCardinalidade |
| `Identificador` | Se é atributo identificador | TAtributo |
| `Multivalorado` | Se é multivalorado | TAtributo |
| `Opcional` | Se é opcional | TAtributo |
| `TipoDoValor` | Tipo de dado | TAtributo |
| `TipoDeModelo` | Conceitual/Lógico | TModelo |
| `Fraca` | Se é entidade fraca | TCardinalidade |
| `SetaDirecao` | Direção da seta | TChildRelacao |
| `AutoRelacao` | Se é auto-relacionamento | TEntidade |

---

## 🧠 Brainstorm: Abordagens Técnicas

### Option A: React + SVG Canvas (Recomendada ✅)

**Descrição:** Usar SVG como canvas de diagramação com React gerenciando o estado.

✅ **Pros:**
- SVG permite interatividade nativa (click, drag, hover em cada elemento)
- Zoom e pan sem perda de qualidade (vetorial)
- Cada elemento ER é um componente React
- Fácil estilização com CSS
- Texto editável nativamente
- Exportação direta para PNG/SVG/PDF

❌ **Cons:**
- Performance pode cair com 500+ elementos (raro em ER)
- Necessita implementar grid e snap manualmente

📊 **Effort:** Medium

---

### Option B: React + HTML5 Canvas (fabric.js/konva)

**Descrição:** Usar Canvas 2D com biblioteca como Konva ou Fabric.js.

✅ **Pros:**
- Performance excelente para muitos elementos
- Bibliotecas maduras com drag, zoom, etc.

❌ **Cons:**
- Texto menos flexível que SVG
- Não é vetorial (perde qualidade no zoom)
- Menos acessível
- Mais difícil de estilizar

📊 **Effort:** Medium-High

---

### Option C: React Flow + Customização

**Descrição:** Usar a biblioteca React Flow como base e customizar os nodes.

✅ **Pros:**
- Drag, zoom, pan, connections já prontos
- Comunidade ativa
- Baseado em SVG
- Mini-map built-in

❌ **Cons:**
- Limitações para formas geométricas específicas (losango, elipse)
- Dependência de terceiros
- Customização profunda pode ser mais difícil que SVG puro

📊 **Effort:** Low-Medium

---

### 💡 Recomendação

**Option A: React + SVG Canvas** — porque oferece o melhor equilíbrio entre controle total sobre as formas ER (retângulo=entidade, losango=relacionamento, elipse=atributo), interatividade nativa, e qualidade visual. Para um modelador ER, o número de elementos raramente excede 100, então SVG performa perfeitamente.

---

## 🎨 Design System

| Aspecto | Decisão |
|---------|---------|
| **Style** | Neubrutalism + Dark Mode (contrast alto, bordas nítidas, sombras sólidas) |
| **Palette Primary** | `#6366F1` (Indigo 500) — profissional, técnico |
| **Palette Dark BG** | `#0F172A` (Slate 900) |
| **Palette Surface** | `#1E293B` (Slate 800) |
| **Palette Border** | `#334155` (Slate 700) |
| **Palette Text** | `#F8FAFC` (Slate 50) |
| **Palette Accent** | `#22D3EE` (Cyan 400) — seleções e destaques |
| **Typography** | Inter (UI) + JetBrains Mono (código/SQL) |
| **Icons** | Lucide React |
| **Border Radius** | 8px (panels), 4px (buttons), 0px (canvas elements) |
| **Canvas BG** | Grid de pontos (#1a2332) — estilo Figma/Miro |

---

## 🏗️ Arquitetura Proposta

```
src/
├── components/
│   ├── canvas/
│   │   ├── Canvas.jsx              # SVG canvas principal com zoom/pan
│   │   ├── Grid.jsx                # Grid de pontos de fundo
│   │   ├── SelectionBox.jsx        # Seleção por área
│   │   └── MiniMap.jsx             # Mini-mapa de navegação
│   ├── er-objects/
│   │   ├── Entity.jsx              # Retângulo (entidade)
│   │   ├── WeakEntity.jsx          # Retângulo duplo (ent. fraca)
│   │   ├── Relationship.jsx        # Losango (relacionamento)
│   │   ├── Attribute.jsx           # Elipse (atributo)
│   │   ├── AttributeBar.jsx        # Barra de atributos
│   │   ├── Cardinality.jsx         # Texto de cardinalidade
│   │   ├── Connection.jsx          # Linhas de conexão
│   │   ├── Specialization.jsx      # Triângulo (Gen/Esp)
│   │   ├── AssociativeEntity.jsx   # Retângulo+Losango
│   │   ├── SelfRelationship.jsx    # Auto-relacionamento (loop)
│   │   └── TextBlock.jsx           # Texto livre
│   ├── logical/
│   │   ├── Table.jsx               # Tabela (modelo lógico)
│   │   ├── TableField.jsx          # Campo de tabela
│   │   ├── ForeignKey.jsx          # Chave estrangeira
│   │   └── LogicalConnection.jsx   # Conexões lógicas
│   ├── toolbar/
│   │   ├── Toolbar.jsx             # Barra de ferramentas principal
│   │   ├── ToolGroup.jsx           # Grupo de ferramentas
│   │   └── StatusBar.jsx           # Barra de status
│   ├── panels/
│   │   ├── PropertyInspector.jsx   # Inspetor de propriedades (lateral)
│   │   ├── ModelExplorer.jsx       # Árvore de objetos do modelo
│   │   └── DictionaryPanel.jsx     # Dicionário de dados
│   ├── dialogs/
│   │   ├── NewModelDialog.jsx      # Novo modelo (conceitual/lógico)
│   │   ├── ExportDialog.jsx        # Exportar (PNG/JPG/SVG/.brM)
│   │   ├── ConvertDialog.jsx       # Converter para lógico/físico
│   │   ├── SettingsDialog.jsx      # Configurações
│   │   └── AboutDialog.jsx         # Sobre
│   └── layout/
│       ├── AppLayout.jsx           # Layout principal
│       ├── MenuBar.jsx             # Barra de menu
│       └── TabBar.jsx              # Abas de modelos
├── models/
│   ├── ERModel.js                  # Modelo de dados principal
│   ├── Entity.js                   # Classe Entidade
│   ├── Relationship.js             # Classe Relacionamento
│   ├── Attribute.js                # Classe Atributo
│   ├── Cardinality.js              # Classe Cardinalidade
│   ├── Connection.js               # Classe Conexão
│   ├── Specialization.js           # Classe Especialização
│   └── LogicalModel.js             # Modelo lógico
├── stores/
│   ├── useModelStore.js            # Estado global (Zustand)
│   ├── useToolStore.js             # Ferramenta ativa
│   ├── useSelectionStore.js        # Seleção de objetos
│   └── useHistoryStore.js          # Undo/Redo
├── services/
│   ├── fileService.js              # Salvar/Abrir/Exportar
│   ├── brmParser.js                # Parser do formato .brM (JSON)
│   ├── brmLegacyParser.js          # Parser do formato .brM legado (Delphi TPF0)
│   ├── conversionService.js        # Conceitual → Lógico → Físico
│   ├── sqlGenerator.js             # Gerador de SQL (schema físico)
│   └── exportService.js            # Exportar PNG/JPG/SVG
├── hooks/
│   ├── useDragAndDrop.js           # Hook de drag & drop
│   ├── useZoomPan.js               # Hook de zoom e pan
│   ├── useKeyboardShortcuts.js     # Atalhos de teclado
│   └── useAutoSave.js              # Auto-salvamento local
├── utils/
│   ├── geometry.js                 # Cálculos geométricos
│   ├── connectionRouting.js        # Roteamento de linhas
│   └── idGenerator.js              # Gerador de IDs únicos
├── styles/
│   ├── index.css                   # Design system global
│   ├── canvas.css                  # Estilos do canvas
│   └── components.css              # Estilos dos componentes
├── App.jsx                         # Componente raiz
└── main.jsx                        # Entry point
```

---

## 📝 Formato .brM (Versão Web — JSON)

O novo formato `.brM` será **JSON** (compatível com web), mantendo a extensão `.brM`:

```json
{
  "version": "3.0.0",
  "type": "conceptual",
  "metadata": {
    "name": "Modelo Exemplo",
    "created": "2026-03-15T21:47:00Z",
    "modified": "2026-03-15T22:00:00Z"
  },
  "canvas": {
    "width": 2000,
    "height": 2000,
    "zoom": 1,
    "panX": 0,
    "panY": 0
  },
  "objects": [
    {
      "id": "ent_001",
      "type": "entity",
      "x": 200,
      "y": 150,
      "width": 120,
      "height": 40,
      "name": "Aluno",
      "weak": false,
      "font": { "color": "#000000", "bold": true },
      "attributes": ["att_001", "att_002"]
    },
    {
      "id": "att_001",
      "type": "attribute",
      "x": 200,
      "y": 80,
      "name": "matricula",
      "identifier": true,
      "multiValued": false,
      "optional": false,
      "composed": false,
      "dataType": "INTEGER",
      "owner": "ent_001"
    },
    {
      "id": "rel_001",
      "type": "relationship",
      "x": 400,
      "y": 150,
      "name": "Matricula",
      "entities": ["ent_001", "ent_002"],
      "cardinalities": [
        { "entity": "ent_001", "min": "1", "max": "N" },
        { "entity": "ent_002", "min": "1", "max": "1" }
      ]
    }
  ],
  "connections": [
    {
      "id": "conn_001",
      "from": "ent_001",
      "to": "rel_001",
      "points": []
    }
  ]
}
```

---

## 📦 Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| **React 18** | UI framework |
| **Vite** | Bundler / Dev server |
| **Zustand** | State management (leve, sem boilerplate) |
| **Lucide React** | Ícones |
| **Vanilla CSS** | Estilização (Variables + Custom Properties) |
| **file-saver** | Download de arquivos |
| **html-to-image** | Exportação PNG/JPG |
| **Inter + JetBrains Mono** | Fontes (Google Fonts) |

---

## 🗓️ Fases de Implementação

### Fase 1: Foundation (Estrutura base)
1. Criar projeto React + Vite
2. Configurar design system (CSS variables, fontes, cores)
3. Implementar layout principal (MenuBar, Toolbar, Canvas, PropertyInspector)
4. Configurar Zustand stores

### Fase 2: Canvas Engine (Motor gráfico)
5. Implementar SVG canvas com zoom e pan
6. Grid de pontos de fundo
7. Sistema de drag & drop para elementos
8. Seleção (click + area selection)
9. Snap to grid

### Fase 3: ER Objects — Modelo Conceitual
10. Componente Entidade (retângulo, com dupla borda para fraca)
11. Componente Relacionamento (losango)
12. Componente Atributo (elipse, com variações: identificador, multivalorado, opcional, composto)
13. Componente AttributeBar (barra de atributos)
14. Componente Cardinalidade (texto nas conexões)
15. Componente Conexão (linhas entre objetos)
16. Componente Auto-Relacionamento (loop)
17. Componente Generalização/Especialização (triângulo)
18. Componente Entidade Associativa (retângulo com losango interno)
19. Componente Texto Livre

### Fase 4: Tooling & Interactions
20. Toolbar com todas as ferramentas de criação
21. Property Inspector (editar nome, tipo, cardinalidade, etc.)
22. Keyboard shortcuts (Ctrl+Z, Ctrl+S, Delete, etc.)
23. Undo/Redo system (command pattern)
24. Copy/Paste
25. Model Explorer (árvore lateral)

### Fase 5: File I/O & Export
26. Salvar/Abrir como JSON `.brM`
27. Parser do formato legado Delphi `.brM` (para importação)
28. Auto-save no LocalStorage/IndexedDB
29. Exportar como PNG/JPG/SVG
30. Dicionário de Dados

### Fase 6: Conversões
31. Conceitual → Lógico (geração de tabelas a partir do ER)
32. Lógico → SQL (geração de schema físico)
33. Templates de conversão

### Fase 7: Polish & Premium UX
34. Animações suaves (transitions, hover effects)
35. Dark mode completo
36. Mini-map
37. Responsividade básica (desktop-first, min 1024px)
38. Modal dialogs com design premium

---

## 📊 Agent Assignments

| Fase | Agente(s) | Responsabilidade |
|------|-----------|------------------|
| 1-2 | `frontend-specialist` | Estrutura, canvas, design system |
| 3-4 | `frontend-specialist` + `backend-specialist` | Componentes ER + models |
| 5 | `backend-specialist` | Parser .brM, file I/O |
| 6 | `backend-specialist` | Lógica de conversão |
| 7 | `frontend-specialist` | UX/UI polish |
| ALL | `security-auditor` | Verificação final |

---

## ✅ Verification Plan

### Testes Automatizados
```bash
# Rodar testes unitários (após implementação)
npm test

# Verificar build sem erros
npm run build
```

### Verificação Manual
1. **Criar novo modelo conceitual** — adicionar entidades, relacionamentos, atributos
2. **Salvar como .brM** — verificar download do arquivo JSON
3. **Abrir arquivo .brM** — verificar que tudo restaura corretamente
4. **Exportar como PNG** — verificar que a imagem contém o diagrama
5. **Drag & drop** — mover elementos e verificar que conexões seguem
6. **Undo/Redo** — desfazer/refazer ações
7. **Zoom/Pan** — zoom in/out e arrastar canvas
8. **Propriedades** — editar nome, cardinalidade, tipo
9. **Desktop browser test** — Chrome e Firefox em 1920x1080

### Verificação com Browser
```
- Abrir http://localhost:5173 no navegador
- Criar um modelo ER completo (mínimo 3 entidades, 2 relacionamentos)
- Salvar como .brM e reabrir
- Exportar como imagem
```

---

## ⚠️ Decisões que Requerem Aprovação

> [!IMPORTANT]
> **Formato do arquivo .brM:** O formato original é binário Delphi (TPF0). O novo formato web será **JSON com extensão .brM**. Isso significa que arquivos `.brM` antigos do desktop **não serão compatíveis diretamente**, mas podemos implementar um parser legado opcional na Fase 5 (item 27). **Deseja manter esta abordagem?**

> [!IMPORTANT]
> **Salvamento Local:** Usaremos **IndexedDB** (via idb-keyval) para auto-save e múltiplos modelos armazenados localmente. Não haverá backend/servidor — tudo roda no browser. **Confirma esta abordagem?**

> [!IMPORTANT]
> **Modelo Lógico + Físico:** A conversão conceitual→lógico→SQL (Fases 6) é a parte mais complexa, baseada nas regras do livro de Carlos Alberto Heuser. **Deseja incluir isso na primeira versão ou priorizar só o modelo conceitual?**

---

> **Próximos passos:** Após aprovação, iniciar `/create` com Fase 1.

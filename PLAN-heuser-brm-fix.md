# PLAN — brModelo Web Heuser-Compliant + .brM 2.0 Compatibility

## Goal

Make brModelo Web **100% faithful to Heuser's "Projeto de Banco de Dados"** methodology and **export .brM files compatible with brModelo 2.0 desktop** (Delphi version).

---

## Key Research Findings

### Heuser ER Notation (from book)

| Conceito | Símbolo | Notação Heuser |
|----------|---------|----------------|
| **Entidade** | Retângulo | Borda preta, fundo branco, texto preto bold |
| **Entidade Fraca** | Retângulo duplo | Retângulo interno + externo |
| **Relacionamento** | Losango | Borda preta, fundo branco |
| **Atributo** | Elipse | Borda preta, fundo branco |
| **Atributo Identificador** | Elipse + sublinhado + barra/círculo preenchido | preenchido no brModelo |
| **Atributo Multivalorado** | Elipse dupla | Dupla borda |
| **Atributo Opcional** | Borda tracejada / vazio | Círculo vazio no brModelo |
| **Atributo Composto** | Elipse com sub-atributos | Barra conectora no brModelo |
| **Generalização/Especialização** | Triângulo | t = total, p = parcial, d = exclusiva |
| **Entidade Associativa** | Retângulo envolvendo losango | Uma entidade que contém um relacionamento |
| **Cardinalidade** | (min,max) no lado da entidade | e.g. (0,n), (1,1), (1,n) |
| **Auto-relacionamento** | Entidade -> Relacionamento -> mesma Entidade | Papéis nomeados |

### brModelo 2.0 .brM Format (Reverse-Engineered)

O arquivo .brM é um **formato binário Delphi (TReader/TWriter)**, NÃO é XML nem JSON.

**Estrutura do binário:**
```
[05] "2.0.0"           <- versão string (length-prefixed)
"TPF0"                  <- marcador Delphi Form
TModelo                 <- objeto raiz com Left/Top/Width/Height + Font
  TEntidade             <- Left, Top, Width, Height, OID, Nome, _AutoRelacao, _Origem
  TRelacao              <- Left, Top, Width, Height, OID, SetaDirecao
  TAtributo             <- Nome, TamAuto, TipoDoValo (tipo), Opciona, MaxCard, MinCard, _Dono
  TBarraDeAtributos     <- conecta atributos a entidades, _Dono (OID ref)
  TCardinalidade        <- _Comando (coordenadas routing), Cardinalidad
  TEntidadeAssoss       <- _ChildRelacao, SetaDirecao
```

**Propriedades por classe:**

| Classe | Propriedades |
|--------|-------------|
| TModelo | Left, Top, Width, Height, Font.Color, Font.Height, Font.Name |
| TEntidade | Left, Top, Width(102), Height(66), OID, Nome, FontColor, FontStyles(fsBold), _AutoRelacao, _Origem |
| TRelacao | Left, Top, Width(102), Height(51), OID, FontColor, FontStyles(fsBold), SetaDirecao |
| TAtributo | Left, Top, Width, Height, OID, Nome, FontColor, TamAuto, TipoDoValo("Texto"), Opciona, Desvio, ForcaOrientacao, MaxCard, MinCard, _Dono |
| TBarraDeAtributos | Left, Top, Width, Height, OID, FontColor, FontStyles(fsBold), _Dono |
| TCardinalidade | Left, Top, Width(40), Height, OID, FontColor, Cardinalidad, _Comando (routing coords) |
| TEntidadeAssoss | Left, Top, Width, Height, OID, FontColor, FontStyles(fsBold), _ChildRelacao, SetaDirecao |

> CAUTION: A serialização é binária Delphi (TReader). Para implementar no web, precisamos de um
> encoder/decoder JavaScript que leia e escreva este formato binário exato.

---

## Tasks

### Task 1: Criar brmSerializer.js — Parser .brM Binário
Implementar leitor/escritor do formato Delphi TReader para importar/exportar .brM do brModelo 2.0.

- Ler versão "2.0.0" do header
- Parsear TPF0 marker
- Deserializar cada classe (TModelo -> TEntidade -> TAtributo -> etc.)
- Mapear propriedades Delphi -> objetos JavaScript do store
- Serializar de volta ao formato binário para exportação

Verify: Abrir o Arquivo_ref.brM no web -> ver entidades, relações, atributos. Salvar e reabrir no brModelo 2.0 desktop.

---

### Task 2: Atualizar Modelo de Dados do Store
Ajustar useModelStore.js para incluir todas as propriedades do brModelo 2.0:

- OID (integer auto-increment) para cada objeto
- TipoDoValo para atributos (Texto, Inteiro, etc.)
- Opciona (boolean) para atributos
- MaxCard / MinCard para atributos
- _Dono (OID ref) para TBarraDeAtributos e TAtributo
- _AutoRelacao / _Origem para TEntidade
- SetaDirecao para TRelacao
- Cardinalidad + _Comando para TCardinalidade

Verify: Criar modelo no browser -> salvar -> reload -> dados intactos no localStorage.

---

### Task 3: Corrigir ER Shapes para Notação Heuser

Cada componente ER deve seguir a notação exata do livro:

| Arquivo | Correções |
|---------|-----------|
| EREntity.jsx | Retângulo branco, borda preta sólida, texto preto. Weak = retângulo duplo. SEM gradientes/sombras |
| ERRelationship.jsx | Losango branco, borda preta. Nome centrado em preto |
| ERAttribute.jsx | Elipse branca, borda preta. Identificador = sublinhado + preenchido. Multivalorado = elipse dupla. Opcional = vazio / tracejado |
| ERSpecialization.jsx | Triângulo branco, borda preta. Label: t/p (total/parcial) |
| ERConnection.jsx | Linha preta fina. Cardinalidade como texto simples (0,n) SEM pills/badges |

Verify: Comparar visualmente lado-a-lado com screenshots do brModelo 2.0 desktop.

---

### Task 4: Implementar Entidade Associativa
Componente ERAssociative.jsx — retângulo envolvendo um losango interno (conforme Heuser Cap. 3).

- Retângulo externo = entidade
- Losango interno = relacionamento vinculado
- _ChildRelacao referencia o OID da relação

Verify: Criar entidade associativa -> aparece retângulo+losango -> conecta corretamente.

---

### Task 5: Sistema de Cardinalidade Heuser
Cardinalidade no formato (min,max):
- min: 0 ou 1
- max: 1 ou n

Valores: (0,1), (0,n), (1,1), (1,n)

- Exibir como texto simples ao lado da linha de conexão
- Editar via PropertyPanel
- Armazenar como { cardMin: 0, cardMax: 'n' }

Verify: Criar conexão -> editar cardinalidade -> aparecer (0,n) na posição correta.

---

### Task 6: Conversão Conceitual -> Lógico (Regras Heuser Cap. 7-8)

Implementar as regras completas do livro:

| Regra | Implementação |
|-------|---------------|
| Entidade -> Tabela | Cada entidade vira uma tabela. Atributos viram colunas. Identificador = PK |
| Rel 1:1 | FK na tabela com participação total, ou fusão se ambos totais |
| Rel 1:N | FK na tabela do lado N |
| Rel N:N | Tabela junção com PKs de ambos como FK composta |
| Rel N:N:N | Tabela junção com PKs de todas entidades |
| Entidade Fraca | PK = PK pai + identificador parcial |
| Multivalorado | Tabela separada com FK |
| Composto | Expandir sub-atributos como colunas |
| Gen Total Exclusiva | Fusão + flag ou tabelas separadas |
| Gen Parcial | Tabela pai + tabelas filhas com FK |
| Entidade Associativa | Tabela junção + colunas próprias |

Verify: Criar modelo ER completo -> converter -> validar tabelas geradas contra exemplos do livro.

---

### Task 7: Geração SQL (Modelo Físico)

- CREATE TABLE com tipos: VARCHAR, INT, DATE, TEXT, NUMERIC
- PRIMARY KEY constraint
- FOREIGN KEY REFERENCES
- NOT NULL para atributos obrigatórios
- Suporte: PostgreSQL, MySQL, SQLite

Verify: Gerar SQL -> executar num DB -> schema criado sem erros.

---

### Task 8: Verificação Final

- [ ] Abrir Arquivo_ref.brM no web app
- [ ] Criar modelo ER do zero seguindo exemplo do livro
- [ ] Converter conceitual -> lógico
- [ ] Gerar SQL
- [ ] Exportar .brM -> abrir no brModelo 2.0 desktop
- [ ] Build sem erros

---

## Done When

- [ ] App segue 100% a notação Heuser (formas, cardinalidade, tipos)
- [ ] Exportação .brM compatível com brModelo 2.0 desktop
- [ ] Importação de .brM existentes do desktop funciona
- [ ] 3 etapas completas: Conceitual -> Lógico -> Físico

# 🧪 GUIA DE TESTES - SISTEMA DE PROJETOS

## ✅ Testes Manual da Página Explorar

### Teste 1: Carregamento Inicial
**Passos:**
1. Acesse a URL `/explorar`
2. Aguarde ~500ms de delay simulado

**Resultado Esperado:**
- 3 cards de projetos aparecem
- Cada card mostra: imagem, nome, descrição, criador, progresso, apoiadores, dias restantes

---

### Teste 2: Busca por Nome
**Passos:**
1. Na página Explorar, localize o campo "Buscar Projeto"
2. Digite: "saúde"
3. Observe os resultados

**Resultado Esperado:**
- Apenas 1 projeto aparece: "Aplicativo de Saúde Mental"
- Os outros 2 desaparecem
- Contador mostra "Mostrando 1 projeto(s)"

---

### Teste 3: Busca por Descrição
**Passos:**
1. Limpe a busca anterior
2. Digite: "música"
3. Observe os resultados

**Resultado Esperado:**
- 1 projeto aparece: "Festival de Música Independente 2025"
- Contador mostra "Mostrando 1 projeto(s)"

---

### Teste 4: Filtro por Gênero
**Passos:**
1. Limpe a busca
2. Abra o dropdown "Filtrar por Gênero"
3. Selecione: "Literatura"

**Resultado Esperado:**
- Apenas "Livro: Histórias da Amazônia" aparece
- Card mostra tag "Literatura"

---

### Teste 5: Combinação de Filtros
**Passos:**
1. Digite "projeto" no campo de busca
2. Selecione "Saúde" no dropdown
3. Observe os resultados

**Resultado Esperado:**
- Nenhum projeto aparece (nenhum tem "projeto" no nome/descrição)
- Mensagem: "Nenhum projeto encontrado"

---

### Teste 6: Limpar Filtros
**Passos:**
1. Limpe o campo de busca
2. Selecione "Todos os Gêneros" no dropdown

**Resultado Esperado:**
- Os 3 projetos reaparecem
- Contador mostra "Mostrando 3 projeto(s)"

---

### Teste 7: Verificar Card - Projeto 1
**Passos:**
1. Localize: "Aplicativo de Saúde Mental"
2. Verifique os dados exibidos

**Resultado Esperado:**
```
Nome: Aplicativo de Saúde Mental
Descrição: Um app inovador para ajudar...
Criador: Dr. Carlos Silva
Genero (tag): Saúde
Meta: R$ 50.000,00
Arrecadado: R$ 32.500,00
Percentual: 65%
Apoiadores: 👥 127 apoiadores
Dias: ⏱️ 45 dias restantes (aproximadamente)
Barra de Progresso: 65% preenchida (cor indigo)
```

---

### Teste 8: Verificar Card - Projeto 2
**Passos:**
1. Localize: "Festival de Música Independente 2025"
2. Verifique os dados exibidos

**Resultado Esperado:**
```
Nome: Festival de Música Independente 2025
Criador: Maria Oliveira
Genero (tag): Música
Meta: R$ 75.000,00
Arrecadado: R$ 48.200,00
Percentual: 64,27%
Apoiadores: 👥 234 apoiadores
Dias: ⏱️ 60 dias restantes
Barra de Progresso: ~64% preenchida (cor indigo)
```

---

### Teste 9: Verificar Card - Projeto 3 (Quase Completo)
**Passos:**
1. Localize: "Livro: Histórias da Amazônia"
2. Verifique a barra de progresso

**Resultado Esperado:**
```
Nome: Livro: Histórias da Amazônia
Meta: R$ 30.000,00
Arrecadado: R$ 28.500,00
Percentual: 95%
Barra de Progresso: 95% preenchida (cor azul/verde)
Apoiadores: 👥 156 apoiadores
Dias: ⏱️ 25 dias restantes
```

---

### Teste 10: Responsividade Mobile
**Passos:**
1. Abra DevTools (F12)
2. Ative modo responsivo (Ctrl+Shift+M)
3. Defina viewport: 375px (iPhone)
4. Navegue a página

**Resultado Esperado:**
- Apenas 1 card por linha (grid-cols-1)
- Filtros ocupam 100% da largura
- Scroll horizontal não aparece
- Tudo legível e acessível

---

### Teste 11: Responsividade Tablet
**Passos:**
1. Defina viewport: 768px (iPad)
2. Observe layout

**Resultado Esperado:**
- 2 cards por linha (grid-cols-2)
- Filtros em 2 colunas
- Layout balanceado

---

### Teste 12: Responsividade Desktop
**Passos:**
1. Defina viewport: 1920px
2. Observe layout

**Resultado Esperado:**
- 3 cards por linha (grid-cols-3)
- Filtros em 2 colunas
- Espaçamento adequado

---

### Teste 13: Hover Effects
**Passos:**
1. Passe o mouse sobre um card
2. Passe o mouse sobre a imagem

**Resultado Esperado:**
- Card sombra aumenta (shadow-lg hover)
- Imagem tem zoom suave
- Transição suave (300ms)

---

### Teste 14: Formatação de Moeda
**Passos:**
1. Observe qualquer valor monetário

**Resultado Esperado:**
- Formato: "R$ 50.000,00" (com separador de milhares e 2 casas decimais)
- Locale português do Brasil (pt-BR)

---

### Teste 15: Cálculo de Dias
**Passos:**
1. Observe o contador de dias em cada card

**Resultado Esperado:**
- Projeto 1: ~45 dias
- Projeto 2: ~60 dias
- Projeto 3: ~25 dias
- Valor decresce conforme tempo passa (real time)

---

## 🔍 Testes de Integração do Serviço

### Teste 16: Serviço getAllProjects
**Código:**
```typescript
this.projectService.getAllProjects().subscribe(projects => {
  console.log('Total de projetos:', projects.length); // 3
  console.log('Primeiro projeto:', projects[0].nome); // Saúde
});
```

**Resultado Esperado:**
- Array com 3 projetos
- Delay de ~500ms
- Projeto 1 com nome: "Aplicativo de Saúde Mental"

---

### Teste 17: Serviço searchProjects
**Código:**
```typescript
this.projectService.searchProjects('música').subscribe(projects => {
  console.log('Resultados:', projects.length); // 1
});
```

**Resultado Esperado:**
- 1 projeto encontrado
- Busca case-insensitive
- Busca em nome e descrição

---

### Teste 18: Serviço getProjectsByGenero
**Código:**
```typescript
this.projectService.getProjectsByGenero('Saúde').subscribe(projects => {
  console.log('Projetos de Saúde:', projects.length); // 1
});
```

**Resultado Esperado:**
- 1 projeto com gênero "Saúde"

---

### Teste 19: Serviço getProjectProgress
**Código:**
```typescript
const projeto = this.projectService.getCurrentProjects()[0];
const progress = this.projectService.getProjectProgress(projeto);
console.log(progress); // { percentual: 65, diasRestantes: 45, atingiuMeta: false }
```

**Resultado Esperado:**
- Percentual correto (32500/50000 = 65%)
- Dias restantes positivo
- atingiuMeta false (projeto 1 não atingiu)

---

## 🐛 Troubleshooting

### Problema: Página branca sem projetos
**Soluções:**
1. Abra console (F12) e procure por erros
2. Verifique se ProjectService está injetado
3. Verifique se getAllProjects() está sendo chamado no ngOnInit
4. Verifique se signals estão atualizando corretamente

### Problema: Filtros não funcionam
**Soluções:**
1. Verifique se FormsModule está importado
2. Verifique se [(ngModel)] tem valores iniciais
3. Teste os métodos de filtro no console
4. Verifique se applyFilters() está sendo chamado

### Problema: Moeda não aparece em BRL
**Soluções:**
1. Verifique se formatCurrency() está retornando string
2. Teste formatCurrency(50000) no console
3. Verifique locale do browser (pt-BR)

### Problema: Dias negativos
**Soluções:**
1. Verifique datas dos projetos mockados
2. Certifique-se que dataLimite é futura
3. Verifique cálculo: (dataLimite - hoje) / ms_por_dia

---

## ✅ Checklist Final de Testes

- [ ] 3 projetos aparecem na página Explorar
- [ ] Busca funciona para nome e descrição
- [ ] Filtro por gênero funciona
- [ ] Combinação de filtros funciona
- [ ] Formatação de moeda está em BRL
- [ ] Dias restantes é calculado corretamente
- [ ] Cards são responsivos (mobile, tablet, desktop)
- [ ] Hover effects funcionam
- [ ] Nenhum erro no console
- [ ] Imagens carregam corretamente
- [ ] Cores das barras de progresso estão certas
- [ ] Serviço de projetos está injetado corretamente

---

**Data**: 01/11/2025
**Status**: Pronto para testes

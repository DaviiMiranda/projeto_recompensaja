# 📋 PLANEJAMENTO DE REFATORAÇÃO - ProjectService

## 🔍 PROBLEMAS IDENTIFICADOS

### 1. **Incompatibilidade de Tipos**
**Problema**: Função `createProject()` aceita `Omit<Project, 'id' | 'dataPostagem' | 'numeroApoiadores'>`
- `id`: ✅ String (correto)
- `dataPostagem`: ✅ Deve ser Date (será gerado automaticamente)
- `numeroApoiadores`: ✅ Deve ser number (iniciará com 0)

**Status**: ⚠️ Precisa correção no tipo genérico

---

### 2. **Método `backProject()` Incompleto**
**Problema**: Chama `updateProject()` dentro de `tap()` e se inscreve novamente
```typescript
backProject(projectId: string, valor: number): Observable<Project | undefined> {
  return this.getProjectById(projectId).pipe(
    tap(project => {
      if (project) {
        this.updateProject(projectId, {
          valorArrecadado: project.valorArrecadado + valor,
          numeroApoiadores: (project.numeroApoiadores || 0) + 1
        }).subscribe();  // ⚠️ PROBLEMA: Subscribe aninhado
      }
    })
  );
}
```

**Efeito**: Memory leak, subscriptions não destruídas

**Status**: ❌ Precisa refatoração com `switchMap`

---

### 3. **Tipo de Retorno no `createProject()`**
**Problema**: Aceita `Omit<Project, ...>` mas deveria aceitar dados parciais
**Solução**: Usar DTO (Data Transfer Object) ou interface dedicada

**Status**: ⚠️ Precisa interface adicional

---

### 4. **Tipagem Insegura em `updateProject()`**
**Problema**: Aceita `Partial<Project>` muito genérico
**Risco**: Permitir atualizações de `id` ou `dataPostagem`

**Status**: ⚠️ Precisa validação

---

### 5. **Método `getProjectProgress()` Não Retorna Observable**
**Problema**: Retorna objeto sincronamente, não Observable
**Inconsistência**: Outros métodos retornam Observables

**Status**: ✅ OK para retorno síncrono (cálculo local)

---

### 6. **Falta de Validações**
**Problema**: Não há validação de dados mockados
- Datas podem ser inválidas
- Valores podem ser negativos
- Nomes podem estar vazios

**Status**: ⚠️ Precisa validação básica

---

## 📐 NOVO DESIGN PROPOSTO

### 1. **Criar Interfaces/DTOs Dedicadas**
```typescript
// Para criação
export interface CreateProjectDTO {
  nome: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  metaValor: number;
  dataLimite: Date | string;
  genero: string;
  imagemUrl: string;
  criadorId: string;
  criadorNome: string;
  criadorFoto?: string;
  videoUrl?: string;
  tags?: string[];
}

// Para atualização (segura)
export interface UpdateProjectDTO {
  nome?: string;
  descricaoCurta?: string;
  descricaoCompleta?: string;
  dataLimite?: Date | string;
  genero?: string;
  videoUrl?: string;
  tags?: string[];
  status?: ProjectStatus;
}
```

---

### 2. **Refatorar Métodos Críticos**

#### `createProject()` - COM DTO
```typescript
createProject(data: CreateProjectDTO): Observable<Project> {
  // Validar dados
  if (!this.isValidCreateProject(data)) {
    return throwError(() => new Error('Dados inválidos'));
  }
  
  const newProject: Project = {
    ...data,
    id: this.generateId(),
    dataPostagem: new Date(),
    numeroApoiadores: 0,
    valorArrecadado: 0,
    status: ProjectStatus.PENDENTE
  };
  
  const updated = [...this.projectsSubject.value, newProject];
  this.projectsSubject.next(updated);
  return of(newProject).pipe(delay(800));
}
```

#### `updateProject()` - COM DTO SEGURO
```typescript
updateProject(id: string, updates: UpdateProjectDTO): Observable<Project | undefined> {
  // Não permitir mudar: id, dataPostagem, numeroApoiadores, valorArrecadado
  const safeUpdates: any = { ...updates };
  delete safeUpdates.id;
  delete safeUpdates.dataPostagem;
  delete safeUpdates.numeroApoiadores;
  delete safeUpdates.valorArrecadado;
  
  // ... resto da lógica
}
```

#### `backProject()` - SEM NESTED SUBSCRIBE
```typescript
backProject(projectId: string, valor: number): Observable<Project | undefined> {
  return this.getProjectById(projectId).pipe(
    switchMap(project => {
      if (!project) {
        return throwError(() => new Error('Projeto não encontrado'));
      }
      
      return this.updateProject(projectId, {
        status: undefined // Não atualizar status
      }).pipe(
        tap(() => {
          const current = this.projectsSubject.value.find(p => p.id === projectId);
          if (current) {
            current.valorArrecadado += valor;
            current.numeroApoiadores = (current.numeroApoiadores || 0) + 1;
            this.projectsSubject.next([...this.projectsSubject.value]);
          }
        })
      );
    })
  );
}
```

---

### 3. **Adicionar Validações**
```typescript
private isValidCreateProject(data: CreateProjectDTO): boolean {
  return (
    !!data.nome?.trim() &&
    !!data.descricaoCurta?.trim() &&
    !!data.descricaoCompleta?.trim() &&
    data.metaValor > 0 &&
    !!data.genero?.trim() &&
    !!data.criadorId?.trim() &&
    !!data.criadorNome?.trim() &&
    this.isValidDate(data.dataLimite)
  );
}

private isValidDate(date: Date | string): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime()) && d > new Date();
}
```

---

## 📊 MAPA DE MUDANÇAS

| Método | Problema | Solução | Prioridade |
|--------|----------|---------|-----------|
| `createProject()` | Tipo genérico | Usar CreateProjectDTO | 🔴 ALTA |
| `updateProject()` | Muito permissivo | Usar UpdateProjectDTO | 🔴 ALTA |
| `backProject()` | Nested subscribe | Usar switchMap | 🔴 ALTA |
| `getMockedProjects()` | Sem validação | Adicionar validação | 🟡 MÉDIA |
| Modelo | Sem DTOs | Criar DTOs | 🔴 ALTA |

---

## ✅ CHECKLIST DE REFATORAÇÃO

### Fase 1: Preparação
- [ ] Criar interfaces CreateProjectDTO
- [ ] Criar interface UpdateProjectDTO
- [ ] Adicionar tipo ProjectProgress ao modelo

### Fase 2: Refatoração do Serviço
- [ ] Refatorar `createProject()` com DTO
- [ ] Refatorar `updateProject()` com DTO seguro
- [ ] Refatorar `backProject()` com switchMap
- [ ] Adicionar método `isValidCreateProject()`
- [ ] Adicionar método `isValidDate()`

### Fase 3: Dados Mockados
- [ ] Validar dados mockados
- [ ] Converter em constante reutilizável
- [ ] Testar com valores extremos

### Fase 4: Testes
- [ ] Testar createProject com dados válidos
- [ ] Testar createProject com dados inválidos
- [ ] Testar updateProject com restrict
- [ ] Testar backProject sem memory leak
- [ ] Testar getProjectProgress com cada projeto

---

## 🎯 RESULTADO ESPERADO

✅ **Type-safety**: Sem `any` ou `Partial<Project>` genérico
✅ **Segurança**: Campos protegidos não podem ser alterados
✅ **Reatividade**: RxJS operadores corretos (switchMap, não subscribe aninhado)
✅ **Validação**: Dados são validados antes de usar
✅ **Memory Safe**: Sem memory leaks por subscriptions
✅ **Manutenível**: Código limpo e bem documentado

---

## 📝 IMPACTO NAS OUTRAS PÁGINAS

### `explorar.component.ts`
```typescript
// ANTES: Funcionava, mas com tipo inseguro
this.projectService.getAllProjects().subscribe(projects => {
  this.projects.set(projects);
});

// DEPOIS: Sem mudanças necessárias ✅
// (Compatível com refatoração)
```

### Páginas que usarão `createProject()`
```typescript
// NOVO: Usar DTO
const createData: CreateProjectDTO = { ... };
this.projectService.createProject(createData).subscribe(...);
```

---

**Aprovação Recomendada**: ✅ SIM
**Data Proposta**: 01/11/2025
**Tempo Estimado**: 30-45 minutos

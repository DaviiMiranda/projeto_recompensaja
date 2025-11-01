# 📚 Quick Reference - SharedModule

## Import Rápido
```typescript
import { ButtonComponent, InputComponent, ProjectCardComponent, Project } from '@app/shared';
```

---

## 🔘 ButtonComponent

```html
<!-- Básico -->
<app-button (clicked)="action()">Clique</app-button>

<!-- Estilos -->
<app-button buttonStyle="primary">Primary</app-button>
<app-button buttonStyle="secondary">Secondary</app-button>
<app-button buttonStyle="outline">Outline</app-button>
<app-button buttonStyle="danger">Danger</app-button>

<!-- Tamanhos -->
<app-button size="sm">Pequeno</app-button>
<app-button size="md">Médio</app-button>
<app-button size="lg">Grande</app-button>

<!-- Estados -->
<app-button [loading]="true">Carregando...</app-button>
<app-button [disabled]="true">Desabilitado</app-button>
<app-button [fullWidth]="true">Largura Total</app-button>

<!-- Form -->
<app-button type="submit">Enviar</app-button>
```

---

## 🎴 ProjectCardComponent

```typescript
// Component
project: Project = {
  id: 1,
  titulo: 'Meu Projeto',
  descricaoCurta: 'Descrição',
  imagemUrl: 'https://...',
  criadorNome: 'João',
  metaValor: 50000,
  valorArrecadado: 35000,
  dataLimite: new Date('2025-12-31'),
  // ...outros campos
};
```

```html
<!-- Template -->
<app-project-card [project]="project" />

<!-- Lista -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <app-project-card *ngFor="let p of projects" [project]="p" />
</div>
```

---

## ⌨️ InputComponent

```typescript
// Component
form = this.fb.group({
  nome: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  senha: ['', Validators.required],
  valor: [0, Validators.min(10)],
  data: ['', Validators.required],
  descricao: ['', Validators.maxLength(500)]
});
```

```html
<!-- Texto -->
<app-input
  label="Nome"
  placeholder="Seu nome"
  type="text"
  [control]="form.get('nome')"
  [required]="true"
/>

<!-- Email -->
<app-input
  label="E-mail"
  type="email"
  [control]="form.get('email')"
  [required]="true"
/>

<!-- Senha -->
<app-input
  label="Senha"
  type="password"
  [control]="form.get('senha')"
  hint="Mínimo 6 caracteres"
/>

<!-- Número -->
<app-input
  label="Valor"
  type="number"
  [control]="form.get('valor')"
/>

<!-- Data -->
<app-input
  label="Data"
  type="date"
  [control]="form.get('data')"
/>

<!-- Textarea -->
<app-input
  label="Descrição"
  type="textarea"
  [control]="form.get('descricao')"
  [rows]="6"
/>

<!-- Erros Customizados -->
<app-input
  label="Telefone"
  type="tel"
  [control]="form.get('telefone')"
  [errorMessages]="{
    required: 'Telefone é obrigatório',
    pattern: 'Formato inválido'
  }"
/>
```

---

## 📋 Interface Project

```typescript
interface Project {
  id: number;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta?: string;
  imagemUrl: string;
  videoUrl?: string;
  criadorId: number;
  criadorNome: string;
  criadorFoto?: string;
  metaValor: number;
  valorArrecadado: number;
  dataLimite: Date | string;
  dataCriacao: Date | string;
  categoria: string;
  status: ProjectStatus;
  numeroApoiadores?: number;
}

enum ProjectStatus {
  PENDENTE = 'PENDENTE',
  ATIVO = 'ATIVO',
  SUCESSO = 'SUCESSO',
  FALHOU = 'FALHOU',
  CANCELADO = 'CANCELADO'
}
```

---

## 🎨 Customização de Cores

```css
/* styles.css global ou no componente */
@layer components {
  .btn-primary {
    @apply bg-purple-600 hover:bg-purple-700;
  }
  
  .project-card {
    @apply shadow-lg hover:shadow-2xl;
  }
  
  .input-field {
    @apply border-purple-300 focus:ring-purple-500;
  }
}
```

---

## ⚡ Dicas Rápidas

### FormControl Helper
```typescript
getControl(name: string) {
  return this.form.get(name) as FormControl;
}

// Uso
[control]="getControl('email')"
```

### Validações Comuns
```typescript
Validators.required
Validators.email
Validators.minLength(n)
Validators.maxLength(n)
Validators.min(n)
Validators.max(n)
Validators.pattern(/regex/)
```

### Grid Responsivo
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Cards aqui -->
</div>
```

---

## 🚨 Mensagens de Erro Padrão (PT-BR)

| Validação | Mensagem |
|-----------|----------|
| required | Este campo é obrigatório |
| email | Digite um e-mail válido |
| minlength | O campo deve ter no mínimo X caracteres |
| maxlength | O campo deve ter no máximo X caracteres |
| min | O valor mínimo é X |
| max | O valor máximo é X |
| pattern | Formato inválido |

---

## 📱 Breakpoints Tailwind

| Prefixo | Min Width |
|---------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

**Documentação completa:** `src/app/shared/README.md`  
**Exemplos:** `src/app/shared/examples/shared-examples.component.ts`

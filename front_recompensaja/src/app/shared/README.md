# SharedModule - Documentação de Uso

Este módulo contém componentes reutilizáveis para toda a aplicação RecompensaJa.

## 📦 Componentes Disponíveis

### 1. ButtonComponent

Botão genérico e configurável com diferentes estilos e estados.

#### Importação
```typescript
import { ButtonComponent } from '@app/shared';
```

#### Uso Básico
```html
<!-- Botão Primary -->
<app-button (clicked)="handleClick()">
  Clique Aqui
</app-button>

<!-- Botão Secondary -->
<app-button buttonStyle="secondary" (clicked)="handleClick()">
  Cancelar
</app-button>

<!-- Botão Outline -->
<app-button buttonStyle="outline" size="lg" (clicked)="handleClick()">
  Ver Mais
</app-button>

<!-- Botão Danger -->
<app-button buttonStyle="danger" (clicked)="deleteItem()">
  Excluir
</app-button>

<!-- Botão com Loading -->
<app-button [loading]="isLoading" (clicked)="submitForm()">
  Salvar
</app-button>

<!-- Botão Desabilitado -->
<app-button [disabled]="!isValid">
  Enviar
</app-button>

<!-- Botão Full Width -->
<app-button [fullWidth]="true" type="submit">
  Criar Projeto
</app-button>
```

#### Inputs
| Propriedade | Tipo | Default | Descrição |
|------------|------|---------|-----------|
| `buttonStyle` | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | `'primary'` | Estilo visual do botão |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do botão |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `loading` | `boolean` | `false` | Mostra spinner de carregamento |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML do botão |
| `fullWidth` | `boolean` | `false` | Botão ocupa 100% da largura |

#### Outputs
| Evento | Tipo | Descrição |
|--------|------|-----------|
| `clicked` | `EventEmitter<MouseEvent>` | Emitido ao clicar no botão |

---

### 2. ProjectCardComponent

Card visual para exibir informações de um projeto.

#### Importação
```typescript
import { ProjectCardComponent } from '@app/shared';
import { Project } from '@app/shared/models/project.model';
```

#### Uso Básico
```typescript
// No Component TypeScript
export class ProjectsListComponent {
  projects: Project[] = [
    {
      id: 1,
      titulo: 'Projeto Inovador',
      descricaoCurta: 'Um projeto revolucionário para mudar o mundo',
      imagemUrl: 'https://example.com/image.jpg',
      criadorId: 1,
      criadorNome: 'João Silva',
      criadorFoto: 'https://example.com/avatar.jpg',
      metaValor: 50000,
      valorArrecadado: 35000,
      dataLimite: new Date('2025-12-31'),
      dataCriacao: new Date('2025-01-01'),
      categoria: 'Tecnologia',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 120
    }
  ];
}
```

```html
<!-- No Template HTML -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <app-project-card 
    *ngFor="let project of projects"
    [project]="project"
  />
</div>
```

#### Inputs
| Propriedade | Tipo | Required | Descrição |
|------------|------|----------|-----------|
| `project` | `Project` | ✅ | Dados completos do projeto |

#### Funcionalidades Automáticas
- ✅ Cálculo de percentual de progresso
- ✅ Cálculo de dias restantes
- ✅ Barra de progresso com cores dinâmicas (verde/amarelo/vermelho)
- ✅ Formatação de moeda em R$
- ✅ Avatar padrão se não houver foto do criador
- ✅ Link para página de detalhes do projeto
- ✅ Responsivo e com efeitos de hover

---

### 3. InputComponent

Campo de entrada integrado com Reactive Forms e validação automática.

#### Importação
```typescript
import { InputComponent } from '@app/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```

#### Uso Básico
```typescript
// No Component TypeScript
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(10)]],
      dataLimite: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  get nomeControl() {
    return this.registerForm.get('nome') as FormControl;
  }
  
  // ... outros getters
}
```

```html
<!-- No Template HTML -->
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <!-- Input de Texto -->
  <app-input
    label="Nome Completo"
    placeholder="Digite seu nome"
    type="text"
    [control]="nomeControl"
    [required]="true"
    hint="Mínimo de 3 caracteres"
  />

  <!-- Input de Email -->
  <app-input
    label="E-mail"
    placeholder="seu@email.com"
    type="email"
    [control]="registerForm.get('email')"
    [required]="true"
  />

  <!-- Input de Senha -->
  <app-input
    label="Senha"
    placeholder="Digite sua senha"
    type="password"
    [control]="registerForm.get('senha')"
    [required]="true"
    hint="Mínimo de 6 caracteres"
  />

  <!-- Input de Número -->
  <app-input
    label="Valor da Meta"
    placeholder="0.00"
    type="number"
    [control]="registerForm.get('valor')"
    [required]="true"
    hint="Valor mínimo: R$ 10,00"
  />

  <!-- Input de Data -->
  <app-input
    label="Data Limite"
    type="date"
    [control]="registerForm.get('dataLimite')"
    [required]="true"
  />

  <!-- Textarea -->
  <app-input
    label="Descrição do Projeto"
    placeholder="Descreva seu projeto..."
    type="textarea"
    [control]="registerForm.get('descricao')"
    [rows]="6"
    [required]="true"
  />

  <!-- Input com Mensagens de Erro Customizadas -->
  <app-input
    label="Telefone"
    type="tel"
    [control]="registerForm.get('telefone')"
    [errorMessages]="{
      required: 'Por favor, informe seu telefone',
      pattern: 'Telefone inválido. Use o formato (11) 98888-8888'
    }"
  />

  <app-button type="submit" [disabled]="!registerForm.valid">
    Cadastrar
  </app-button>
</form>
```

#### Inputs
| Propriedade | Tipo | Default | Descrição |
|------------|------|---------|-----------|
| `label` | `string` | `''` | Label do campo |
| `placeholder` | `string` | `''` | Texto placeholder |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'date' \| 'textarea' \| 'tel' \| 'url'` | `'text'` | Tipo do input |
| `control` | `FormControl` | - | **Required** - FormControl do Reactive Forms |
| `errorMessages` | `Record<string, string>` | `{}` | Mensagens de erro customizadas |
| `required` | `boolean` | `false` | Adiciona asterisco no label |
| `rows` | `number` | `4` | Número de linhas (apenas textarea) |
| `hint` | `string` | `''` | Texto de ajuda abaixo do campo |

#### Validações Suportadas (Mensagens Padrão em PT-BR)
- `required`: "Este campo é obrigatório"
- `email`: "Digite um e-mail válido"
- `minlength`: "O campo deve ter no mínimo X caracteres"
- `maxlength`: "O campo deve ter no máximo X caracteres"
- `min`: "O valor mínimo é X"
- `max`: "O valor máximo é X"
- `pattern`: "Formato inválido"

#### Funcionalidades
- ✅ Integração com Reactive Forms via ControlValueAccessor
- ✅ Exibição automática de erros de validação
- ✅ Toggle de visibilidade para campos de senha
- ✅ Mensagens de erro customizáveis
- ✅ Suporte a textarea
- ✅ Estados de disabled
- ✅ Hint text opcional
- ✅ Acessibilidade (labels, ARIA)

---

## 🎨 Estilos Tailwind

Todos os componentes usam Tailwind CSS com `@apply` para facilitar customização.

### Customização de Cores

Para alterar as cores dos componentes, edite o arquivo CSS de cada componente ou sobrescreva as classes Tailwind.

Exemplo de customização do ButtonComponent:
```css
/* Adicione ao seu styles.css global ou ao CSS do componente */
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700 focus:ring-purple-500;
}
```

---

## 📋 Checklist de Implementação

- [x] ButtonComponent criado
- [x] ProjectCardComponent criado
- [x] InputComponent criado
- [x] Interface Project criada
- [x] Integração com Reactive Forms
- [x] Validação de erros em PT-BR
- [x] Responsividade
- [x] Estados de loading e disabled
- [x] Documentação completa
- [x] Export barrel (index.ts)

---

## 🚀 Próximos Passos

1. Teste os componentes em uma página real
2. Ajuste cores e espaçamentos conforme design system
3. Adicione testes unitários (opcional)
4. Crie Storybook para showcasing (opcional)

---

## 💡 Dicas de Uso

### Import Simplificado
Sempre use o barrel export:
```typescript
// ✅ Correto
import { ButtonComponent, InputComponent, ProjectCardComponent, Project } from '@app/shared';

// ❌ Evite
import { ButtonComponent } from '@app/shared/components/button/button.component';
```

### TypeScript Path Mapping
Configure no `tsconfig.json` para imports mais limpos:
```json
{
  "compilerOptions": {
    "paths": {
      "@app/*": ["src/app/*"],
      "@shared/*": ["src/app/shared/*"]
    }
  }
}
```

### Reutilização de Estilos
Crie classes utilitárias globais em `styles.css`:
```css
@layer utilities {
  .card-shadow {
    @apply shadow-lg hover:shadow-xl transition-shadow;
  }
}
```

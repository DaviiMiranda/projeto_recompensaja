#!/bin/bash

# Criar validador customizado
cat > src/app/modules/auth/validators/password-match.validator.ts << 'EOF'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return null;
    }

    return senha.value === confirmarSenha.value ? null : { passwordMismatch: true };
  };
}
EOF

mkdir -p src/app/modules/auth/validators

# Mover validador
mv src/app/modules/auth/validators/password-match.validator.ts src/app/modules/auth/validators/ 2>/dev/null || true

echo "✅ AuthModule validators criados!"

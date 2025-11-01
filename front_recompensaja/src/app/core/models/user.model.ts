export type UserRole = 'CREATOR' | 'BACKER' | 'ADMIN';

export interface User {
  id: string;
  nome: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}

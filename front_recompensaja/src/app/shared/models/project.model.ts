import { Reward } from './reward.model';

export interface Project {
  id: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  imagemUrl: string;
  videoUrl?: string;
  criadorNome: string;
  criadorFoto?: string;
  metaValor: number;
  valorArrecadado: number;
  dataLimite: Date | string;
  dataCriacao: Date | string;
  categoria: string;
  status: ProjectStatus;
  numeroApoiadores?: number;
  recompensas?: Reward[];
  tags?: string[];
}

export enum ProjectStatus {
  PENDENTE = 'PENDENTE',
  ATIVO = 'ATIVO',
  SUCESSO = 'SUCESSO',
  FALHOU = 'FALHOU',
  CANCELADO = 'CANCELADO'
}

export interface ProjectProgress {
  percentual: number;
  diasRestantes: number;
  atingiuMeta: boolean;
}
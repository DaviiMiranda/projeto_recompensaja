export interface Reward {
  id: number;
  projectId: number;
  titulo: string;
  descricao: string;
  valorMinimo: number;
  quantidadeDisponivel?: number;
  quantidadeLimitada: boolean;
  quantidadeApoiadores?: number;
  itensInclusos?: string[];
  estimativaEntrega?: Date | string;
}

export interface ProjectFilters {
  categorias?: string[];
  status?: string[];
  metaMin?: number;
  metaMax?: number;
  ordenacao?: 'recente' | 'popular' | 'financiamento' | 'nome';
  busca?: string;
}

export interface SupportRequest {
  projectId: number;
  rewardId: number;
  valorContribuicao: number;
}

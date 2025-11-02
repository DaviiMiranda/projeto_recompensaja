export interface Reward {
  id: number;
  titulo: string;
  descricao: string;
  valorMinimo: number;
  quantidadeDisponivel?: number;
  quantidadeLimitada: boolean;
  itensInclusos?: string[];
  estimativaEntrega?: Date | string;
}

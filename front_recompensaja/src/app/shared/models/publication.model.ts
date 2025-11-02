export interface Publication {
  id: string;
  titulo: string;
  conteudo: string;
  autorNome: string;
  autorFoto?: string;
  autorId: string;
  projetoId?: string;
  projetoTitulo?: string;
  imagemUrl?: string;
  dataPublicacao: Date | string;
  likes: number;
  comentarios: number;
  categorias?: string[];
}

export interface PublicationComment {
  id: string;
  publicacaoId: string;
  autorNome: string;
  autorFoto?: string;
  conteudo: string;
  dataComentario: Date | string;
}

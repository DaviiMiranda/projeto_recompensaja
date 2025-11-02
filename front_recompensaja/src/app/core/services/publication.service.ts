import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Publication } from '../../shared/models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = '/api/publications';

  private mockPublications: Publication[] = [
    {
      id: '1',
      titulo: 'Lançamento do nosso projeto de tecnologia sustentável',
      conteudo: 'Estamos muito felizes em anunciar o lançamento oficial do nosso projeto! Após meses de planejamento e desenvolvimento, finalmente estamos prontos para compartilhar com vocês essa inovação que vai revolucionar a forma como utilizamos energia renovável em pequenas comunidades. Nosso protótipo já está em fase de testes e os resultados têm superado nossas expectativas. Agradecemos imensamente a todos os apoiadores que acreditaram nessa visão desde o início!',
      autorNome: 'Maria Silva',
      autorFoto: 'https://ui-avatars.com/api/?name=Maria+Silva&background=4f46e5&color=fff',
      autorId: 'user-1',
      projetoId: 'proj-1',
      projetoTitulo: 'EcoTech - Energia Sustentável',
      imagemUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      dataPublicacao: new Date('2024-01-15'),
      likes: 156,
      comentarios: 23,
      categorias: ['Tecnologia', 'Sustentabilidade']
    },
    {
      id: '2',
      titulo: 'Obrigado por nos ajudar a atingir 50% da meta!',
      conteudo: 'Que momento incrível! Chegamos à metade da nossa meta de arrecadação e isso só foi possível graças ao apoio de cada um de vocês. Estamos trabalhando duro para entregar um produto de qualidade e cada contribuição nos motiva ainda mais. Nos próximos dias, vamos divulgar vídeos exclusivos mostrando o processo de produção e os bastidores do projeto. Fiquem ligados nas novidades!',
      autorNome: 'João Pedro Santos',
      autorFoto: 'https://ui-avatars.com/api/?name=João+Santos&background=10b981&color=fff',
      autorId: 'user-2',
      projetoId: 'proj-2',
      projetoTitulo: 'Arte Urbana - Mural Comunitário',
      imagemUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
      dataPublicacao: new Date('2024-01-20'),
      likes: 89,
      comentarios: 12,
      categorias: ['Arte', 'Comunidade']
    },
    {
      id: '3',
      titulo: 'Novos designs das recompensas exclusivas',
      conteudo: 'Finalizamos os designs das camisetas e adesivos que serão enviados para os apoiadores! A equipe de design trabalhou com muito carinho em cada detalhe para criar peças únicas e que representem perfeitamente o espírito do nosso projeto. Todos os apoiadores que escolheram recompensas físicas receberão um e-mail com preview exclusivo em breve. Mal podemos esperar para ver vocês usando nossas criações!',
      autorNome: 'Ana Carolina Lima',
      autorFoto: 'https://ui-avatars.com/api/?name=Ana+Lima&background=f59e0b&color=fff',
      autorId: 'user-3',
      projetoId: 'proj-3',
      projetoTitulo: 'Game Indie - Aventura Brasileira',
      imagemUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      dataPublicacao: new Date('2024-01-25'),
      likes: 203,
      comentarios: 34,
      categorias: ['Games', 'Design']
    }
  ];

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
    // Usando mock por enquanto
    return of(this.mockPublications);
    // return this.http.get<Publication[]>(this.apiUrl);
  }

  getPublicationById(id: string): Observable<Publication | undefined> {
    return of(this.mockPublications.find(pub => pub.id === id));
    // return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }

  likePublication(id: string): Observable<Publication | undefined> {
    const publication = this.mockPublications.find(pub => pub.id === id);
    if (publication) {
      publication.likes++;
    }
    return of(publication);
  }

  createPublication(publication: Omit<Publication, 'id' | 'dataPublicacao' | 'likes' | 'comentarios'>): Observable<Publication> {
    const newPublication: Publication = {
      ...publication,
      id: Date.now().toString(),
      dataPublicacao: new Date(),
      likes: 0,
      comentarios: 0
    };
    this.mockPublications.unshift(newPublication);
    return of(newPublication);
    // return this.http.post<Publication>(this.apiUrl, publication);
  }
}

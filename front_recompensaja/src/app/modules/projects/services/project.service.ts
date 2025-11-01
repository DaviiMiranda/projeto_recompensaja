import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, ProjectStatus } from '../../../shared/models/project.model';
import { Reward, ProjectFilters } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private mockProjects: Project[] = [
    {
      id: 1,
      titulo: 'Plataforma de Educação Online Gratuita',
      descricaoCurta: 'Democratizar o acesso à educação de qualidade através de uma plataforma 100% gratuita',
      descricaoCompleta: 'Nossa missão é criar uma plataforma educacional completa e gratuita que ofereça cursos de qualidade em diversas áreas do conhecimento. Com foco em tecnologia, desenvolvimento pessoal e habilidades profissionais.',
      imagemUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      criadorId: 1,
      criadorNome: 'Maria Silva',
      criadorFoto: 'https://i.pravatar.cc/150?img=1',
      metaValor: 100000,
      valorArrecadado: 87500,
      dataLimite: new Date('2025-12-31'),
      dataCriacao: new Date('2025-01-15'),
      categoria: 'Tecnologia',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 234
    },
    {
      id: 2,
      titulo: 'Mural de Arte Comunitária - Bairro Centro',
      descricaoCurta: 'Transformar o centro da cidade com arte urbana criada pela comunidade local',
      descricaoCompleta: 'Projeto colaborativo que une artistas locais para criar um mural gigante que represente a diversidade e história do nosso bairro.',
      imagemUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
      criadorId: 2,
      criadorNome: 'João Santos',
      criadorFoto: 'https://i.pravatar.cc/150?img=2',
      metaValor: 25000,
      valorArrecadado: 18750,
      dataLimite: new Date('2025-08-30'),
      dataCriacao: new Date('2025-02-01'),
      categoria: 'Arte',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 89
    },
    {
      id: 3,
      titulo: 'Energia Solar para Comunidades Rurais',
      descricaoCurta: 'Levar energia limpa e sustentável para áreas rurais sem acesso à eletricidade',
      descricaoCompleta: 'Instalação de painéis solares em comunidades rurais isoladas, proporcionando energia limpa e sustentável para famílias que nunca tiveram acesso à eletricidade.',
      imagemUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
      criadorId: 3,
      criadorNome: 'Ana Costa',
      criadorFoto: 'https://i.pravatar.cc/150?img=3',
      metaValor: 150000,
      valorArrecadado: 42000,
      dataLimite: new Date('2025-11-15'),
      dataCriacao: new Date('2025-01-10'),
      categoria: 'Sustentabilidade',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 156
    },
    {
      id: 4,
      titulo: 'App de Reciclagem Gamificada',
      descricaoCurta: 'Aplicativo que recompensa usuários por reciclar corretamente',
      descricaoCompleta: 'Um aplicativo mobile que ensina e incentiva a reciclagem através de gamificação, pontos e recompensas reais.',
      imagemUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      criadorId: 4,
      criadorNome: 'Carlos Oliveira',
      criadorFoto: 'https://i.pravatar.cc/150?img=4',
      metaValor: 80000,
      valorArrecadado: 65000,
      dataLimite: new Date('2025-10-20'),
      dataCriacao: new Date('2025-02-15'),
      categoria: 'Tecnologia',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 198
    },
    {
      id: 5,
      titulo: 'Biblioteca Comunitária Itinerante',
      descricaoCurta: 'Levar livros e cultura para bairros periféricos através de um ônibus-biblioteca',
      descricaoCompleta: 'Transformar um ônibus em uma biblioteca móvel que percorrerá bairros periféricos oferecendo acesso gratuito a livros, atividades culturais e educação.',
      imagemUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      criadorId: 5,
      criadorNome: 'Beatriz Lima',
      criadorFoto: 'https://i.pravatar.cc/150?img=5',
      metaValor: 120000,
      valorArrecadado: 95000,
      dataLimite: new Date('2025-09-30'),
      dataCriacao: new Date('2025-01-20'),
      categoria: 'Comunidade',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 267
    },
    {
      id: 6,
      titulo: 'Documentário sobre Biodiversidade Brasileira',
      descricaoCurta: 'Série documental explorando a rica biodiversidade da Amazônia',
      descricaoCompleta: 'Produção de uma série documental de 6 episódios sobre a biodiversidade amazônica, seus desafios e importância global.',
      imagemUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
      criadorId: 6,
      criadorNome: 'Rafael Mendes',
      criadorFoto: 'https://i.pravatar.cc/150?img=6',
      metaValor: 200000,
      valorArrecadado: 125000,
      dataLimite: new Date('2025-12-15'),
      dataCriacao: new Date('2025-01-05'),
      categoria: 'Arte',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 312
    },
    {
      id: 7,
      titulo: 'Horta Urbana Comunitária',
      descricaoCurta: 'Criar hortas urbanas em espaços públicos para produção de alimentos orgânicos',
      descricaoCompleta: 'Projeto de criação de hortas comunitárias em praças e terrenos baldios, promovendo agricultura urbana e segurança alimentar.',
      imagemUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
      criadorId: 7,
      criadorNome: 'Fernanda Rocha',
      criadorFoto: 'https://i.pravatar.cc/150?img=7',
      metaValor: 45000,
      valorArrecadado: 32000,
      dataLimite: new Date('2025-07-30'),
      dataCriacao: new Date('2025-02-10'),
      categoria: 'Sustentabilidade',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 145
    },
    {
      id: 8,
      titulo: 'Plataforma de Mentoria Gratuita',
      descricaoCurta: 'Conectar profissionais experientes com jovens em início de carreira',
      descricaoCompleta: 'Uma plataforma web que conecta profissionais experientes dispostos a mentorar jovens que estão começando suas carreiras.',
      imagemUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      criadorId: 8,
      criadorNome: 'Lucas Almeida',
      criadorFoto: 'https://i.pravatar.cc/150?img=8',
      metaValor: 60000,
      valorArrecadado: 48000,
      dataLimite: new Date('2025-10-10'),
      dataCriacao: new Date('2025-01-25'),
      categoria: 'Tecnologia',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 178
    },
    {
      id: 9,
      titulo: 'Festival de Música Independente',
      descricaoCurta: 'Festival para dar visibilidade a artistas independentes locais',
      descricaoCompleta: 'Organização de um festival de 3 dias com apresentações de bandas e artistas independentes da região.',
      imagemUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      criadorId: 9,
      criadorNome: 'Juliana Ferreira',
      criadorFoto: 'https://i.pravatar.cc/150?img=9',
      metaValor: 90000,
      valorArrecadado: 72000,
      dataLimite: new Date('2025-08-15'),
      dataCriacao: new Date('2025-02-05'),
      categoria: 'Arte',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 223
    }
  ];

  private mockRewards: { [projectId: number]: Reward[] } = {
    1: [
      {
        id: 1,
        projectId: 1,
        titulo: 'Apoiador Bronze',
        descricao: 'Seu nome nos agradecimentos da plataforma',
        valorMinimo: 25,
        quantidadeLimitada: false,
        quantidadeApoiadores: 45,
        itensInclusos: ['Nome nos agradecimentos', 'Newsletter mensal']
      },
      {
        id: 2,
        projectId: 1,
        titulo: 'Apoiador Prata',
        descricao: 'Acesso antecipado aos cursos por 6 meses',
        valorMinimo: 100,
        quantidadeLimitada: true,
        quantidadeDisponivel: 15,
        quantidadeApoiadores: 85,
        itensInclusos: ['Tudo do Bronze', 'Acesso antecipado 6 meses', 'Certificado especial']
      },
      {
        id: 3,
        projectId: 1,
        titulo: 'Apoiador Ouro',
        descricao: 'Acesso vitalício + mentoria exclusiva',
        valorMinimo: 500,
        quantidadeLimitada: true,
        quantidadeDisponivel: 3,
        quantidadeApoiadores: 22,
        itensInclusos: ['Tudo do Prata', 'Acesso vitalício', 'Mentoria 1:1', 'Evento VIP'],
        estimativaEntrega: new Date('2025-07-01')
      }
    ],
    2: [
      {
        id: 4,
        projectId: 2,
        titulo: 'Agradecimento',
        descricao: 'Seu nome no mural',
        valorMinimo: 20,
        quantidadeLimitada: false,
        quantidadeApoiadores: 30
      },
      {
        id: 5,
        projectId: 2,
        titulo: 'Print Exclusivo',
        descricao: 'Impressão A3 do mural + seu nome',
        valorMinimo: 80,
        quantidadeLimitada: true,
        quantidadeDisponivel: 25,
        quantidadeApoiadores: 35,
        itensInclusos: ['Print A3 profissional', 'Nome no mural', 'Cartão postal']
      }
    ],
    3: [
      {
        id: 6,
        projectId: 3,
        titulo: 'Plantador de Luz',
        descricao: 'Ajude a iluminar uma casa',
        valorMinimo: 50,
        quantidadeLimitada: false,
        quantidadeApoiadores: 67
      },
      {
        id: 7,
        projectId: 3,
        titulo: 'Guardião Solar',
        descricao: 'Financie um painel solar completo',
        valorMinimo: 500,
        quantidadeLimitada: true,
        quantidadeDisponivel: 10,
        quantidadeApoiadores: 45,
        itensInclusos: ['Placa comemorativa', 'Relatório de impacto', 'Visita à comunidade']
      }
    ]
  };

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.mockProjects.slice(0, 6)).pipe(delay(500));
  }

  getRecentProjects(): Observable<Project[]> {
    return of(this.mockProjects.slice(3, 9)).pipe(delay(500));
  }

  getAllProjects(): Observable<Project[]> {
    return of(this.mockProjects).pipe(delay(500));
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.mockProjects.find(p => p.id === id);
    return of(project).pipe(delay(500));
  }

  getProjectsByFilters(filters: ProjectFilters): Observable<Project[]> {
    let filtered = [...this.mockProjects];

    // Filtro por categoria
    if (filters.categorias && filters.categorias.length > 0) {
      filtered = filtered.filter(p => filters.categorias!.includes(p.categoria));
    }

    // Filtro por status
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status!.includes(p.status));
    }

    // Filtro por meta mínima
    if (filters.metaMin) {
      filtered = filtered.filter(p => p.metaValor >= filters.metaMin!);
    }

    // Filtro por meta máxima
    if (filters.metaMax) {
      filtered = filtered.filter(p => p.metaValor <= filters.metaMax!);
    }

    // Filtro por busca
    if (filters.busca) {
      const searchTerm = filters.busca.toLowerCase();
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm) ||
        p.descricaoCurta.toLowerCase().includes(searchTerm)
      );
    }

    // Ordenação
    if (filters.ordenacao) {
      switch (filters.ordenacao) {
        case 'recente':
          filtered.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
          break;
        case 'popular':
          filtered.sort((a, b) => (b.numeroApoiadores || 0) - (a.numeroApoiadores || 0));
          break;
        case 'financiamento':
          filtered.sort((a, b) => b.valorArrecadado - a.valorArrecadado);
          break;
        case 'nome':
          filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
          break;
      }
    }

    return of(filtered).pipe(delay(500));
  }

  getRewardsByProjectId(projectId: number): Observable<Reward[]> {
    const rewards = this.mockRewards[projectId] || [];
    return of(rewards).pipe(delay(300));
  }

  supportProject(projectId: number, rewardId: number, valor: number): Observable<any> {
    // Simulação de sucesso
    return of({ success: true, message: 'Apoio registrado com sucesso!' }).pipe(delay(1000));
  }
}

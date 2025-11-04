import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, Reward } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private mockProjects: Project[] = [
    {
      id: '1',
      title: 'Smartwatch Revolucionário',
      creator: 'Tech Innovations',
      creatorId: '1',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      description: 'Um smartwatch com tecnologia de ponta para revolucionar seu dia a dia',
      category: 'Tecnologia',
      goalAmount: 100000,
      raisedAmount: 75000,
      backerCount: 450,
      deadline: new Date('2025-12-31'),
      publishedDate: new Date('2024-10-01'),
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      longDescription: `
        <h2>Sobre o Projeto</h2>
        <p>Nosso smartwatch combina design elegante com funcionalidades avançadas de saúde e fitness.</p>
        
        <h3>Características Principais:</h3>
        <ul>
          <li>Monitor cardíaco de precisão médica</li>
          <li>Bateria de 7 dias</li>
          <li>Resistente à água até 50m</li>
          <li>GPS integrado</li>
          <li>Notificações inteligentes</li>
        </ul>
        
        <h3>Por que apoiar?</h3>
        <p>Você estará ajudando a criar o futuro dos wearables, com tecnologia acessível para todos.</p>
      `,
      rewards: [
        {
          id: 'r1',
          projectId: '1',
          title: 'Apoiador Bronze',
          description: 'Agradecimento especial + atualizações exclusivas',
          amount: 50,
          estimatedDelivery: new Date('2026-03-01'),
          backerCount: 120,
          isLimited: false
        },
        {
          id: 'r2',
          projectId: '1',
          title: 'Apoiador Prata',
          description: '1 Smartwatch + Nome nos créditos',
          amount: 299,
          estimatedDelivery: new Date('2026-03-01'),
          backerCount: 250,
          isLimited: true,
          limitQuantity: 500,
          remainingQuantity: 250
        },
        {
          id: 'r3',
          projectId: '1',
          title: 'Apoiador Ouro',
          description: '2 Smartwatches + Acesso antecipado + Convite para evento de lançamento',
          amount: 499,
          estimatedDelivery: new Date('2026-02-01'),
          backerCount: 80,
          isLimited: true,
          limitQuantity: 100,
          remainingQuantity: 20
        }
      ]
    },
    {
      id: '2',
      title: 'Café Artesanal Brasileiro',
      creator: 'Fazenda Boa Vista',
      creatorId: '2',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
      description: 'Café especial de agricultura familiar direto das montanhas de Minas Gerais',
      category: 'Gastronomia',
      goalAmount: 50000,
      raisedAmount: 62000,
      backerCount: 380,
      deadline: new Date('2025-11-30'),
      publishedDate: new Date('2024-09-15'),
      longDescription: `
        <h2>Nossa História</h2>
        <p>Somos uma fazenda familiar com 3 gerações dedicadas ao cultivo do melhor café brasileiro.</p>
        
        <h3>Diferenciais:</h3>
        <ul>
          <li>100% Arábica</li>
          <li>Cultivo sustentável</li>
          <li>Torra artesanal</li>
          <li>Comércio justo</li>
        </ul>
      `
    },
    {
      id: '3',
      title: 'Game Indie: Aventura Pixelada',
      creator: 'Pixel Dreams Studio',
      creatorId: '3',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      description: 'Um jogo de aventura nostálgico com gráficos pixel art e história envolvente',
      category: 'Jogos',
      goalAmount: 80000,
      raisedAmount: 45000,
      backerCount: 520,
      deadline: new Date('2026-01-15'),
      publishedDate: new Date('2024-11-01')
    },
    {
      id: '4',
      title: 'Livro Ilustrado de Fantasia',
      creator: 'Ana Carolina Lima',
      creatorId: '4',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
      description: 'Uma jornada mágica através de ilustrações originais e história cativante',
      category: 'Literatura',
      goalAmount: 30000,
      raisedAmount: 28000,
      backerCount: 210,
      deadline: new Date('2025-10-20'),
      publishedDate: new Date('2024-08-10')
    },
    {
      id: '5',
      title: 'Fones Sustentáveis',
      creator: 'EcoSound',
      creatorId: '5',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      description: 'Fones de ouvido premium feitos com materiais reciclados e biodegradáveis',
      category: 'Tecnologia',
      goalAmount: 120000,
      raisedAmount: 95000,
      backerCount: 680,
      deadline: new Date('2025-12-10'),
      publishedDate: new Date('2024-09-20')
    },
    {
      id: '6',
      title: 'Documentário Amazônia',
      creator: 'Coletivo Raízes',
      creatorId: '6',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      description: 'Documentário sobre a biodiversidade e povos originários da Amazônia',
      category: 'Cinema',
      goalAmount: 150000,
      raisedAmount: 112000,
      backerCount: 890,
      deadline: new Date('2026-02-28'),
      publishedDate: new Date('2024-10-15')
    }
  ];

  constructor() {}

  getAllProjects(): Observable<Project[]> {
    return of(this.mockProjects).pipe(delay(500));
  }

  getFeaturedProjects(): Observable<Project[]> {
    const featured = this.mockProjects.slice(0, 3);
    return of(featured).pipe(delay(500));
  }

  getRecentProjects(): Observable<Project[]> {
    const recent = [...this.mockProjects].sort((a, b) => 
      b.publishedDate.getTime() - a.publishedDate.getTime()
    ).slice(0, 3);
    return of(recent).pipe(delay(500));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.mockProjects.find(p => p.id === id);
    return of(project).pipe(delay(500));
  }

  filterProjects(category?: string, search?: string): Observable<Project[]> {
    let filtered = [...this.mockProjects];

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.creator.toLowerCase().includes(searchLower)
      );
    }

    return of(filtered).pipe(delay(500));
  }

  getCategories(): string[] {
    return ['Tecnologia', 'Gastronomia', 'Jogos', 'Literatura', 'Cinema', 'Arte', 'Música', 'Educação'];
  }
}

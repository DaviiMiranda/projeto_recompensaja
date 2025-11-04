import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {
  private userProjects: Project[] = [
    {
      id: 'user-1',
      title: 'Meu App de Produtividade',
      creator: 'João Silva',
      creatorId: '1',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      description: 'Um aplicativo revolucionário para gerenciar tarefas e aumentar produtividade',
      category: 'Tecnologia',
      goalAmount: 50000,
      raisedAmount: 12500,
      backerCount: 85,
      deadline: new Date('2026-06-30'),
      publishedDate: new Date('2024-11-01'),
      status: 'active'
    },
    {
      id: 'user-2',
      title: 'Curso Online de Design',
      creator: 'João Silva',
      creatorId: '1',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      description: 'Curso completo de design gráfico do zero ao avançado',
      category: 'Educação',
      goalAmount: 30000,
      raisedAmount: 30000,
      backerCount: 120,
      deadline: new Date('2025-12-31'),
      publishedDate: new Date('2024-09-15'),
      status: 'funded'
    },
    {
      id: 'user-3',
      title: 'E-book de Receitas Veganas',
      creator: 'João Silva',
      creatorId: '1',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      description: 'Livro digital com 100 receitas veganas deliciosas e fáceis',
      category: 'Gastronomia',
      goalAmount: 15000,
      raisedAmount: 8200,
      backerCount: 45,
      deadline: new Date('2025-08-20'),
      publishedDate: new Date('2024-10-20'),
      status: 'draft'
    }
  ];

  constructor() {}

  getUserProjects(userId: string): Observable<Project[]> {
    const filtered = this.userProjects.filter(p => p.creatorId === userId);
    return of(filtered).pipe(delay(500));
  }

  createProject(projectData: any): Observable<Project> {
    const newProject: Project = {
      id: 'user-' + (this.userProjects.length + 1),
      title: projectData.title,
      creator: 'João Silva',
      creatorId: '1',
      image: projectData.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      description: projectData.shortDescription,
      category: projectData.category,
      goalAmount: projectData.goalAmount,
      raisedAmount: 0,
      backerCount: 0,
      deadline: new Date(projectData.deadline),
      publishedDate: new Date(),
      status: 'active',
      longDescription: projectData.longDescription,
      video: projectData.video,
      rewards: projectData.rewards?.map((r: any, index: number) => ({
        id: `r-${Date.now()}-${index}`,
        projectId: 'user-' + (this.userProjects.length + 1),
        title: r.title,
        description: r.description,
        amount: r.amount,
        estimatedDelivery: new Date(r.estimatedDelivery),
        backerCount: 0,
        isLimited: r.isLimited,
        limitQuantity: r.limitQuantity,
        remainingQuantity: r.limitQuantity
      })) || []
    };

    this.userProjects.push(newProject);
    return of(newProject).pipe(delay(1000));
  }

  deleteProject(id: string): Observable<void> {
    this.userProjects = this.userProjects.filter(p => p.id !== id);
    return of(undefined).pipe(delay(500));
  }
}

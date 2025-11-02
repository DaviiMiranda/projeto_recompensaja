import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = '/api/projects'; // URL base para a API de projetos

  constructor(private http: HttpClient) { }

  // Retorna todos os projetos
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Retorna um projeto específico pelo ID
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Cria um novo projeto
  createProject(project: Omit<Project, 'id' | 'criadorNome' | 'criadorFoto' | 'valorArrecadado' | 'numeroApoiadores' | 'status'>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // Atualiza um projeto existente
  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  // Deleta um projeto
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

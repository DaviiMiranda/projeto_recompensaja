import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicationService } from '../../core/services/publication.service';
import { Publication, PublicationComment } from '../../shared/models/publication.model';

@Component({
  selector: 'app-publication-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit {
  publication = signal<Publication | null>(null);
  isLiked = signal(false);
  
  mockComments: PublicationComment[] = [
    {
      id: '1',
      publicacaoId: '',
      autorNome: 'Carlos Mendes',
      autorFoto: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=22c55e&color=fff',
      conteudo: 'Parabéns pelo projeto! Mal posso esperar para ver o resultado final.',
      dataComentario: new Date('2024-01-26')
    },
    {
      id: '2',
      publicacaoId: '',
      autorNome: 'Beatriz Costa',
      autorFoto: 'https://ui-avatars.com/api/?name=Beatriz+Costa&background=ec4899&color=fff',
      conteudo: 'Excelente atualização! Vocês estão fazendo um trabalho incrível.',
      dataComentario: new Date('2024-01-27')
    },
    {
      id: '3',
      publicacaoId: '',
      autorNome: 'Ricardo Silva',
      conteudo: 'Quando poderemos ter acesso ao protótipo? Estou muito ansioso!',
      dataComentario: new Date('2024-01-28')
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    const publicationId = this.route.snapshot.paramMap.get('id');
    if (publicationId) {
      this.publicationService.getPublicationById(publicationId).subscribe(publication => {
        this.publication.set(publication || null);
      });
    }
  }

  toggleLike(): void {
    const pub = this.publication();
    if (!pub) return;

    if (!this.isLiked()) {
      this.publicationService.likePublication(pub.id).subscribe(updated => {
        if (updated) {
          this.publication.set(updated);
          this.isLiked.set(true);
        }
      });
    }
  }

  getTimeAgo(date: Date | string): string {
    const now = new Date();
    const targetDate = new Date(date);
    const diffMs = now.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 30) {
      return targetDate.toLocaleDateString('pt-BR');
    } else if (diffDays > 0) {
      return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    } else if (diffHours > 0) {
      return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    } else {
      return 'Agora';
    }
  }
}

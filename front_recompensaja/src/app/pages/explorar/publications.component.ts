import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicationService } from '../../core/services/publication.service';
import { Publication } from '../../shared/models/publication.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications = signal<Publication[]>([]);
  loading = signal(true);

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getPublications().subscribe({
      next: (publications) => {
        this.publications.set(publications);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar publicações:', error);
        this.loading.set(false);
      }
    });
  }

  likePublication(id: string): void {
    this.publicationService.likePublication(id).subscribe({
      next: () => {
        const pubs = this.publications();
        const index = pubs.findIndex(p => p.id === id);
        if (index !== -1) {
          const updatedPubs = [...pubs];
          updatedPubs[index] = { ...updatedPubs[index], likes: updatedPubs[index].likes + 1 };
          this.publications.set(updatedPubs);
        }
      }
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}

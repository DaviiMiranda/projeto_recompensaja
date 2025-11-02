import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationCardComponent {
  @Input({ required: true }) set publication(value: Publication) {
    this._publication.set(value);
  }

  private _publication = signal<Publication | null>(null);
  
  publicationData = computed(() => this._publication());
  
  truncatedContent = computed(() => {
    const pub = this._publication();
    if (!pub) return '';
    
    const maxLength = 150;
    return pub.conteudo.length > maxLength 
      ? pub.conteudo.substring(0, maxLength) + '...' 
      : pub.conteudo;
  });

  getTimeAgo(date: Date | string): string {
    const now = new Date();
    const pubDate = new Date(date);
    const diffMs = now.getTime() - pubDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    } else if (diffHours > 0) {
      return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
    } else {
      return 'Agora';
    }
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicationService } from '../../core/services/publication.service';
import { Publication } from '../../shared/models/publication.model';
import { PublicationCardComponent } from '../../shared/components/publication-card/publication-card.component';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule, PublicationCardComponent],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications = signal<Publication[]>([]);
  filteredPublications = signal<Publication[]>([]);
  searchTerm = signal('');
  selectedCategoria = signal('');
  selectedProjeto = signal('');
  
  categorias = signal<string[]>([]);
  projetos = signal<{ id: string; titulo: string }[]>([]);

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getPublications().subscribe(publications => {
      this.publications.set(publications);
      this.extractFilters(publications);
      this.applyFilters();
    });
  }

  private extractFilters(publications: Publication[]): void {
    const categoriasSet = new Set<string>();
    const projetosMap = new Map<string, string>();

    publications.forEach(pub => {
      pub.categorias?.forEach(cat => categoriasSet.add(cat));
      if (pub.projetoId && pub.projetoTitulo) {
        projetosMap.set(pub.projetoId, pub.projetoTitulo);
      }
    });

    this.categorias.set(Array.from(categoriasSet).sort());
    this.projetos.set(
      Array.from(projetosMap.entries()).map(([id, titulo]) => ({ id, titulo }))
    );
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoriaChange(): void {
    this.applyFilters();
  }

  onProjetoChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategoria.set('');
    this.selectedProjeto.set('');
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.publications();

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(term) ||
        p.conteudo.toLowerCase().includes(term) ||
        p.autorNome.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategoria()) {
      filtered = filtered.filter(p =>
        p.categorias?.includes(this.selectedCategoria())
      );
    }

    if (this.selectedProjeto()) {
      filtered = filtered.filter(p => p.projetoId === this.selectedProjeto());
    }

    this.filteredPublications.set(filtered);
  }
}

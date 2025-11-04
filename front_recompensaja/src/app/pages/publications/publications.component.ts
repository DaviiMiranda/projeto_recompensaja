import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationCardComponent } from '../../shared/components/publication-card/publication-card.component';
import { PublicationService } from '../../core/services/publication.service';
import { Publication } from '../../shared/models/publication.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, PublicationCardComponent],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: Publication[] = [];

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.publicationService.getPublications().subscribe(publications => {
      this.publications = publications;
    });
  }
}

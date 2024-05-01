import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { PillComponent } from '../components/pill/pill.component';
import { PreviewCardComponent } from '../components/preview-card/preview-card.component';
import { ImagePipe } from '../pipes/image.pipe';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [
    PageHeaderComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    PreviewCardComponent,
    ImagePipe,
    PillComponent,
  ],
  template: `
    <blog-page-header>Portfolio</blog-page-header>
    @for (portfolio of portfolios$ | async; track portfolio.attributes.title) {
    <blog-preview-card
      [title]="portfolio.attributes.title"
      [imageUrl]="portfolio.attributes.image | image"
    >
      <blog-pill>{{ portfolio.attributes.type }}</blog-pill>
      <p>{{ portfolio.attributes.description }}</p>

      @if (portfolio.attributes.url) {
      <a class="linkbtn" href="{{ portfolio.attributes.url }}" target="_blank"
        >View Project</a
      >
      }
    </blog-preview-card>
    }
  `,
  styles: [
    `
      app-pill {
        display: block;
        margin: 20px 0;
      }
    `,
  ],
})
export default class PortfolioComponent {
  private content = inject(ContentService);
  portfolios$ = of(this.content.portfolio);
}

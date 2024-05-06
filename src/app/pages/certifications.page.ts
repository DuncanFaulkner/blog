import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { PillComponent } from '../components/pill/pill.component';
import { PreviewCardComponent } from '../components/preview-card/preview-card.component';
import { ImagePipe } from '../pipes/image.pipe';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,

  template: `
    <blog-page-header>Certifications</blog-page-header>
    @for (certification of certifications$ | async; track
    certification.attributes.title) {
    <blog-preview-card
      [title]="certification.attributes.title"
      [subtitle]="certification.attributes.subtitle"
      [imageUrl]="certification.attributes.image | image"
    >
      <blog-pill>{{ certification.attributes.type }}</blog-pill>
      <p>{{ certification.attributes.description }}</p>

      @if (certification.attributes.url) {
      <a
        class="linkbtn"
        href="{{ certification.attributes.url }}"
        target="_blank"
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
  imports: [
    AsyncPipe,
    PageHeaderComponent,
    PreviewCardComponent,
    PillComponent,
    ImagePipe,
  ],
})
export default class CertificationComponent {
  private content = inject(ContentService);
  certifications$ = of(this.content.certification);
}

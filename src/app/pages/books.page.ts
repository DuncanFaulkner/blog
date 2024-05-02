import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { PreviewCardComponent } from '../components/preview-card/preview-card.component';
import { SortBooksByDate } from '../operators/sortBooksByDate';
import { BookSlugPipe } from '../pipes/book-slug.pipe';
import { BookSubtitlePipe } from '../pipes/book-subtitle.pipe';
import { ImagePipe } from '../pipes/image.pipe';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [
    PageHeaderComponent,
    AsyncPipe,
    PreviewCardComponent,
    DatePipe,
    ImagePipe,
    BookSubtitlePipe,
    BookSlugPipe,
  ],
  template: `
    <blog-page-header>Books</blog-page-header>
    @for (book of books$ | async; track book.attributes.title) {
    <blog-preview-card
      [title]="book.attributes.title"
      [subtitle]="book | bookSubtitle"
      [imageUrl]="book.attributes.image | image"
      [linkUrl]="book.slug | bookSlug"
    >
      {{ book.attributes.abstract }}
    </blog-preview-card>
    }
  `,
})
export default class BooksComponent {
  private content = inject(ContentService);
  books$ = of(this.content.books).pipe(SortBooksByDate());
}

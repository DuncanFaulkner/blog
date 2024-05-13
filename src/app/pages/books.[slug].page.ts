import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PillComponent } from '../components/pill/pill.component';
import { BookAttributes } from '../models';

@Component({
  selector: 'book-post',
  standalone: true,
  imports: [AsyncPipe, DatePipe, PillComponent, MarkdownComponent],
  template: `
    @if (book$ | async;as book) {
    <h2>{{ book.attributes.title }}</h2>
    <p>{{ book.attributes.date | date : 'yyyy-MM-dd' }}</p>
    <img src="images/{{ book.attributes.image }}" />
    <analog-markdown [content]="book.content"></analog-markdown>
    <div>
      <blog-pill>{{ book.attributes.tags }}</blog-pill>
    </div>
    <div>Categories: {{ book.attributes.categories }}</div>
    }
  `,

  styles: [
    `
      h2 {
        max-width: var(--article-width);
        margin: 160px auto 40px;
        border-bottom: 8px solid var(--color-accent);
        padding-bottom: 20px;
      }
      div {
        max-width: var(--article-width);
        margin: 0 auto 40px;
      }
      p {
        max-width: var(--article-width);
        margin: 0 auto 40px;
      }
      img {
        max-width: var(--article-width);
        margin: 0 auto 40px;
        display: block;
      }
    `,
  ],
})
export default class BookListComponent {
  readonly book$ = injectContent<BookAttributes>({
    param: 'slug',
    subdirectory: 'books',
  });
}

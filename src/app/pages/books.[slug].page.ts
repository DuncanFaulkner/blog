import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BookAttributes } from '../models';

@Component({
  standalone: true,
  template: `
    @if (book$ | async;as book) {
    <h2>{{ book.attributes.title }}</h2>
    <img src="images/{{ book.attributes.image }}" />
    <analog-markdown [content]="book.content"></analog-markdown>
    }
  `,
  imports: [AsyncPipe, MarkdownComponent],
  styles: [
    `
      h2 {
        max-width: var(--article-width);
        margin: 160px auto 40px;
        border-bottom: 8px solid var(--color-accent);
        padding-bottom: 20px;
      }

      img {
        max-width: var(--article-width);
        margin: 0 auto 40px;
        display: block;
      }
    `,
  ],
})
export default class SingleBookComponent {
  readonly book$ = injectContent<BookAttributes>({
    param: 'slug',
    subdirectory: 'books',
  });
}

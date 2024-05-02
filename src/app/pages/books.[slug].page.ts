import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BookAttributes } from '../models/book-attributes';

@Component({
  standalone: true,
  template: `
    @if (talk$ | async;as talk) {
    <h2>{{ talk.attributes.title }}</h2>
    <img src="images/{{ talk.attributes.image }}" />
    <analog-markdown [content]="talk.content"></analog-markdown>
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
export default class SingleTalkComponent {
  readonly talk$ = injectContent<BookAttributes>({
    param: 'slug',
    subdirectory: 'books',
  });
}

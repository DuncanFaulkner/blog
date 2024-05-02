import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PortfolioAttributes } from '../models';

@Component({
  standalone: true,
  template: `
    @if (portfolio$ | async;as portfolio) {
    <h2>{{ portfolio.attributes.title }}</h2>
    <img src="images/{{ portfolio.attributes.image }}" />
    <analog-markdown [content]="portfolio.content"></analog-markdown>
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
export default class SinglePortfolioComponent {
  readonly portfolio$ = injectContent<PortfolioAttributes>({
    param: 'slug',
    subdirectory: 'portfolio',
  });
}

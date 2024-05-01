import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PostAttributes } from '../models/post-attributes';

@Component({
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
    <h2>{{ post.attributes.title }}</h2>
    <img src="images/{{ post.attributes.image }}" />
    <analog-markdown [content]="post.content"></analog-markdown>
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
      img {
        max-width: var(--article-width);
        margin: 0 auto 40px;
        display: block;
      }
    `,
  ],
})
export default class PostPageComponent {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'posts',
  });
}

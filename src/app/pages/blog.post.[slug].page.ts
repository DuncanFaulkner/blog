import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PostAttributes } from '../models';

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
        border-bottom: 8px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to left, #ff66c4, #5170ff);
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

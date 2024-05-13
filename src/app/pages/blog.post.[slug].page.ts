import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PillComponent } from '../components/pill/pill.component';
import { PostAttributes } from '../models';

@Component({
  standalone: true,
  selector: 'blog-post',
  imports: [AsyncPipe, DatePipe, MarkdownComponent, PillComponent],
  template: `
    @if (post$ | async; as post) {
    <h2>{{ post.attributes.title }}</h2>
    <p>{{ post.attributes.date | date : 'yyyy-MM-dd' }}</p>
    <img src="images/{{ post.attributes.image }}" />
    <p>{{ post.attributes.subtitle }}</p>
    <analog-markdown [content]="post.content"></analog-markdown>
    <div>
      <blog-pill>{{ post.attributes.tags }}</blog-pill>
    </div>
    <div>Categories: {{ post.attributes.categories }}</div>
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
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'posts',
  });
}

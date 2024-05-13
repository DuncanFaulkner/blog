import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sortPostsByDate, takeArray } from '../../operators';
import { BlogSlugPipe } from '../../pipes/blog-slug.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { ContentService } from '../../services/content.service';
import { PillComponent } from '../pill/pill.component';
import { PreviewCardComponent } from '../preview-card/preview-card.component';

@Component({
  selector: 'blog-recent-posts',
  standalone: true,
  imports: [
    AsyncPipe,
    PreviewCardComponent,
    DatePipe,
    ImagePipe,
    PillComponent,
    BlogSlugPipe,
  ],
  template: `
    @for (post of posts$ | async; track post.attributes.title) {
    <blog-preview-card
      [title]="post.attributes.title"
      [imageUrl]="post.attributes.image | image"
      [subtitle]="post.attributes.subtitle"
      [date]="post.attributes.date | date"
      [linkUrl]="post.slug | blogSlug"
    >
      @if (post.attributes.tags) { @for (tag of post.attributes.tags.split(',');
      track tag) {
      <blog-pill>{{ tag }}</blog-pill>
      } }
    </blog-preview-card>
    }
  `,
  styles: [],
})
export class RecentPostsComponent {
  @Input() count = 0;
  content = inject(ContentService);
  posts$: Observable<any> | undefined;

  ngOnInit() {
    this.posts$ = of(this.content.blogs).pipe(
      sortPostsByDate(),
      takeArray(this.count)
    );
  }
}

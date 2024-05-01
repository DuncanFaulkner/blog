import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { PreviewCardComponent } from '../components/preview-card/preview-card.component';
import { sortTalksByDate } from '../operators/sortTalksByDate';
import { ImagePipe } from '../pipes/image.pipe';
import { TalkSlugPipe } from '../pipes/talk-slug.pipe';
import { TalkSubtitlePipe } from '../pipes/talk-subtitle.pipe';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [
    PageHeaderComponent,
    AsyncPipe,
    PreviewCardComponent,
    DatePipe,
    ImagePipe,
    TalkSubtitlePipe,
    TalkSlugPipe,
  ],
  template: `
    <blog-page-header>Talks</blog-page-header>
    @for (talk of talks$ | async; track talk.attributes.title) {
    <blog-preview-card
      [title]="talk.attributes.title"
      [subtitle]="talk | talkSubtitle"
      [imageUrl]="talk.attributes.image | image"
      [linkUrl]="talk.slug | talkSlug"
    >
      {{ talk.attributes.abstract }}
    </blog-preview-card>
    }
  `,
})
export default class TalksComponent {
  private content = inject(ContentService);
  talks$ = of(this.content.talks).pipe(sortTalksByDate());
}

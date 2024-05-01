import { ContentFile } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TalkAttributes } from '../models/talk-attributes';

@Pipe({
  name: 'talkSubtitle',
  standalone: true,
})
export class TalkSubtitlePipe implements PipeTransform {
  transform(value: ContentFile<TalkAttributes>): string {
    const date = new DatePipe('en-US').transform(value.attributes.date);

    let retstr = `${date} | ${value.attributes.conference}`;

    if (value.attributes.location) {
      retstr += ` | ${value.attributes.location}`;
    }

    return retstr;
  }
}

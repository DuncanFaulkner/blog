import { ContentFile } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { BookAttributes } from '../models/book-attributes';

@Pipe({
  name: 'bookSubtitle',
  standalone: true,
})
export class BookSubtitlePipe implements PipeTransform {
  transform(value: ContentFile<BookAttributes>): string {
    const date = new DatePipe('en-US').transform(value.attributes.date);
    let retstr = `${date}`;

    return retstr;
  }
}

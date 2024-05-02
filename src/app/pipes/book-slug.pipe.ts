import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookSlug',
  standalone: true,
})
export class BookSlugPipe implements PipeTransform {
  transform(value: string) {
    return `/books/${value}`;
  }
}

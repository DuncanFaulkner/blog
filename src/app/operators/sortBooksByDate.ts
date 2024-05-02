import { ContentFile } from '@analogjs/content';
import { map } from 'rxjs';
import { BookAttributes } from '../models';

export function SortBooksByDate() {
  return map((blogs: ContentFile<BookAttributes>[]) =>
    blogs.sort((a, b) => {
      const aDate = new Date(a.attributes.date);
      const bDate = new Date(b.attributes.date);
      return bDate.getTime() - aDate.getTime();
    })
  );
}

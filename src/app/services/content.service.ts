import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Injectable } from '@angular/core';
import { BookAttributes, PortfolioAttributes, PostAttributes } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly postContentFn: InjectContentFilesFilterFunction<PostAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/posts/');
  readonly blogs = injectContentFiles(this.postContentFn);

  private readonly booksFilterFn: InjectContentFilesFilterFunction<BookAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/books/');
  readonly books = injectContentFiles(this.booksFilterFn);

  private readonly portfolioFilterFn: InjectContentFilesFilterFunction<PortfolioAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/portfolio/');
  readonly portfolio = injectContentFiles(this.portfolioFilterFn);
}

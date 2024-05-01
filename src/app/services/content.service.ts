import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Injectable } from '@angular/core';
import { PortfolioAttributes, PostAttributes, TalkAttributes } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly postContentFn: InjectContentFilesFilterFunction<PostAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/posts/');
  readonly blogs = injectContentFiles(this.postContentFn);

  private readonly talksFilterFn: InjectContentFilesFilterFunction<TalkAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/talks/');
  readonly talks = injectContentFiles(this.talksFilterFn);

  private readonly portfolioFilterFn: InjectContentFilesFilterFunction<PortfolioAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/portfolio/');
  readonly portfolio = injectContentFiles(this.portfolioFilterFn);
}

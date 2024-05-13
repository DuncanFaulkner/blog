import { Component } from '@angular/core';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { RecentPostsComponent } from '../components/recent-posts/recent-posts.component';

@Component({
  selector: 'blog-page',
  standalone: true,
  imports: [PageHeaderComponent, RecentPostsComponent],
  template: `
    <blog-page-header>Blog</blog-page-header>
    <blog-recent-posts />
  `,
})
export default class BlogListComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'blog-page-header',
  standalone: true,
  imports: [],
  template: ` <h1><ng-content /></h1>`,
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {}

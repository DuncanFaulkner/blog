import { Component } from '@angular/core';

@Component({
  selector: 'blog-header',
  standalone: true,
  imports: [],
  template: `<header>
    <a style="border-bottom: 0" href="/"
      ><img src="/icons/anglebrackets.png" alt="logo"
    /></a>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/books">Books</a></li>
      <li><a href="/portfolio">Portfolio</a></li>
    </ul>
  </header>`,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

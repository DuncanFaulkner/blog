import { Component } from '@angular/core';
import { ControlButtonsComponent } from '../components/control-buttons/control-buttons.component';
import { RecentPostsComponent } from '../components/recent-posts/recent-posts.component';
import { SocialMediaComponent } from '../components/social-media/social-media.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ControlButtonsComponent,
    RecentPostsComponent,
    SocialMediaComponent,
  ],
  template: `
    <section class="main"></section>
    <section class="about">
      <h1>👋🏻 Hello</h1>
      <p>
        Hi there! I'm Duncan, I've been a software engineer for just over two
        decades and I love working with Angular. I like to work on complex and
        exciting challenges, while using the latest technologies and working to
        best practices.
      </p>
      <p>
        Theres more! I also share my knowledge and enthusiasm with the Angular
        community. I maintain
        <a href="https://www.npmjs.com/package/@ngbracket/ngx-layout"
          >&#64;ngbracket/ngx-layout</a
        >
        (formerly &#64;angular/flex-layout). I've written several short books on
        Angular and Angular Material more details can be found in the
        <a href="/books">Books</a> section, and I'm hoping to publish a book on
        Angular later in the year.
      </p>
      <p>
        Please feel free to contact me if you want to know more about me or what
        I'm working on. I'd love to hear from you!
      </p>
      <blog-social-media />
    </section>
    <section class="recent-posts">
      <h3>Latest Post</h3>
      <blog-recent-posts [count]="1" />
      <a href="/blog" class="linkbtn">See All Posts</a>
    </section>
  `,
  styles: [
    `
      section.main {
        min-height: 20vh;
        background-size: cover;
        background-attachment: fixed;
        background-position: center right;
      }

      section.about {
        position: relative;
        max-width: var(--max-page-width);
        margin: -80px auto 0;
        background-color: var(--color-primary);
        padding: 0 20px 20px;

        border: 10px solid;
        border-image-slice: 1;
        border-width: 5px;
        border-image-source: linear-gradient(to left, #ff66c4, #5170ff);
      }

      section.recent-posts {
        margin: 40px auto;
        max-width: var(--max-page-width);
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      section.recent-posts app-recent-posts {
        margin: 0 auto 20px;
      }
    `,
  ],
})
export default class HomeComponent {}

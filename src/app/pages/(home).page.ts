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
      <!-- <blog-control-buttons /> -->
      <h1>👋🏻 Welcome!</h1>
      <p>
        Hi there! I'm Duncan Faulkner, a passionate and experienced software
        engineer who loves working with Angular. At TO DO!!!!, I tackle complex
        and exciting challenges every day, using the latest technologies and
        best practices.
      </p>
      <p>
        But that's not all! I also enjoy sharing my knowledge and enthusiasm
        with the Angular community. I co-organize the , where we host awesome
        speakers and events. And sometimes, I get to be one of those speakers
        myself! I've spoken at the meetup as well as
        <a href="https://ng-conf.org/" target="_blank">ng-conf</a> about Angular
        topics, and I always have a blast doing it.
      </p>
      <p>
        If you want to know more about me or my work, feel free to contact me
        anytime. I'd love to hear from you!
      </p>
      <blog-social-media />
    </section>
    <section class="recent-posts">
      <h3>Latest Post</h3>
      <blog-recent-posts count="1" />
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

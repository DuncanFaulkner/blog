import { Component } from '@angular/core';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
    selector: 'blog-footer',
    imports: [SocialMediaComponent],
    template: ` <footer>
    <p>&copy; {{ year }} anglebrackets.dev</p>
    <blog-social-media />
  </footer>`,
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
}

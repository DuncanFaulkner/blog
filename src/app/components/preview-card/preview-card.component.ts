import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'blog-preview-card',
    imports: [DatePipe],
    template: ` <div
    class="wrapper"
    style="background-image: url({{ imageUrl() }});"
  >
    <div class="overlay"></div>
    <div class="content">
      @if (date()) {
      <p>{{ date() | date }}</p>
      } @if (linkUrl()) {
      <h3>
        <a href="{{ linkUrl() }}">{{ title() }}</a>
      </h3>
      } @else {
      <h3>{{ title() }}</h3>
      } @if (subtitle()) {
      <h4>{{ subtitle() }}</h4>
      }
      <p>
        <ng-content></ng-content>
      </p>
    </div>
  </div>`,
    styleUrl: './preview-card.component.scss'
})
export class PreviewCardComponent {
  linkUrl = input<string | undefined>();
  imageUrl = input.required<string | undefined>();
  title = input.required<string | undefined>();
  subtitle = input<string | undefined | null>();
  date = input<string | undefined | null>();
}

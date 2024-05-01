import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlButtonsComponent } from '../control-buttons/control-buttons.component';

@Component({
  selector: 'blog-preview-card',
  standalone: true,
  imports: [DatePipe, ControlButtonsComponent],
  template: ` <div
    class="wrapper"
    style="background-image: url({{ imageUrl }});"
  >
    <div class="overlay"></div>
    <div class="content">
      <!-- <blog-control-buttons /> -->

      @if (date) {
      <p>{{ date | date }}</p>
      } @if (linkUrl) {
      <h3>
        <a href="{{ linkUrl }}">{{ title }}</a>
      </h3>
      } @else {
      <h3>{{ title }}</h3>
      } @if (subtitle) {
      <h4>{{ subtitle }}</h4>
      }
      <p>
        <ng-content></ng-content>
      </p>
    </div>
  </div>`,
  styleUrl: './preview-card.component.scss',
})
export class PreviewCardComponent {
  @Input() linkUrl: string | undefined;
  @Input({ required: true }) imageUrl: string | undefined;
  @Input({ required: true }) title: string | undefined;
  @Input() subtitle: string | undefined | null;
  @Input() date: string | undefined;
}

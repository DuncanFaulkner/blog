import { Component } from '@angular/core';

@Component({
  selector: 'blog-control-buttons',
  standalone: true,
  imports: [],
  template: `<div class="circles">
    <span class="circle red"></span>
    <span class="circle yellow"></span>
    <span class="circle green"></span>
  </div>`,
  styleUrl: './control-buttons.component.scss',
})
export class ControlButtonsComponent {}

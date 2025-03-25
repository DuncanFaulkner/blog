import { Component } from '@angular/core';

@Component({
    selector: 'blog-pill',
    imports: [],
    template: ` <span><ng-content /></span>`,
    styles: [
        `
      span {
        padding: 10px 20px;
        margin-right: 20px;
        border-radius: 40px;
        background-color: var(--color-accent);
        color: white;
      }
    `,
    ]
})
export class PillComponent {}

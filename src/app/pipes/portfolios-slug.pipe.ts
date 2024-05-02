import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portfolioSlug',
  standalone: true,
})
export class PortfolioSlugPipe implements PipeTransform {
  transform(value: string) {
    return `/portfolio/${value}`;
  }
}

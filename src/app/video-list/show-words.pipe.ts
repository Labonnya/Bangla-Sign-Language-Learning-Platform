import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showWords'
})
export class ShowWordsPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    return words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '');
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'captalize',
})
export class CaptalizePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let newWord = '';
    for (let index = 0; index < value.length; index++) {
      let letter = value[index];
      if (index === 0) {
        letter = value[index].toUpperCase();
      }
      newWord += letter;
    }
    return newWord;
  }
}

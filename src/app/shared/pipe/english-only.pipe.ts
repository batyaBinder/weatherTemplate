import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'englishOnly'
})
export class EnglishOnlyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/[^a-zA-Z]/g, ''); // Removes anything that's not a-z or A-Z
  }
}

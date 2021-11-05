import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabcase'
})
export class KebabcasePipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').join('-');
}

}

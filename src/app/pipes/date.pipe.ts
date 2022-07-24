import { IMessage } from 'src/app/Models/Message';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class DatePipe implements PipeTransform {

  transform(date: any): string|undefined {
    return new Date(date).toLocaleString();
  }

}

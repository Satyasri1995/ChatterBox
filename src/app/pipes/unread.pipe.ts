import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unread'
})
export class UnreadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

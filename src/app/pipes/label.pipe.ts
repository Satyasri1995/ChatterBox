import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {

  transform(value: string): string {
    const a=value.split(" ");
    let b="";
    a.forEach((item)=>{
      b+=item[0].toUpperCase();
    });
    b=b.substring(0,3);
    return b;
  }

}

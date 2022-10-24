import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'html'
})
export class HtmlifyPipe implements PipeTransform {

  constructor() {}

  transform(value: any, args?: any): any {
    let output = '';
    if (value) {
      output = value.replace(/\[b\]/g, '<b>');
      output = output.replace(/\[\/b\]/g, '</b>');
      output = output.replace(/\[i\]/g, '<i>');
      output = output.replace(/\[\/i\]/g, '</i>');
      output = output.replace(/\[u\]/g, '<u>');
      output = output.replace(/\[\/u\]/g, '</u>');
      // output = output.replace(/\n/g, '<br>');
      // output = output.replace(/\r/g, '<br>');

      output = output.replace(/--(.+)/g, '<li><span class="font-normal">$1</span></li>');
    }

    return output;
  }

}

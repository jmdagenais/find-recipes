import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let output: string;
    if (value < 60) {
      output = value + ' min.';
    } else {
      const nbHeures = Math.floor(value / 60);
      const nbMinutes = value % 60;
      output = nbHeures + 'h';
      if (nbMinutes > 0) {
        let minuteDisplay = nbMinutes < 10 ? '0' + nbMinutes.toString() : nbMinutes.toString();
        output += minuteDisplay;
      }
    }

    return output;
  }

}

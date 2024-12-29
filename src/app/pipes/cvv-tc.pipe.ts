import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cvv'
})
export class CvvTCPipe implements PipeTransform {

  transform(value: string): string {
    const newStr: string = value.toString()
      // Eliminar los espacios
      .replace(/\s/g, '').toString()
      // Eliminar las letras
      .replace(/\D/g, '').substr(0, 3).toString().trim();
    return newStr;
  }

}

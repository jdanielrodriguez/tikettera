import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numTC'
})
export class NumTCPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let newStr: string = value;
    if (value !== '#### #### #### ####') {
      newStr = value.toString()
        .replace(/\s/g, '').toString()
        // Eliminar las letras
        .replace(/\D/g, '').toString()
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ').toString().substr(0, 20).trim();
    }
    return newStr;
  }
}

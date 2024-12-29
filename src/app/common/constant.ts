import { Injectable } from '@angular/core';

@Injectable()
export class Constantes {
  constructor(
  ) { }
  tasaIva = 0.12;
  paymentTypes = {
    credit_card: 1,
    bank_account: 2,
    internal_balance: 3
  };
}

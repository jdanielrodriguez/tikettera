import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MetodoPago, Pasarela } from './../../../interfaces';
import { Encript } from './../../../common/encript';
declare const $: any;
declare const TwoPayClient: any;
@Component({
  selector: 'app-formulario-metodo-pago',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  private _tcData: EventEmitter<MetodoPago> = new EventEmitter<MetodoPago>();
  private _tcSelect: MetodoPago = new MetodoPago();
  private _pasarela!: Pasarela;
  private jsPaymentClient: any = null;
  private component = null;
  private CO2DATA = {
    sellerId: '250351031026', // 250351031026ordenes online
    publishableKey: 'BEFC3F1A-1B1D-4574-8F2D-89166D828845', // BEFC3F1A-1B1D-4574-8F2D-89166D828845 ordenes online
  };
  constructor(
    private encript: Encript
  ) {
    this.jsPaymentClient = new TwoPayClient(this.CO2DATA.sellerId);
    if (this.jsPaymentClient) {
      this.jsPaymentClient.setup.setLanguage('es');
    }
  }
  ngOnInit(): void {
    // this.pagar(this._tcSelect);
  }
  pagar(value: any) {
    if (value) {
      this._tcSelect = value;
      this._tcSelect.componente = this.component;
      this._tcData.emit(this._tcSelect);
    }
  }
  init2CO() {
    this.component = this.jsPaymentClient.components.create('card',
      {
        margin: 0,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: '400',
        lineHeight: '1.5',
        color: '#212529',
        textAlign: 'left',
        backgroundColor: '#ffffff',
        '*': {
          boxSizing: 'border'
        },
        '.no-gutters': {
          marginRight: 0,
          marginLeft: 0
        },
        '#card-number': {
          width: '90%'
        },
        '.row': {
          display: 'flex',
          flexWrap: 'wrap'
        },
        '.col': {
          maxWidth: '100%',
          padding: '0',
        },
        '.form>.row:nth-child(2) .col': {
          width: '50%!important'
        },
        '.form>.row:nth-child(2) .col input': {
          width: '95%!important'
        },
        '.form>.row:nth-child(1) .col': {
          width: '100%!important'
        },
        '.form>.row:nth-child(1) .col input': {
          width: '93%!important'
        },
        div: {
          display: 'block'
        },
        '.field-container': {
          paddingBottom: '14px'
        },
        '.field-wrapper': {
          paddingRight: '25px'
        },
        '.input-wrapper': {
          position: 'relative'
        },
        label: {
          display: 'inline-block',
          marginBottom: '9px',
          color: '#313131',
          width: '90%',
          fontSize: '14px',
          fontWeight: '300',
          lineHeight: '17px'
        },
        input: {
          overflow: 'visible',
          margin: 0,
          fontFamily: 'inherit',
          display: 'flex',
          height: '42px',
          padding: '10px 12px',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '22px',
          color: '#313131',
          backgroundColor: '#fff',
          backgroundClip: 'padding-box',
          border: '1px solid #CBCBCB',
          borderRadius: '3px',
          transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
          outline: 0
        },
        'input:focus': {
          border: '1px solid #5D5D5D',
          backgroundColor: '#FFFDF2'
        },
        '.is-error input': {
          border: '1px solid #D9534F'
        },
        '.is-error input:focus': {
          backgroundColor: '#D9534F0B'
        },
        '.is-valid input': {
          border: '1px solid #1BB43F'
        },
        '.is-valid input:focus': {
          backgroundColor: '#1BB43F0B'
        },
        '.validation-message': {
          color: '#D9534F',
          fontSize: '10px',
          fontStyle: 'italic',
          marginTop: '6px',
          marginBottom: '-5px',
          display: 'flex',
          lineHeight: '1'
        },
        '.card-expiration-date': {
          paddingRight: '.5rem'
        },
        '.is-empty input': {
          color: '#EBEBEB'
        },
        '.lock-icon': {
          top: 'calc(50% - 7px)',
          right: '10px'
        },
        '.valid-icon': {
          top: 'calc(50% - 8px)',
          right: '0px'
        },
        '.error-icon': {
          top: 'calc(50% - 8px)',
          right: '0px'
        },
        '.card-icon': {
          top: 'calc(50% - 10px)',
          left: '10px',
          display: 'none'
        },
        '.is-empty .card-icon': {
          display: 'block'
        },
        '.is-focused .card-icon': {
          display: 'none'
        },
        '.card-type-icon': {
          right: '20px',
          display: 'block'
        },
        '.card-type-icon.visa': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.mastercard': {
          top: 'calc(50% - 14.5px)'
        },
        '.card-type-icon.amex': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.discover': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.jcb': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.dankort': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.cartebleue': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.diners': {
          top: 'calc(50% - 14px)'
        },
        '.card-type-icon.elo': {
          top: 'calc(50% - 14px)'
        }
      }
    );

    setTimeout(() => {
      // this.component.mount('#card-element');
      // let iframe = this.component.iframe;
      // iframe = iframe;
      // console.log(iframe);
      this._tcSelect.componente = this.component;
      // console.log(iframe.contentWindow.document);
      // iframe.getElementById('#card-number').value = (this._tcSelect.noTC);
      // iframe.getElementById('#card-security-code').value = (this._tcSelect.cvvTC);
      // iframe.getElementById('#card-expiration-date').value = (this._tcSelect.exp_dateTC);
    }, 1000);

  }
  @Output()
  get tcData(): EventEmitter<MetodoPago> {
    this._tcData.emit(this._tcSelect);
    return this._tcData;
  }
  get tcSelect(): MetodoPago {
    return this._tcSelect;
  }
  @Input()
  set tcSelect(value: MetodoPago) {
    if (value) {
      // const cvv = this.encript.desencriptar(value.cvvTC);
      // value.cvvTC = (value.cvvTC && value.cvvTC.length > 1) ?
      //   ((cvv && cvv.length >= 0) ? cvv : value.cvvTC) : '';
      // const numeroTC = this.encript.desencriptar(value.numeroTC);
      // value.numeroTC = (value.numeroTC && value.numeroTC.length > 1) ?
      //   ((numeroTC && numeroTC.length >= 0) ? numeroTC : value.numeroTC) : '';
      // const expyearTC = this.encript.desencriptar(value.exp_yearTC);
      // value.exp_yearTC = (value.exp_yearTC && value.exp_yearTC.length > 1) ?
      //   ((expyearTC && expyearTC.length >= 0) ? expyearTC : value.exp_yearTC) : '';
      // const expmontTC = this.encript.desencriptar(value.exp_montTC);
      // value.exp_montTC = (value.exp_montTC && value.exp_montTC.length > 1) ?
      //   (expmontTC && expmontTC.length >= 0) ? expmontTC : value.exp_montTC : '';
      // const expdateTC = this.encript.desencriptar(value.exp_dateTC);
      // value.exp_dateTC = (value.exp_dateTC && value.exp_dateTC.length > 1) ?
      //   ((expdateTC && expdateTC.length >= 0) ? expdateTC : value.exp_dateTC) : '';
      // value.cvvTC = this.encript.desencriptar(value.cvvTC);
      this._tcSelect = value;
    }
  }


  @Input()
  set pasarela(value: Pasarela) {
    this._pasarela = value;
    if (value.nombre === '2CO') {
      this.init2CO();
    } else {
      $('#two-co-iframe').remove();
      if (this.component) {
        this.component = null;
      }
    }
  }
  get pasarela(): Pasarela {
    return this._pasarela;
  }
}

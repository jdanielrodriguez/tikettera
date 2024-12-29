import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { MetodoPago, Perfil } from '../../interfaces';
import { Sesion } from '../../common/sesion';
import { Constantes } from '../../common/constant';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();
  frente: boolean = false;
  isCollapsed: boolean = true;
  expDate: { months: string[], years: string[] } = { months: [], years: [] };
  listaEmit: EventEmitter<MetodoPago[]> = new EventEmitter<MetodoPago[]>();
  perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  lista: MetodoPago[] = [];
  listaEliminar: MetodoPago[] = [];
  metodoPagoForm!: FormGroup;
  @Output() obtenerPerfil: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  emitirPerfil(): void {
    this.perfilEmit.emit(this.perfil);
  }

  constructor(
    private metodoPagoService: MetodoPagoService,
    private fb: FormBuilder,
    private mySesion: Sesion,
    private constantes: Constantes
  ) { }

  ngOnInit(): void {
    this.listaEliminar = [];
    this.inicializarFormulario();
    this.iniciarCombos();
    this.cargarMetodosPago();
  }

  inicializarFormulario(): void {
    this.metodoPagoForm = this.fb.group({
      id: [null],
      card_number: ['', [Validators.required, Validators.pattern(/\d{4} \d{4} \d{4} \d{4}/)]],
      exp_montTC: ['', [Validators.required]],
      exp_yearTC: ['', [Validators.required]],
      card_name: ['', [Validators.required, Validators.minLength(3)]],
      cvv: ['', [Validators.required, Validators.pattern(/\d{3}/)]],
      payment_type_id: [1, [Validators.required]],
      is_default: [false],
    });
  }

  cargarMetodosPago(): void {
    this.metodoPagoService.getAll(this.perfil.id, this.constantes.paymentTypes.credit_card).subscribe({
      next: (data) => {
        this.lista = data.objeto || [];
      },
      error: (err) => console.error('Error al cargar métodos de pago:', err)
    });
  }

  addNew(): void {
    this.isCollapsed = false;
    this.metodoPagoForm.reset({ payment_type_id: 1, is_default: false });
    this.frente = false;
  }

  iniciarCombos(): void {
    this.expDate.months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const currentYear = new Date().getFullYear();
    this.expDate.years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
  }

  agregar(): void {
    if (this.metodoPagoForm.valid) {
      // Obtener los datos del formulario
      const formData = this.metodoPagoForm.value;
      formData.expiration_date = `${formData.exp_montTC}/${formData.exp_yearTC}`;
      this.encriptarDatos(formData);

      const mappedData = {
        user_id: this.perfil.id,
        payment_type_id: formData.payment_type_id || 1,
        card_number: formData.card_number,
        card_name: formData.card_name,
        expiration_date: formData.expiration_date,
        cvv: formData.cvv,
        is_default: formData.is_default || false,
      };

      this.metodoPagoService.create(mappedData).subscribe({
        next: (response) => {
          this.lista.push(response.objeto);
          this.isCollapsed = true;
          this.metodoPagoForm.reset({ payment_type_id: 1, is_default: false });
        },
        error: (err) => console.error('Error al agregar método de pago:', err),
      });
    } else {
      this.metodoPagoForm.markAllAsTouched();
    }
  }

  encriptarDatos(formData: any): void {
    formData.card_number = this.mySesion.encriptar(formData.card_number);
    formData.cvv = this.mySesion.encriptar(formData.cvv);
    formData.exp_montTC = this.mySesion.encriptar(formData.exp_montTC);
    formData.exp_yearTC = this.mySesion.encriptar(formData.exp_yearTC);
    formData.expiration_date = this.mySesion.encriptar(formData.expiration_date);
  }

  formatCardNumber(): void {
    const control = this.metodoPagoForm.get('card_number');
    if (control) {
      const rawValue = control.value.replace(/\s+/g, '');
      const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      control.setValue(formattedValue, { emitEvent: false });
    }
  }

  girarTarjeta(value?: boolean): void {
    this.frente = value !== undefined ? value : !this.frente;
  }

  marcarDefault(metodo: MetodoPago): void {
    const payload = {
      user_id: this.perfil.id, // Extraer el ID del perfil del usuario
    };

    this.metodoPagoService.setDefault(Number(metodo.id), payload).subscribe({
      next: () => {
        this.lista.forEach((metodo) => (metodo.is_default = false));
        metodo.is_default = true;
      },
      error: (err) => console.error('Error al marcar como predeterminado:', err),
    });
  }

  seleccionar(metodo: MetodoPago, event: MouseEvent): void {
    event.stopPropagation();
    this.isCollapsed = false;
    this.metodoPagoForm.patchValue({
      card_number: this.mySesion.desencriptar(metodo.card_number || ''),
      exp_montTC: this.mySesion.desencriptar(metodo.exp_montTC || ''),
      exp_yearTC: this.mySesion.desencriptar(metodo.exp_yearTC || ''),
      card_name: metodo.card_name,
      cvv: this.mySesion.desencriptar(metodo.cvv || ''),
      id: metodo.id,
      is_default: metodo.is_default,
    });
  }

  desencripta(value: string | undefined): string {
    return this.mySesion.desencriptar(value || '') || '';
  }

  eliminarMetodo(metodo: MetodoPago, index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el método de pago seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.metodoPagoService.delete(Number(metodo.id), this.perfil.id || 0).subscribe({
          next: () => {
            this.lista.splice(index, 1);
          },
          error: (err) => console.error('Error al eliminar método de pago:', err)
        });
      }
    });
  }
  mostrarEtiqueta(cardNumber: string): string {
    const desencriptado = this.mySesion.desencriptar(cardNumber);
    return desencriptado ? `**** **** **** ${desencriptado.slice(-4)}` : 'Número no disponible';
  }
}

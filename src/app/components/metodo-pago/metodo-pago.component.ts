import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormasPagoService } from "../../services/formas-pago.service";
import { MetodoPago, Perfil } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';

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
  metodoPagoForm!: FormGroup; // Declaración de la propiedad

  constructor(
    private mainService: FormasPagoService,
    private fb: FormBuilder,
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.listaEliminar = [];
    this.inicializarFormulario(); // Inicializa el formulario reactivo
    this.iniciarCombos();
  }

  inicializarFormulario(): void {
    this.metodoPagoForm = this.fb.group({
      id: [null],
      numeroTC: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      exp_montTC: ['', [Validators.required]],
      exp_yearTC: ['', [Validators.required]],
      nombreTC: ['', [Validators.required, Validators.minLength(3)]],
      cvvTC: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  addNew(): void {
    this.isCollapsed = false;
    this.metodoPagoForm.reset(); // Resetea el formulario para un nuevo ingreso
    this.frente = false;
  }


  iniciarCombos(): void {
    this.expDate.months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const currentYear = new Date().getFullYear();
    this.expDate.years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
    const yearActual = new Date().getFullYear();
    const currentMonth = `${new Date().getMonth() + 1}`.padStart(2, '0');

    this.metodoPagoForm?.patchValue({
      exp_yearTC: yearActual.toString(),
      exp_montTC: currentMonth,
    });

  }
  girarTarjeta(value?: boolean): void {
    this.frente = value !== undefined ? value : !this.frente;
  }

  async guardar() {
    let dat = {
      formasPago: this.mySesion.encriptar(JSON.stringify(this.lista)),
      aEliminar: this.mySesion.encriptar(JSON.stringify(this.listaEliminar)),
      usuario: this.mySesion.encriptar(JSON.stringify(this.perfil))
    }
    this.mySesion.loadingStart();
    await this.mainService.create(dat)
      .then((element: { status: number, objeto: MetodoPago[] }) => {
        this.perfil.formas_pago = element.objeto
        this.perfilEmit.emit(this.perfil);
        this.listaEliminar = [];
        this.isCollapsed = true
        this.mySesion.loadingStop();
      })
      .catch(error => {
        this.mySesion.loadingStop();
        if (error.indexOf('401') >= 0) {
          alert("Su sesion ha vencido");
          this.mySesion.navegar({ url: '../../../../../logout' })
        }
        console.log(error);
      })
  }
  marcarDefault(alert: MetodoPago, event: MouseEvent): void {
    event.stopPropagation(); // Evita abrir el formulario al hacer clic en el botón
    this.lista.forEach((metodo) => metodo.default = 0); // Resetea los predeterminados
    alert.default = 1; // Marca el método actual como predeterminado
  }
  seleccionar(alert: MetodoPago, event: MouseEvent): void {
    event.stopPropagation(); // Evita colapsar la lista al hacer clic
    this.isCollapsed = false; // Abre el formulario
    this.metodoPagoForm.patchValue({
      numeroTC: alert.numeroTC,
      exp_montTC: this.desencripta(alert.exp_montTC),
      exp_yearTC: this.desencripta(alert.exp_yearTC),
      nombreTC: alert.nombreTC,
      cvvTC: this.desencripta(alert.cvvTC),
      id: alert.id // Si tiene un ID, lo asigna
    });
  }

  agregar(): void {
    if (this.metodoPagoForm.valid) {
      const formData = this.metodoPagoForm.value;

      formData.nombre = "XXXX XXXX XXXX " + formData.numeroTC.slice(-4);
      formData.exp_dateTC = this.mySesion.encriptar(
        `${formData.exp_montTC}/${formData.exp_yearTC}`
      );
      formData.exp_yearTC = this.mySesion.encriptar(formData.exp_yearTC);
      formData.exp_montTC = this.mySesion.encriptar(formData.exp_montTC);
      formData.numeroTC = this.mySesion.encriptar(formData.numeroTC);
      formData.cvvTC = this.mySesion.encriptar(formData.cvvTC);

      if (formData.id) {
        const index = this.lista.findIndex(card => card.id === formData.id);
        if (index >= 0) this.lista[index] = formData;
      } else {
        this.lista.push(formData);
      }

      this.isCollapsed = true;
      this.guardar();
    } else {
      this.metodoPagoForm.markAllAsTouched();
    }
  }
  desencripta(value: any): string {
    let dat = this.mySesion.desencriptar(value)
    return dat ? dat : ''
  }
  eliminarMetodo(alert: MetodoPago, index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el método de pago seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lista.splice(index, 1); // Elimina el método de la lista
        this.listaEliminar.push(alert); // Agrega a la lista de métodos para eliminar
      }
    });
  }

  formatCardNumber(): void {
    const control = this.metodoPagoForm.get('numeroTC');
    if (control) {
      const rawValue = control.value.replace(/\s+/g, ''); // Elimina espacios
      const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Agrega espacio cada 4 dígitos
      control.setValue(formattedValue, { emitEvent: false }); // Actualiza sin disparar eventos
    }
  }
  @Output()
  get form(): EventEmitter<MetodoPago[]> {
    this.listaEmit.emit(this.lista);
    return this.listaEmit;
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this.perfilEmit.emit(this.perfil);
    return this.perfilEmit;
  }
}

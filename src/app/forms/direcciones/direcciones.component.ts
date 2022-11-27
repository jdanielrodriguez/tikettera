import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { DireccionesService } from './../../services/direcciones.service';
import { Perfil, Direccion } from 'src/app/interfaces';
import { Sesion } from 'src/app/metodos';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: []
})
export class DireccionesComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _perfil: Perfil = new Perfil();
  today: any;
  private _isCollapsed = true;
  nacimientoToday: any;
  private _listaEmit: EventEmitter<Direccion[]> = new EventEmitter<Direccion[]>();
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _lista: Direccion[] = [];
  private _listaEliminar: Direccion[] = [];
  private _data: Direccion = new Direccion();
  constructor(
    private mainService: DireccionesService,
    private encrypt: Sesion
  ) { }
  ngOnInit(): void {
    this._listaEliminar = [];
  }
  cargar() {
    this._listaEmit.emit(this.lista);
  }
  addNew() {
    this.isCollapsed = false;
    this._data = new Direccion();
  }
  guardar() {
    const dat = {
      direcciones: this.encrypt.encriptar(JSON.stringify(this._lista)),
      aEliminar: this.encrypt.encriptar(JSON.stringify(this._listaEliminar)),
      usuario: this.encrypt.encriptar(JSON.stringify(this.perfil))
    };
    this.blockUI.start();
    this.mainService.create(dat)
      .then((element: { status: number, objeto: Direccion[] }) => {
        this._perfil.direcciones = element.objeto;
        this._perfilEmit.emit(this._perfil);
        this._listaEliminar = [];
        this._isCollapsed = true;
        this.blockUI.stop();
      })
      .catch(error => {
        this.blockUI.stop();
        if (error.indexOf('401') >= 0) {
          alert('Su sesion ha vencido');
          this.encrypt.navegar({ url: '../../../../../logout' });
        }
      });
  }
  async marcarDefault(data: Direccion, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    // await this._perfil.direcciones.forEach((element: Direccion) => {
    //   if (element.id === data.id) {
    //     element.default = element.default === 1 ? 0 : 1;
    //   } else {
    //     element.default = 0;
    //   }
    // });
    this._perfilEmit.emit(this._perfil);
  }
  seleccionar(data: Direccion, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    this._data = data;
    this._isCollapsed = false;
  }
  agregar(form: any) {
    form.value.direccion_envio = this.direccionEnvio;
    if (form.value.id) {
      const index = this._lista.findIndex((element: Direccion) => {
        return element.id === form.value.id;
      });
      if (index >= 0) {
        // this.perfil.direcciones[index] = form.value;
      }
    } else {
      if (this.perfil.direcciones) {
        this.perfil.direcciones.push(form.value);
      } else {
        this.perfil.direcciones = [];
        this.perfil.direcciones.push(form.value);
      }
    }
    // this._lista = this.perfil.direcciones;
    this._perfilEmit.emit(this.perfil);
    this._listaEmit.emit(this.lista);
    this._isCollapsed = true;
    this.guardar();
  }
  handleRefusal(value: any) {
    console.log(value);
  }
  close(form: Direccion) {
    Swal.fire({
      title: 'Cuidado',
      text: 'Se eliminara la Direccion seleccionada',
      icon: 'warning',
      confirmButtonText: 'Esta bien, Eliminar'
    }).then((result) => {
      if (result.value) {
        // const index = this._perfil.direcciones.findIndex((element: Direccion) => {
        //   return element.id === form.id;
        // });
        // this._perfil.direcciones.splice(index, 1);
        this._perfilEmit.emit(this.perfil);
        this._listaEliminar.push(form);
      }
    });
  }
  @Output()
  get form(): EventEmitter<Direccion[]> {
    this._listaEmit.emit(this.lista);
    return this._listaEmit;
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this._perfilEmit.emit(this.perfil);
    return this._perfilEmit;
  }
  get lista(): Direccion[] {
    return this._lista;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
    if (this._perfil.direcciones && this._perfil.direcciones.length > 0) {
      this._lista = this._perfil.direcciones;
    }
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  get data(): Direccion {
    return this._data;
  }
  get direccionEnvio(): string {
    return '' + this.data.calle + ' ' + this.data.casa + ' ' + this.data.zona + ' ' + this.data.pais + '';
  }
  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }
  get isCollapsed(): boolean {
    return this._isCollapsed;
  }
}

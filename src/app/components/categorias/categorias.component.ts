import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Inventario, Menus, TipoItem } from 'src/app/interfaces';
import { Formatos, Sesion } from '../../metodos';
@Component({
  selector: 'app-edicion-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: [],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class CategoriasComponent implements OnInit {
  constructor(
    private formatear: Formatos,
    private mySesion: Sesion,
    private _service: NotificationsService,
  ) { }
  @Input()
  set producto(value: Inventario) {
    this._producto = value;
  }
  get producto(): Inventario {
    return this._producto;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  get today() {
    return new Date();
  }

  @Output()
  get guardar(): EventEmitter<TipoItem> {
    this._tipoItemEm.emit(this._producto);
    return this._tipoItemEm;
  }
  private _tipoItemEm: EventEmitter<TipoItem> = new EventEmitter<TipoItem>();
  private _producto: TipoItem = new TipoItem();
  private _titulo = '';
  @BlockUI() blockUI!: NgBlockUI;
  positions: any;

  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  ngOnInit() {
  }
  update(form: any) {
    if (form.value.nombre !== '') {
      form.value.nombre = this.formatear.getCleanedString(form.value.nombre);
      this._producto = form.value;
      this._tipoItemEm.emit(this._producto);
    } else {
      this.createError('Debe ingresar un nombre Valido');
    }
  }
  navegar(data: Menus, id?: number) {
    this.mySesion.navegar(data, id);
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}

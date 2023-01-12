import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Imagen } from '../../interfaces';
import { NotificationsService } from 'angular2-notifications';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    private config: NgbProgressbarConfig
  ) {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }
  @Input()
  set carpeta(value: string) {
    this._carpeta = value;
  }
  get carpeta(): string {
    return this._carpeta;
  }
  @Input()
  set lista(value: Imagen[]) {
    this._lista = value;
  }
  get lista(): Imagen[] {
    return this._lista;
  }
  set mostrarProgreso(value: boolean) {
    this._mostrarProgreso = value;
  }
  get mostrarProgreso(): boolean {
    return this._mostrarProgreso;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  set avance(value: number) {
    this._avance = value;
  }
  get avance(): number {
    return this._avance;
  }
  @Output()
  get imagenPrincipal(): EventEmitter<Imagen> {
    this._imagenPrincipal.emit(this._imagen);
    return this._imagenPrincipal;
  }
  @Output()
  get imagenEliminar(): EventEmitter<Imagen> {
    this._imagenEliminar.emit(this._imagenElimina);
    return this._imagenEliminar;
  }
  get imagen(): Imagen {
    return this._imagen;
  }
  @BlockUI() blockUI!: NgBlockUI;
  private _imagenPrincipal: EventEmitter<Imagen> = new EventEmitter<Imagen>();
  private _imagenEliminar: EventEmitter<Imagen> = new EventEmitter<Imagen>();
  private _lista: Imagen[] = [];
  private _imagen: Imagen = new Imagen();
  private _imagenElimina!: Imagen;
  private _carpeta = '';
  private _avance = 0;
  private _mostrarProgreso = false;
  private _esAdmin = false;
  private basePath: string = environment.url;
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  ngOnInit(): void {
    this._imagenPrincipal.emit(this._imagen);
  }
  subirImagenes(archivo?: any, form?: any, id?: any) {
    const archivos = archivo.srcElement.files;
    const url = `${this.basePath}/api/upload`;
    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    if (size < (3 * (1024 * 1024))) {
      if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
        $('#' + id).upload(url,
          {
            avatar: archivos[i],
            carpeta: this._carpeta
          },
          (respuesta: any) => {
            this._imagen = respuesta.objeto;
            $('#' + id).val('');
            $('.barra_de_progreso').val(0);
            this._avance = 0;
            this._mostrarProgreso = false;
            $('#guardarImagenes').attr('disabled', false);
            $('#stopLoader').click();
            this.blockUI.stop();
            this.createSuccess('Se a subido la imagen Exitosamente!');
          },
          (progreso: any, valor: any) => {
            this._mostrarProgreso = true;
            this._avance = valor;
            $('.barra_de_progreso').val(valor);
          },
          (error: any) => {
            console.log(error);
          }
        );
      } else {
        this.createError('El tipo de imagen no es valido');
        this.blockUI.stop();
      }
    } else {
      this.createError('La imagen es demaciado grande, seleccione una imagen de menos de 3MB');
      this.blockUI.stop();
    }
  }
  eliminarImagen(value: Imagen) {
    this._imagenElimina = value;
    this._imagenEliminar.emit(this._imagenElimina);
  }
  resetImagen() {
    this._imagen = new Imagen();
  }
  enviarImagen() {
    this._imagenPrincipal.emit(this._imagen);
  }
  createSuccess(success: any) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: any) {
    this._service.error('¡Error!', error);
  }
}

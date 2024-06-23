import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NotificationsService } from 'angular2-notifications';
import { ComentariosService } from '../../../services/comentarios.service';
import { Sesion } from '../../../common/sesion';
import { Perfil, Comentario, FilterGET } from '../../../interfaces';
declare var $: any;
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: []
})
export class ComentariosComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    private mySesion: Sesion,
    private mainService: ComentariosService
  ) { }
  get perfilActual(): Perfil {
    return this._perfilActual;
  }
  @Input()
  set perfilActual(value: Perfil) {
    this._perfilActual = value;
  }
  get conversacion(): Comentario[] {
    return this._conversacion;
  }
  set conversacion(value: Comentario[]) {
    this._conversacion = value;
  }
  get usuario(): Perfil {
    return this.mySesion.perfil;
  }
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild('conversationContainer') private conversationContainer!: ElementRef;
  private _perfilActual!: Perfil;
  private _conversacion: Comentario[] = [];
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200,
  };
  ngOnInit(): void {
    this.scrollToBottom();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  obtenerComentarios(value?: any) {
    if (value && value.id) {
      const data: FilterGET = {
        id: this.mySesion.perfil.id,
        filter: 'inventario',
        estado: value.id + '',
      };
      this.blockUI.start();
      this.mainService.getAllFilter(data)
        .then((response: Comentario[]) => {
          if (response.length > 0) {
            response.forEach(element => {
              element.recive = element.usuario === this.mySesion.perfil.id;
            });
            this._conversacion = response;
          }
          this.scrollToBottom();
          this.blockUI.stop();
        }).catch(error => {
          this.blockUI.stop();
        });
    }
  }
  comentar(value?: Comentario) {
    if (value && value.usuario && value.inventario) {
      const data: Comentario = value;
      this.blockUI.start();
      this.mainService.create(data)
        .then((response: Comentario) => {
          response.recive = response.usuario === this.mySesion.perfil.id;
          this._conversacion.push(response);
          this.scrollToBottom();
          this.blockUI.stop();
        }).catch(error => {
          this.blockUI.stop();
          if (error.indexOf('401') >= 0) {
            alert('Su sesion ha vencido');
            this.mySesion.navegar({ url: '../../../../../logout' });
          }
        });
    }
  }
  scrollToBottom(): void {
    try {
      this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
  createWarning(error: string) {
    this._service.warn('¡Cuidado!', error);
  }
}

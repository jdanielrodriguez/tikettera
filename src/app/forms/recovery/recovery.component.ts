import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServices } from "./../../services/auth.service";
import { NotificationsService } from 'angular2-notifications';
import { Perfil, Menus } from "./../../interfaces";
import { Sesion } from "./../../metodos";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { Modal } from "./../modal.component";
declare var $: any
@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit, OnDestroy {
  @ViewChild(Modal) recoveryModal!: Modal
  @BlockUI() blockUI!: NgBlockUI;
  private _component: EventEmitter<string> = new EventEmitter<string>();
  private _componentStr!: string
  private _data: Perfil = new Perfil();
  private _esModal: boolean = false;
  private _muestraTexto: boolean = false;
  private _dinamicLink: string = "";
  private _titulo: string = "";
  constructor(
    private router: Router,
    private mainService: AuthServices,
    private modalService: NgbModal,
    private mySesion: Sesion,
    private config: NgbModalConfig,
    private _service: NotificationsService,
    private localSt: LocalStorageService,
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
    config.size = 'lg'
  }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
    if (this.esModal) {
      let temp = Modal
      if (this.titulo) {
        if (this.recoveryModal) {
          this.recoveryModal.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo
      this.modalService.open(temp);
    }
    setTimeout(() => {
      $(".grecaptcha-badge").removeClass("visible");
      $(".grecaptcha-badge").addClass("visible");
    }, 1000);
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    if (this.modalService.hasOpenModals()) {
      this._componentStr = data.url
      this._component.emit(this._componentStr);
    } else {
      this.router.navigate([`${data.url}`])
    }
  }
  async recovery() {
    let token = await this.mySesion.validateCaptcha('recovery');
    let Fresponse: { status: number, objeto: any }
    if (token) {
      let dat = {
        token: btoa(token)
      }
      this.blockUI.start();
      await this.mainService.validarCaptcha(dat)
        .then(async (response: { status: number, objeto: any }) => {
          Fresponse = response
          this.blockUI.stop();
          if (Fresponse && Fresponse.objeto.success) {
            this.blockUI.start();
            // if (this.data.username.length > 0) {
            //   let dat: any = {
            //     username: btoa(this.data.username),
            //     url: btoa("http://www.ordenes.online/" + (this.myProveedor.provs ? this.myProveedor.provs.nombre + "/" : "") + "inicio"),
            //     empresa: btoa(this.myProveedor.provs ? this.myProveedor.provs.nombre : "Ordenes Online"),
            //     nombre: btoa(this.myProveedor.provs ? this.myProveedor.provs.nombre : "Ordenes Online")
            //   }
            //   await this.mainService.recovery(dat)
            //     .then((response: { status: number, objeto: any }) => {
            //       if (response.status == 200) {
            //         $(".grecaptcha-badge").removeClass("visible");
            //         let url = "./" + (this.myProveedor.provs ? this.myProveedor.provs.nombre + "/" : "inicio")
            //         if (this.mySesion.lastLink) {
            //           let urls = this.mySesion.lastLink
            //           url = urls
            //         }
            //         this.router.navigate([url])
            //         this.blockUI.stop();
            //       }
            //     })
            //     .catch(exception => {
            //       console.log(exception);
            //       if (exception.status && exception.status == 400) {
            //         this.createError("No se encuentra el usuario ingresado")
            //       } else {
            //         this.createError("No se encuentra el usuario ingresado")
            //       }
            //       this.blockUI.stop();
            //     })
            // }
          }
        }).catch(error => {
          console.log(error);
        })
    } else {
      token = await this.mySesion.validateCaptcha('recovery');
      this.recovery()
    }

  }
  closeModal() {
    this.modalService.dismissAll();
  }
  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success)
  }
  createError(error: string) {
    this._service.error('¡Error!', error)
  }
  @Input()
  set esModal(value: boolean) {
    this._esModal = value
  }
  get esModal(): boolean {
    return this._esModal;
  }
  @Input()
  set muestraTexto(value: boolean) {
    this._muestraTexto = value
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value
  }
  get titulo(): string {
    return this._titulo;
  }
  set data(value: Perfil) {
    this._data = value
  }
  get data(): Perfil {
    return this._data;
  }
  @Input()
  set dinamicLink(value: string) {
    if (value) {
      this.mySesion.lastLink = value
    }
    this._dinamicLink = value
  }
  @Output()
  get component(): EventEmitter<string> {
    this._component.emit(this._componentStr);
    return this._component;
  }
  get componentStr(): string {
    return this._componentStr;
  }
  public ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }

}

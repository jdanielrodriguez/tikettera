import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthServices } from './../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { ChangePasswordForm } from './../../interfaces';
import { Sesion } from './../../metodos';
import { ChangePassFormulario } from './change-pass-form.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: [],
})
export class ChangePassComponent implements OnInit {
  constructor(
    private AuthService: AuthServices,
    private _service: NotificationsService,
    private config: NgbModalConfig,
    private mySesion: Sesion,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }
  @Input()
  set esModal(value: boolean) {
    this._esModal = value;
  }
  get esModal(): boolean {
    return this._esModal;
  }
  @Input()
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(ChangePassFormulario) changePassForm!: ChangePassFormulario;
  private _esModal = false;
  private _muestraTexto = false;
  private _titulo = '';
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  open(content: any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    if (this.esModal) {
      const temp = ChangePassFormulario;
      if (this.titulo) {
        if (this.changePassForm) {
          this.changePassForm.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo;
      this.modalService.open(temp);
    }
  }
  changePass(formValue: ChangePasswordForm, form: any) {
    this.mySesion.validarSesion();
    formValue.perfil = this.mySesion.perfil;
    formValue.id = this.mySesion.perfil.id;
    // formValue.new_pass_rep = btoa(formValue.new_pass_rep);
    // formValue.new_pass = btoa(formValue.new_pass);
    // formValue.old_pass = btoa(formValue.old_pass);
    this.blockUI.start();
    this.AuthService.updatePass(formValue)
      .then((response: { estado: number }) => {
        if (response.estado === 1) {
          // formValue.perfil.estado = response.estado;
          this.mySesion.actualizaPerfil(formValue.perfil);
          this.createSuccess('Su Clave fue Cambiada');
          this.blockUI.stop();
          this.closeModal();
          formValue.new_pass = '';
          formValue.new_pass_rep = '';
          formValue.old_pass = '';
          form.reset();
        }
      })
      .catch(error => {
        console.log(formValue);
        this.createError(error);
        this.blockUI.stop();
      });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }

}

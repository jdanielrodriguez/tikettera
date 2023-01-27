import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordForm } from '../../interfaces';
import { Sesion } from '../../metodos';
import { AuthServices } from '../../services/auth.service';
import { ChangePassFormulario } from './change-pass-form.component';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: [],
})
export class ChangePassComponent implements OnInit {
  constructor(
    private AuthService: AuthServices,
    private config: NgbModalConfig,
    private mySesion: Sesion,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }
  @ViewChild(ChangePassFormulario) changePassForm!: ChangePassFormulario;
  @Input() esModal = false;
  @Input() muestraTexto = false;
  @Input() titulo = '';
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
    this.mySesion.loadingStart();
    const authServ = this.AuthService.updatePass(formValue)
      .subscribe({
        next: (response: { estado: number }) => {
          if (response.estado === 1) {
            // formValue.perfil.estado = response.estado;
            this.mySesion.actualizaPerfil(formValue.perfil);
            this.mySesion.createSuccess('Su Clave fue Cambiada');
            this.mySesion.loadingStop();
            this.closeModal();
            formValue.new_pass = '';
            formValue.new_pass_rep = '';
            formValue.old_pass = '';
            form.reset();
          }
        },
        error: error => {
          console.log(formValue);
          this.mySesion.createError(error);
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';
import { ComponentesModule } from '../components/componentes.module';

import { ClienteComponent } from './cliente/cliente.component';
import { CorreosComponent } from './correos/correos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { LoginFormComponent } from './login/login.component';
import { MetodoPagoFormComponent } from './metodo-pago-form/metodo-pago-form.component';
import { Modal } from './modal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { SlidersFormComponent } from './sliders-form/sliders-form.component';
import { EventFormComponent } from './event-form/event-form.component';
const modules = [
  LoginFormComponent,
  Modal,
  RegisterComponent,
  RecoveryComponent,
  ClienteComponent,
  ProveedorComponent,
  PerfilComponent,
  CorreosComponent,
  EncabezadoComponent,
  MetodoPagoFormComponent,
  SlidersFormComponent,
  EventFormComponent,
]
@NgModule({
  declarations: modules,
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    ColorPickerModule,
    ComponentesModule,
    SweetAlert2Module.forRoot(),
    NgxWebstorageModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbDropdownModule,
    RouterModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: modules
})
export class FormModule { }

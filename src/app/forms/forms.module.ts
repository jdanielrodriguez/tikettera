import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BlockUIModule } from 'ng-block-ui';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { Modal } from './modal.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CorreosComponent } from './correos/correos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { MetodoPagoFormComponent } from './metodo-pago-form/metodo-pago-form.component';
import { SlidersFormComponent } from './sliders-form/sliders-form.component';

import { NumTCPipe } from '../pipes/num-tc.pipe';
import { JustTextPipe } from '../pipes/just-text.pipe';
import { CvvTCPipe } from '../pipes/cvv-tc.pipe';

import { environment } from '../../environments/environment';
@NgModule({
  declarations: [
    LoginFormComponent,
    Modal,
    RegisterComponent,
    RecoveryComponent,
    ClienteComponent,
    ProveedorComponent,
    NumTCPipe,
    JustTextPipe,
    CvvTCPipe,
    DireccionesComponent,
    PerfilComponent,
    CorreosComponent,
    EncabezadoComponent,
    MetodoPagoFormComponent,
    SlidersFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    ColorPickerModule,
    SweetAlert2Module.forRoot(),
    NgxWebstorageModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbDropdownModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [
    LoginFormComponent,
    Modal,
    RegisterComponent,
    RecoveryComponent,
    ClienteComponent,
    ProveedorComponent,
    DireccionesComponent,
    PerfilComponent,
    CorreosComponent,
    EncabezadoComponent,
    MetodoPagoFormComponent,
    SlidersFormComponent,
  ]
})
export class FormModule { }

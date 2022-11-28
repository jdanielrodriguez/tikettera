import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavComponent } from './nav/nav.component';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BlockUIModule } from 'ng-block-ui';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { GaleriaComponent } from './galeria/galeria.component';
import { SlidersComponent } from './sliders/sliders.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { FormularioComponent } from './metodo-pago/formulario/formulario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PerfilViewComponent } from './perfil-view/perfil-view.component';
import { ColorBackgroundComponent } from './color-background/color-background.component';
import { ChatComponent } from './chat/chat.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';

import { NumTCPipe } from '../pipes/num-tc.pipe';
import { JustTextPipe } from '../pipes/just-text.pipe';
import { CvvTCPipe } from '../pipes/cvv-tc.pipe';

import { environment } from '../../environments/environment';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { AddComentarioComponent } from './comentarios/add-comentario/add-comentario.component';
import { ReaccionesComponent } from './reacciones/reacciones.component';
import { SendComponent } from './chat/send/send.component';
import { HistorialComponent } from './caja/transacciones/historial/historial.component';
import { RetiroComponent } from './caja/transacciones/retiro/retiro.component';
import { TransferenciaComponent } from './caja/transacciones/transferencia/transferencia.component';
import { CajaComponent } from './caja/caja.component';
import { ViewHistorialComponent } from './caja/transacciones/historial/view/view.component';
import { ViewRetiroComponent } from './caja/transacciones/retiro/view/view.component';
import { PreciosComponent } from './precios/precios.component';
@NgModule({
  declarations: [
    NavComponent,
    GaleriaComponent,
    SlidersComponent,
    FooterComponent,
    LogoutComponent,
    MetodoPagoComponent,
    FormularioComponent,
    NumTCPipe,
    JustTextPipe,
    CvvTCPipe,
    ConfiguracionComponent,
    PerfilViewComponent,
    ColorBackgroundComponent,
    TarjetaComponent,
    ChatComponent,
    ComentariosComponent,
    AddComentarioComponent,
    ReaccionesComponent,
    SendComponent,
    HistorialComponent,
    RetiroComponent,
    TransferenciaComponent,
    CajaComponent,
    ViewHistorialComponent,
    ViewRetiroComponent,
    PreciosComponent,
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
    NavComponent,
    GaleriaComponent,
    SlidersComponent,
    FooterComponent,
    LogoutComponent,
    MetodoPagoComponent,
    ConfiguracionComponent,
    PerfilViewComponent,
    ColorBackgroundComponent,
    TarjetaComponent,
    ChatComponent,
    ComentariosComponent,
    AddComentarioComponent,
    ReaccionesComponent,
    SendComponent,
    HistorialComponent,
    RetiroComponent,
    TransferenciaComponent,
    CajaComponent,
    ViewHistorialComponent,
    ViewRetiroComponent,
    PreciosComponent,
  ]
})
export class ComponentesModule { }

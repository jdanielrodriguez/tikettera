import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavComponent } from './nav/nav.component';

import { NgbAccordionModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';

import { ChangePassFormulario } from './change-pass/change-pass-form.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChatComponent } from './chat/chat.component';
import { ColorBackgroundComponent } from './color-background/color-background.component';
import { FooterComponent } from './footer/footer.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LogoutComponent } from './logout/logout.component';
import { FormularioComponent } from './metodo-pago/formulario/formulario.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { PerfilViewComponent } from './perfil-view/perfil-view.component';
import { SlidersComponent } from './sliders/sliders.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';

import { CvvTCPipe } from '../pipes/cvv-tc.pipe';
import { JustTextPipe } from '../pipes/just-text.pipe';
import { NumTCPipe } from '../pipes/num-tc.pipe';

import { AccordeonComponent } from './accordeon/accordeon.component';
import { CajaComponent } from './caja/caja.component';
import { HistorialComponent } from './caja/transacciones/historial/historial.component';
import { ViewHistorialComponent } from './caja/transacciones/historial/view/view.component';
import { RetiroComponent } from './caja/transacciones/retiro/retiro.component';
import { ViewRetiroComponent } from './caja/transacciones/retiro/view/view.component';
import { TransferenciaComponent } from './caja/transacciones/transferencia/transferencia.component';
import { CardsComponent } from './cards/cards.component';
import { SendComponent } from './chat/send/send.component';
import { AddComentarioComponent } from './comentarios/add-comentario/add-comentario.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { PreciosComponent } from './precios/precios.component';
import { ReaccionesComponent } from './reacciones/reacciones.component';
import { BusquedaComponent } from './search/busqueda.component';

const modules = [
  BusquedaComponent,
  NavComponent,
  GaleriaComponent,
  SlidersComponent,
  FooterComponent,
  LogoutComponent,
  MetodoPagoComponent,
  FormularioComponent,
  NumTCPipe,
  ImagenesComponent,
  JustTextPipe,
  ChangePassComponent,
  ChangePassFormulario,
  CvvTCPipe,
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
  CardsComponent,
  AccordeonComponent,
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
    SweetAlert2Module.forRoot(),
    NgxWebstorageModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbDropdownModule,
    NgbAccordionModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: modules
})
export class ComponentesModule { }

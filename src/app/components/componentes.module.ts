import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavComponent } from './nav/nav.component';

import { NgbAccordionModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';

import { CalendarComponent } from './calendar/calendar.component';
import { ChangePassFormulario } from './pages/change-pass/change-pass-form.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ColorBackgroundComponent } from './color-background/color-background.component';
import { FooterComponent } from './footer/footer.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { PerfilViewComponent } from './pages/perfil-view/perfil-view.component';
import { SlidersComponent } from './sliders/sliders.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';

import { CvvTCPipe } from '../pipes/cvv-tc.pipe';
import { JustTextPipe } from '../pipes/just-text.pipe';
import { NumTCPipe } from '../pipes/num-tc.pipe';

import { AccordeonComponent } from './accordeon/accordeon.component';
import { CajaComponent } from './pages/caja/caja.component';
import { HistorialComponent } from './pages/caja/transacciones/historial/historial.component';
import { ViewHistorialComponent } from './pages/caja/transacciones/historial/view/view.component';
import { RetiroComponent } from './pages/caja/transacciones/retiro/retiro.component';
import { ViewRetiroComponent } from './pages/caja/transacciones/retiro/view/view.component';
import { TransferenciaComponent } from './pages/caja/transacciones/transferencia/transferencia.component';
import { CardsComponent } from './cards/cards.component';
import { SendComponent } from './pages/chat/send/send.component';
import { AddComentarioComponent } from './pages/comentarios/add-comentario/add-comentario.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { PlacesComponent } from './pages/places/places.component';
import { ReaccionesComponent } from './pages/reacciones/reacciones.component';
import { BusquedaComponent } from './search/busqueda.component';

// Steppers
import { StepperComponent } from './pages/stepper/stepper.component';
import { StepperPlacesComponent } from './pages/stepper/places/places.component';
import { StepperBoletosComponent } from './pages/stepper/boletos/boletos.component';
import { StepperDetalleCompraComponent } from './pages/stepper/detalle-compra/detalle-compra.component';

const modules = [
  BusquedaComponent,
  NavComponent,
  GaleriaComponent,
  SlidersComponent,
  FooterComponent,
  LogoutComponent,
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
  PlacesComponent,
  CardsComponent,
  AccordeonComponent,
  CalendarComponent,
  OrderSummaryComponent,
  StepperComponent,
  StepperPlacesComponent,
  StepperBoletosComponent,
  StepperDetalleCompraComponent
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
    ReactiveFormsModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: modules
})
export class ComponentesModule { }

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
import { ChangePassFormulario } from './change-pass/change-pass-form.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChatComponent } from './chat/chat.component';
import { ColorBackgroundComponent } from './color-background/color-background.component';
import { FooterComponent } from './footer/footer.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SlidersComponent } from './sliders/sliders.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';

import { LoginFormComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

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
import { PreciosComponent } from './precios/precios.component';
import { PlacesComponent } from './places/places.component';
import { BusquedaComponent } from './search/busqueda.component';
import { AdvertisementsFormComponent } from './advertisements/advertisements.component';

import { CorreosComponent } from './correos/correos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { EventsManagementComponent } from './events-management/events-management.component';
import { EventsComponent } from './events-management/events/events.component';

// Steppers
import { StepperComponent } from './stepper/stepper.component';
import { StepperPlacesComponent } from './stepper/places/places.component';
import { StepperBoletosComponent } from './stepper/boletos/boletos.component';
import { StepperDetalleCompraComponent } from './stepper/detalle-compra/detalle-compra.component';

import { Modal } from './modal.component';

const modules = [
  CorreosComponent,
  EncabezadoComponent,
  EventsComponent,
  EventsManagementComponent,
  AdvertisementsFormComponent,
  BusquedaComponent,
  NavComponent,
  GaleriaComponent,
  SlidersComponent,
  FooterComponent,
  LogoutComponent,
  LoginFormComponent,
  RecoveryComponent,
  RegisterComponent,
  NumTCPipe,
  ImagenesComponent,
  JustTextPipe,
  ChangePassComponent,
  ChangePassFormulario,
  CvvTCPipe,
  PerfilComponent,
  ColorBackgroundComponent,
  TarjetaComponent,
  MetodoPagoComponent,
  ChatComponent,
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
  StepperDetalleCompraComponent,
  Modal
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

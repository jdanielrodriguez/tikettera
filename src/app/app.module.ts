import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './components/componentes.module';
import { FormModule } from './forms/forms.module';
import { LoginComponent } from './login/login.component';
import { Constantes, Encript, Formatos, Sesion } from './metodos';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SocialLoginModule } from 'angularx-social-login';
import { NgxPayPalModule } from 'ngx-paypal';

import { AuthServices } from './services/auth.service';
import { CategoriasService } from './services/categorias.service';
import { ComisionesService } from './services/comisiones.service';
import { ProveedoresService } from './services/proveedores.service';
import { LocalitiesService } from './services/localities.service';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { BuscarEventoComponent } from './pages/buscar-evento/buscar-evento.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    InicioComponent,
    NosotrosComponent,
    BoletosComponent,
    PagoComponent,
    ComprarComponent,
    FacturaComponent,
    BuscarEventoComponent,
    LocalidadesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
    NgxPayPalModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    SocialLoginModule,
    RecaptchaV3Module,
    RouterModule,
    ComponentesModule,
    FormModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthServices,
    Sesion,
    ProveedoresService,
    ComisionesService,
    CategoriasService,
    Encript,
    Constantes,
    Formatos,
    LocalitiesService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfW5vgUAAAAAFMhgbCPIkZHjH9tq95IYX4aIZSn'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

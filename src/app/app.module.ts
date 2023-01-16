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

import { BoletosComponent } from './pages/boletos/boletos.component';
import { BuscarEventoComponent } from './pages/buscar-evento/buscar-evento.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { PagoComponent } from './pages/pago/pago.component';
import { AuthServices } from './services/auth.service';
import { CategoriasService } from './services/categorias.service';
import { ComisionesService } from './services/comisiones.service';
import { LocalitiesService } from './services/localities.service';
import { ProveedoresService } from './services/proveedores.service';

import { AutorizarProveedoresComponent } from './dashboard/autorizar-proveedores/autorizar-proveedores.component';
import { CajaComponent } from './dashboard/caja/caja.component';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { ClasificacionesComponent } from './dashboard/clasificaciones/clasificaciones.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ValidarCuentaComponent } from './dashboard/validar-cuenta/validar-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    AutorizarProveedoresComponent,
    BoletosComponent,
    BuscarEventoComponent,
    CajaComponent,
    CategoriaComponent,
    ClasificacionesComponent,
    ConfiguracionComponent,
    ComprarComponent,
    DashboardComponent,
    FacturaComponent,
    InicioComponent,
    LocalidadesComponent,
    LoginComponent,
    NosotrosComponent,
    PerfilComponent,
    PagoComponent,
    RegisterComponent,
    RecoveryComponent,
    ValidarCuentaComponent,
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    ComponentesModule,
    FormsModule,
    FormModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbModule,
    NgxPayPalModule,
    NgxWebstorageModule.forRoot(),
    RecaptchaV3Module,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    SocialLoginModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthServices,
    CategoriasService,
    ComisionesService,
    Constantes,
    Encript,
    Formatos,
    LocalitiesService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfW5vgUAAAAAFMhgbCPIkZHjH9tq95IYX4aIZSn'
    },
    ProveedoresService,
    Sesion,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

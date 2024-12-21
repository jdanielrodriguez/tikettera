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
import { Encript } from "./common/encript";
import { Sesion } from "./common/sesion";
import { Formatos } from "./common/format";
import { Constantes } from "./common/constant";
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SocialLoginModule } from 'angularx-social-login';
import { NgxPayPalModule } from 'ngx-paypal';

import { BoletosComponent } from './pages/boletos/boletos.component';
import { ExplorarComponent } from './pages/explorar/explorar.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { PagoComponent } from './pages/pago/pago.component';
import { AuthServices } from './services/auth.service';
import { CategoriasService } from './services/categorias.service';
import { ComisionesService } from './services/comisiones.service';
import { LocalitiesService } from './services/localities.service';
import { ProveedoresService } from './services/proveedores.service';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidarCuentaComponent } from './dashboard/validar-cuenta/validar-cuenta.component';
import { MyEntriesComponent } from './dashboard/my-entries/my-entries.component';
import { MyProducedEventsComponent } from './dashboard/my-produced-events/my-produced-events.component';
import { MyInformationComponent } from './dashboard/my-information/my-information.component';
import { MyCardsComponent } from './dashboard/my-cards/my-cards.component';
import { MyRecordsComponent } from './dashboard/my-records/my-records.component';
import { MyCategoriesComponent } from './dashboard/my-categories/my-categories.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AuthorizePromotersComponent } from './dashboard/authorize-promoters/authorize-promoters.component';

@NgModule({
  declarations: [
    AppComponent,
    BoletosComponent,
    ExplorarComponent,
    DashboardComponent,
    FacturaComponent,
    InicioComponent,
    LocalidadesComponent,
    LoginComponent,
    NosotrosComponent,
    PagoComponent,
    RegisterComponent,
    RecoveryComponent,
    ValidarCuentaComponent,
    AuthComponent,
    MyEntriesComponent,
    MyProducedEventsComponent,
    MyInformationComponent,
    MyCardsComponent,
    MyRecordsComponent,
    MyCategoriesComponent,
    SettingsComponent,
    AuthorizePromotersComponent,
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

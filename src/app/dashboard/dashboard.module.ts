import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { ComponentesModule } from '../components/componentes.module';
import { FormModule } from '../forms/forms.module';
import { AutorizarProveedoresComponent } from './autorizar-proveedores/autorizar-proveedores.component';
import { CajaComponent } from './caja/caja.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChangePassFormulario } from './change-pass/change-pass-form.component';
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ValidarCuentaComponent } from './validar-cuenta/validar-cuenta.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent,
    ConfiguracionComponent,
    ClasificacionesComponent,
    CategoriaComponent,
    AutorizarProveedoresComponent,
    CajaComponent,
    ChangePassComponent,
    ChangePassFormulario,
    ValidarCuentaComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FormModule,
    NgbModule,
    SimpleNotificationsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

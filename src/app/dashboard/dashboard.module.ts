import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';
import { ComponentesModule } from '../components/componentes.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { AutorizarProveedoresComponent } from './autorizar-proveedores/autorizar-proveedores.component';
import { CajaComponent } from './caja/caja.component';
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
    ValidarCuentaComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    NgbModule,
    SimpleNotificationsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

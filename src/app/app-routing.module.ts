import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { LogoutComponent } from './components/logout/logout.component';

import { AutorizarProveedoresComponent } from './dashboard/autorizar-proveedores/autorizar-proveedores.component';
import { CajaComponent } from './dashboard/caja/caja.component';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { ClasificacionesComponent } from './dashboard/clasificaciones/clasificaciones.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ValidarCuentaComponent } from './dashboard/validar-cuenta/validar-cuenta.component';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { ExplorarComponent } from './pages/explorar/explorar.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PagoComponent } from './pages/pago/pago.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'change-pass', component: ChangePassComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/:uuid', component: AuthComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'localidades/:slug', component: LocalidadesComponent },
  { path: 'localidades/:event_slug/localidad/:slug', component: BoletosComponent },
  { path: 'pagar/:uuid', component: PagoComponent },
  { path: 'factura/:uuid', component: FacturaComponent },
  { path: 'explorar/:slug', component: ExplorarComponent },
  { path: 'dashboard', redirectTo: 'dashboard/information', pathMatch: 'full' },
  { path: 'dashboard/:tipo', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'settings/:tipo', component: ConfiguracionComponent },
      { path: 'information', component: ConfiguracionComponent },
      { path: 'events', component: PerfilComponent },
      { path: 'created-event', component: PerfilComponent },
      { path: 'credit-cards', component: PerfilComponent },
      { path: 'orders', component: PerfilComponent },
      { path: 'bills', component: PerfilComponent },
      { path: 'caja', component: CajaComponent },
      { path: 'categorias', component: ClasificacionesComponent },
      { path: 'categorias/:producto', component: CategoriaComponent },
      { path: 'autorizar-proveedores', component: AutorizarProveedoresComponent },
      { path: 'autorizar/:token', component: ValidarCuentaComponent },
      { path: '**', redirectTo: 'information', pathMatch: 'full' }
    ], canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

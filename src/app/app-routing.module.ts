import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { ChangePassComponent } from './components/pages/change-pass/change-pass.component';
import { LogoutComponent } from './components/logout/logout.component';

import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidarCuentaComponent } from './dashboard/validar-cuenta/validar-cuenta.component';

import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { ExplorarComponent } from './pages/explorar/explorar.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PagoComponent } from './pages/pago/pago.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';

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
      { path: 'settings/:tipo', component: SettingsComponent },
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

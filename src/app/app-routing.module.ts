import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

import { LogoutComponent } from './components/logout/logout.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { PresentacionesComponent } from './pages/presentaciones/presentaciones.component';
import { BuscarEventoComponent } from './pages/buscar-evento/buscar-evento.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { PagoComponent } from './pages/pago/pago.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(e => e.DashboardModule), canActivate: [AuthGuard] },
  { path: '', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'chage-pass', component: ChangePassComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'presentaciones/:slug', component: PresentacionesComponent },
  { path: 'presentaciones/:event_slug/localidad/:slug', component: BoletosComponent },
  { path: 'detalle-compra/:crypto_id', component: ComprarComponent },
  { path: 'pagar/:crypto_id', component: PagoComponent },
  { path: 'factura/:crypto_id', component: FacturaComponent },
  { path: ':slug', component: BuscarEventoComponent },
  { path: '**', redirectTo: '' }
  ,
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

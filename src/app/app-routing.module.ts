import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

import { LogoutComponent } from './components/logout/logout.component';
import { NavComponent } from './components/nav/nav.component';
import { ChangePassComponent } from './dashboard/change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(e => e.DashboardModule), canActivate: [AuthGuard] },
  {
    path: '', component: NavComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'chage-pass', component: ChangePassComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'inicio' }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

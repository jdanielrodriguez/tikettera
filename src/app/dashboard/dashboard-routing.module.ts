import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './../components/nav/nav.component';
import { DashboardComponent } from './dashboard.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ValidarCuentaComponent } from './validar-cuenta/validar-cuenta.component';
import { CajaComponent } from './caja/caja.component';
import { AutorizarProveedoresComponent } from './autorizar-proveedores/autorizar-proveedores.component';

const routes: Routes = [
  { path: '', component: NavComponent, children: [
    { path: 'inicio', component: DashboardComponent },
    { path: 'configuracion',  redirectTo: 'configuracion/perfil'},
    { path: 'configuracion/:tipo', component: ConfiguracionComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'caja', component: CajaComponent },
    { path: 'categorias', component: ClasificacionesComponent },
    { path: 'categorias/:producto', component: CategoriaComponent },
    { path: 'autorizar-proveedores', component: AutorizarProveedoresComponent },
    { path: 'autorizar/:token', component: ValidarCuentaComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

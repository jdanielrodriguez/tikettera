import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  constructor(
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
  }
  get perfil(): Perfil {
    return this.mySesion.perfil;
  }
}

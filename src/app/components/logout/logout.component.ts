import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private localSt: LocalStorageService,
    private router: Router,
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.localSt.clear('currentPerfil');
    this.localSt.clear('lastLink');
    this.localSt.clear('currentOrdenPendiente');
    this.localSt.clear('currentAvatar');
    localStorage.removeItem('currentPerfil');
    localStorage.removeItem('currentAvatar');
    localStorage.removeItem('lastLink');
    localStorage.removeItem('currentOrdenPendiente');
    localStorage.removeItem('selectedId');
    this.mySesion.validarSesion();
    this.mySesion.lastLink = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { Sesion } from './../../common/sesion';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dinamicLink = '';
  constructor(
    private mySesion: Sesion,
  ) { }
  ngOnInit() {
    this.mySesion.scrollTop();
  }
}

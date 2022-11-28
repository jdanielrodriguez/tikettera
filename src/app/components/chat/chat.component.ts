import { Component, OnInit } from '@angular/core';
import { Sesion } from './../../metodos';
import { Perfil } from './../../interfaces';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private _chatAbierto!: boolean;
  private _conversaciones!: Perfil[];
  private _conversacionActual!: Perfil;
  constructor(
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    const temp: Perfil = new Perfil();
    temp.email = 'tempora.@fdf.com';
    temp.nombre = 'temporal';
    temp.username = 'temporal';
    temp.imagenes = [
      {
        url: 'https://robohash.org/68.186.255.198.png'
      }
    ];
    const temp2: Perfil = new Perfil();
    temp2.email = 'dannyjose1112@hotmail.com';
    temp2.nombre = 'Daniel Rodriguez';
    temp2.username = 'Dannyjose1112';
    temp2.imagenes = [
      {
        url: 'https://robohash.org/68.186.255.198.png'
      }
    ];
    this._conversaciones = [temp, temp2, this.mySesion.perfil];
  }
  seleccionar(value: Perfil) {
    this.conversacionActual = value;
  }
  abrirChat(value: boolean) {
    // this._conversacionActual = null;
    this.chatAbierto = !value;
  }
  get chatAbierto(): boolean {
    return this._chatAbierto;
  }
  set chatAbierto(value: boolean) {
    this._chatAbierto = value;
  }
  get conversaciones(): Perfil[] {
    return this._conversaciones;
  }
  set conversaciones(value: Perfil[]) {
    this._conversaciones = value;
  }
  get conversacionActual(): Perfil {
    return this._conversacionActual;
  }
  set conversacionActual(value: Perfil) {
    this._conversacionActual = value;
  }

}

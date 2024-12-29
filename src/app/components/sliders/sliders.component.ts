import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Imagen } from '../../interfaces';
@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  private _imagenEliminar: EventEmitter<Imagen> = new EventEmitter<Imagen>();
  imagen!: Imagen;
  @Input() sliders!: Imagen[];
  @Input() esAdmin!: boolean;
  constructor() { }
  ngOnInit(): void { }
  handleRefusal(value: any) {
    console.log(value);
  }
  removerFoto(value: Imagen) {
    this.imagen = value;
    this._imagenEliminar.emit(this.imagen);
  }

  @Output()
  get imagenEliminar(): EventEmitter<Imagen> {
    this._imagenEliminar.emit(this.imagen);
    return this._imagenEliminar;
  }
}

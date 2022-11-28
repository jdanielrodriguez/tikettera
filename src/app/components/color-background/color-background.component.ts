import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-background',
  templateUrl: './color-background.component.html',
  styleUrls: ['./color-background.component.css']
})
export class ColorBackgroundComponent implements OnInit {
  private _colorEmit: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  color1 = {
    background: `rgb(255,255,255)
    linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(232,186,162,1) 10%, rgba(200,91,34,1) 90%, rgba(255,255,255,1) 100%)`,
  };
  private _color = '#000000';
  private _background = '#000000';
  private _tipo!: string;
  ngOnInit(): void {
    // switch (this._tipo) {
    //   case 'texto': {
    //     this.color = '#000000'
    //     break;
    //   }
    // }
  }
  getColor(value: any) {
    this._color = value;
    this._colorEmit.emit(this.color);
  }
  getActivo(value: string): boolean {
    return value === this._tipo;
  }
  get background(): string {
    return this._background;
  }
  @Input()
  set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color;
  }
  @Input()
  set tipo(value: string) {
    this._tipo = value;
  }
  get tipo(): string {
    return this._tipo;
  }
  @Output()
  get obtenerColor(): EventEmitter<string> {
    this._colorEmit.emit(this.color);
    return this._colorEmit;
  }
}

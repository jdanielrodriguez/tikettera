import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil } from 'src/app/interfaces';

interface Entry {
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  seat: string;
  status: string;
  image?: string;
}

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.scss']
})
export class MyEntriesComponent implements OnInit {
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _perfil: Perfil = new Perfil();

  entries: Entry[] = []; // Lista completa de entradas
  paginatedEntries: Entry[] = []; // Entradas para la página actual
  page: number = 1; // Página actual
  pageSize: number = 5; // Tamaño de página

  constructor() { }

  ngOnInit(): void {
    this.loadEntries();
    this.updatePaginatedEntries();
  }

  loadEntries(): void {
    // Simula la carga de entradas; reemplaza esto con datos reales del servicio
    this.entries = [
      {
        eventName: 'Concierto de Rock',
        eventDate: '2024-12-25',
        eventTime: '19:00',
        location: 'Estadio Nacional',
        seat: 'A12',
        status: 'Próximo',
        image: 'https://via.placeholder.com/150'
      },
      {
        eventName: 'Obra de Teatro',
        eventDate: '2024-11-20',
        eventTime: '20:00',
        location: 'Teatro Municipal',
        seat: 'B5',
        status: 'Asistido',
        image: 'https://via.placeholder.com/150'
      },
      // Agrega más entradas según sea necesario
    ];
  }

  updatePaginatedEntries(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEntries = this.entries.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.updatePaginatedEntries();
  }
  obtenerPerfilConf(value: Perfil) {
    this._perfil = value;
    this._perfilEmit.emit(this._perfil);
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this._perfilEmit.emit(this._perfil);
    return this._perfilEmit;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
}

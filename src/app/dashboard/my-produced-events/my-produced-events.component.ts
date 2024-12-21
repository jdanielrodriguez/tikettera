import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Menus } from 'src/app/interfaces';

interface Event {
  id?: number;
  name: string;
  date: string;
  location: string;
  ticketsSold: number;
  totalTickets: number;
  image?: string;
}

@Component({
  selector: 'app-my-produced-events',
  templateUrl: './my-produced-events.component.html',
  styleUrls: ['./my-produced-events.component.scss']
})
export class MyProducedEventsComponent implements OnInit {
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _perfil: Perfil = new Perfil();
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  page: number = 1;
  pageSize: number = 5;
  showForm: boolean = false;
  selectedEvent: Event | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadEvents();
    this.updatePaginatedEvents();
  }

  loadEvents(): void {
    this.events = [
      {
        id: 1,
        name: 'Concierto de Rock',
        date: '2024-12-25',
        location: 'Estadio Nacional',
        ticketsSold: 150,
        totalTickets: 200,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'Obra de Teatro',
        date: '2024-11-20',
        location: 'Teatro Municipal',
        ticketsSold: 50,
        totalTickets: 100,
        image: 'https://via.placeholder.com/150'
      }
    ];
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.updatePaginatedEvents();
  }

  showEventForm(): void {
    this.showForm = true;
    this.selectedEvent = null;
  }

  editEvent(event: Event): void {
    this.selectedEvent = { ...event };
    this.showForm = true;
  }

  deleteEvent(event: Event): void {
    if (confirm(`¿Estás seguro de eliminar el evento "${event.name}"?`)) {
      this.events = this.events.filter(e => e.id !== event.id);
      this.updatePaginatedEvents();
    }
  }

  saveEvent(event: Event): void {
    if (event.id) {
      const index = this.events.findIndex(e => e.id === event.id);
      if (index !== -1) this.events[index] = event;
    } else {
      event.id = this.events.length + 1;
      this.events.push(event);
    }
    this.updatePaginatedEvents();
    this.closeEventForm();
  }

  closeEventForm(): void {
    this.showForm = false;
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

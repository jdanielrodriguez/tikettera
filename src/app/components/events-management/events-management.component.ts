import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Event as evento } from '../../interfaces';
import { ListaBusqueda } from '../../interfaces';
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
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.scss']
})
export class EventsManagementComponent implements OnInit {
  @Output() closeEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveEmit: EventEmitter<Event> = new EventEmitter<Event>();
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _perfil: Perfil = new Perfil();
  @Input() events: Event[] = [];
  paginatedEvents: Event[] = [];
  page: number = 1;
  pageSize: number = 5;
  showForm: boolean = false;
  selectedEvent: Event | null = null;

  constructor() { }
  @Input() public step = 1;
  @Input() public data: ListaBusqueda = new ListaBusqueda();

  ngOnInit(): void {
  }

  onChangeStep(step: number) {
    this.step = step;
  }

  onPageChange(page: number): void {
    this.page = page;
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
    this.saveEmit.emit(event);
    this.closeEventForm();
  }

  closeEventForm(): void {
    this.showForm = false;
    this.closeEmit.emit(this.showForm);
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

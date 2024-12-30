import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Event, Menus } from '../../interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-my-produced-events',
  templateUrl: './my-produced-events.component.html',
  styleUrls: ['./my-produced-events.component.scss']
})
export class MyProducedEventsComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();
  @Output() perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();

  events: Event[] = [];
  paginatedEvents: Event[] = [];
  page: number = 1;
  pageSize: number = 5;
  showForm: boolean = false;
  selectedEvent: Event | null = null;

  constructor(private route: ActivatedRoute, private mySesion: Sesion) { }

  ngOnInit(): void {
    this.loadEvents();
    this.updatePaginatedEvents();
    this.detectRoute();
  }

  detectRoute(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path === 'dashboard/produced-events-new') {
        this.showEventForm(); // Abrir el formulario para creación
      } else if (path.startsWith('dashboard/produced-events-edit')) {
        const slug = path.replace('dashboard/produced-events-edit-', '');
        if (slug) {
          this.editEventBySlug(slug); // Cargar el evento a editar
        }
      } else {
        this.showForm = false; // Cerrar el formulario
      }
    });
  }

  loadEvents(): void {
    this.events = [
      {
        id: 1,
        name: 'Concierto de Rock',
        description: 'Un concierto increíble de rock.',
        address: 'Estadio Nacional',
        lat: 14.6349,
        lng: -90.5069,
        date_start: '2024-12-25',
        date_end: '2024-12-25',
        picture: 'https://via.placeholder.com/150',
        slug: 'concierto-de-rock',
        localities: []
      },
      {
        id: 2,
        name: 'Obra de Teatro',
        description: 'Una obra teatral fascinante.',
        address: 'Teatro Municipal',
        lat: 14.6359,
        lng: -90.5079,
        date_start: '2024-11-20',
        date_end: '2024-11-20',
        picture: 'https://via.placeholder.com/150',
        slug: 'obra-de-teatro',
        localities: []
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

  editEventBySlug(slug: string): void {
    const event = this.events.find(e => e.slug === slug);
    if (event) {
      this.showForm = false;
      this.selectedEvent = { ...event };
      this.showForm = true;
    } else {
      this.mySesion.createError('Evento no encontrado');
      this.mySesion.navegar({ url: '../../dashboard/produced-events' });
      this.detectRoute();
    }
  }

  editEvent(event: Event): void {
    this.mySesion.navegar({ url: `../../dashboard/produced-events-edit-${event.slug}` });
    this.detectRoute();
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
    this.mySesion.navegar({ url: '../../dashboard/produced-events' });
    this.detectRoute();
    this.updatePaginatedEvents();
    this.closeEventForm();
  }
  navigate(data: Menus) {
    this.mySesion.navegar(data);
    this.detectRoute();
  }

  closeEventForm(): void {
    this.showForm = false;
    this.mySesion.navegar({ url: '../../dashboard/produced-events' });
  }
}

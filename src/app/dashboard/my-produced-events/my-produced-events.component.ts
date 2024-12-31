import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Event, Menus, ResponseEvent } from '../../interfaces';
import { Sesion } from '../../common/sesion';
import { EventsService } from '../../services/events.service';
import { LocalitiesService } from '../../services/localities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-produced-events',
  templateUrl: './my-produced-events.component.html',
  styleUrls: ['./my-produced-events.component.scss']
})
export class MyProducedEventsComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();
  @Input() selectedEvent: Event | null = null;
  @Output() perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  page: number = 1;
  pageSize: number = 5;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion,
    private eventsService: EventsService,
    private localitiesService: LocalitiesService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
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
    this.mySesion.loadingStart();
    const request = this.eventsService.getAllByUser(this.mySesion.perfil.id || 0).subscribe({
      next: (response) => {
        this.events = response.data || [];
        this.updatePaginatedEvents();
      },
      error: (err) => {
        this.mySesion.createError('Error al cargar eventos');
      },
      complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
    });
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
    this.mySesion.loadingStart();
    const request = this.localitiesService.getAllByEvent(this.mySesion.encriptar(JSON.stringify(slug)) || '').subscribe({
      next: (response: ResponseEvent) => {
        const event = response.cripto ? JSON.parse(this.mySesion.desencriptar(response.cripto)) : null;
        if (event) {
          this.selectedEvent = { ...event };
          this.showForm = true;
        } else {
          this.mySesion.createError('Evento no encontrado');
          this.navigateBackToEvents();
        }
      },
      error: () => {
        this.mySesion.createError('Error al cargar evento');
        this.navigateBackToEvents();
      },
      complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
    });
  }

  editEvent(event: Event): void {
    this.mySesion.navegar({ url: `../../dashboard/produced-events-edit-${event.slug}` });
  }

  // Eliminar un evento
  deleteEvent(event: Event): void {
    this.mySesion.loadingStart();
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esto eliminará el evento "${event.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const request = this.eventsService.deleteEvent(event.id!).subscribe({
          next: () => {
            this.events = this.events.filter(e => e.id !== event.id);
            this.updatePaginatedEvents();
            this.mySesion.createSuccess('Evento eliminado con éxito');
          },
          error: () => {
            this.mySesion.createError('Error al eliminar el evento');
          },
          complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
        });
        Swal.fire(
          'Eliminado',
          `El evento "${event.name}" ha sido eliminado.`,
          'success'
        );
      }
    });
  }

  // Guardar un nuevo evento o actualizar uno existente
  saveEvent(event: Event): void {
    this.mySesion.loadingStart();
    if (event.id) {
      // Actualizar evento
      const request = this.eventsService.updateEvent(event.id, event).subscribe({
        next: (response) => {
          const updatedEvent = response.objeto;
          const index = this.events.findIndex(e => e.id === updatedEvent.id);
          if (index !== -1) this.events[index] = updatedEvent;
          this.updatePaginatedEvents();
          this.mySesion.createSuccess('Evento actualizado con éxito');
          this.selectedEvent = { ...updatedEvent };
        },
        error: () => {
          this.mySesion.createError('Error al actualizar el evento');
        },
        complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
      });
    } else {
      // Crear evento
      const request = this.eventsService.createEvent(event).subscribe({
        next: (response) => {
          this.events.push(response.objeto);
          this.updatePaginatedEvents();
          this.mySesion.createSuccess('Evento creado con éxito');
          this.selectedEvent = { ...response.objeto };
        },
        error: () => {
          this.mySesion.createError('Error al crear el evento');
        },
        complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
      });
    }
  }

  // Navegar de regreso a la lista de eventos
  navigateBackToEvents(): void {
    this.mySesion.navegar({ url: '../../dashboard/produced-events' });
    this.showForm = false;
  }
  navigate(data: Menus) {
    this.mySesion.navegar(data);
    this.detectRoute();
  }

  closeEventForm(): void {
    this.showForm = false;
    this.navigateBackToEvents();
  }
}

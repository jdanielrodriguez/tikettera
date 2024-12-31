import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event, Locality, ResponseLocality } from '../../interfaces';
import { Sesion } from '../../common/sesion';
import { LocalitiesService } from '../../services/localities.service';

@Component({
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.scss']
})
export class EventsManagementComponent implements OnInit {
  @Input() events: Event[] = [];
  @Input() selectedEvent: Event | null = null;
  @Input() step = 1;
  @Output() closeEmit = new EventEmitter<void>();
  @Output() saveEmit = new EventEmitter<Event>();

  constructor(
    private mySesion: Sesion,
    private localitiesService: LocalitiesService
  ) { }

  ngOnInit(): void { }

  onChangeStep(step: number): void {
    this.step = step;
  }

  handleSave(event: any): void {
    this.saveEmit.emit(event);
    this.onChangeStep(2);
  }

  handleClose(): void {
    this.closeEmit.emit();
  }

  onLocalitySaved(locality: Locality): void {
    this.mySesion.loadingStart();
    if (this.selectedEvent && this.selectedEvent.id) {
      if (locality.id) {
        // Editar localidad existente
        const request = this.localitiesService.updateLocality(locality, this.selectedEvent.id).subscribe({
          next: (updatedLocality: ResponseLocality) => {
            const locality = updatedLocality.objeto;
            const index = locality ? this.selectedEvent!.localities.findIndex(l => l.id === locality.id) : -1;
            if (index !== -1 && locality) {
              this.selectedEvent!.localities[index] = locality; // Actualizar en el array
            }
            this.mySesion.createSuccess('Localidad actualizada con éxito.');
            this.onChangeStep(3); // Ir al siguiente paso
          },
          error: () => {
            this.mySesion.createError('Error al actualizar la localidad.');
            this.mySesion.loadingStop();
          },
          complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
        });
      } else {
        // Crear nueva localidad
        const request = this.localitiesService.createLocality(locality, this.selectedEvent.id).subscribe({
          next: (savedLocality: ResponseLocality) => {
            if (savedLocality.objeto) {
              this.selectedEvent!.localities.push(savedLocality.objeto); // Agregar al array
              this.mySesion.createSuccess('Localidad guardada con éxito.');
              this.onChangeStep(3); // Ir al siguiente paso
            }
          },
          error: () => {
            this.mySesion.createError('Error al guardar la localidad.');
            this.mySesion.loadingStop();
          },
          complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
        });
      }
    }
  }

  // Manejar cuando se elimina una localidad desde el hijo
  onLocalityDeleted(locality: Locality): void {
    if (this.selectedEvent) {
      this.selectedEvent.localities = this.selectedEvent.localities.filter(l => l.id !== locality.id);
    }
  }
}

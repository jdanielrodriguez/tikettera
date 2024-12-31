import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event, Locality } from '../../interfaces';

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

  constructor() { }

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
    if (this.selectedEvent) {
      const index = this.selectedEvent.localities?.findIndex(l => l.id === locality.id);
      if (index !== -1) {
        this.selectedEvent.localities[index] = locality; // Actualizar localidad existente
      } else {
        this.selectedEvent.localities.push(locality); // Agregar nueva localidad
      }
      this.onChangeStep(3);
    }
  }

  // Manejar cuando se elimina una localidad desde el hijo
  onLocalityDeleted(locality: Locality): void {
    if (this.selectedEvent) {
      this.selectedEvent.localities = this.selectedEvent.localities.filter(l => l.id !== locality.id);
    }
  }
}

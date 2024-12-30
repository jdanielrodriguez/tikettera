import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../../interfaces';

@Component({
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.scss']
})
export class EventsManagementComponent implements OnInit {
  @Input() events: Event[] = [];
  @Input() selectedEvent: Event | null = null;
  @Input() public step = 1;
  @Output() closeEmit = new EventEmitter<void>();
  @Output() saveEmit = new EventEmitter<Event>();

  constructor() { }

  ngOnInit(): void { }

  onChangeStep(step: number) {
    this.step = step;
  }

  handleSave(event: any): void {
    this.saveEmit.emit(event);
    this.handleClose();
  }

  handleClose(): void {
    this.closeEmit.emit();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  eventData: any = {};

  ngOnInit(): void {
    if (this.event) {
      this.eventData = { ...this.event };
    }
  }

  onSubmit(): void {
    this.save.emit(this.eventData);
  }

  onCancel(): void {
    this.close.emit();
  }
}

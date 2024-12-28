import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
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

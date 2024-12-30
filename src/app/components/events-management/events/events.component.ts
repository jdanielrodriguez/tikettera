import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: [this.event?.name || '', [Validators.required]],
      description: [this.event?.description || ''],
      date_start: [this.event?.date_start || '', [Validators.required]],
      lat: [this.event?.lat || null],
      lng: [this.event?.lng || null],
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.save.emit(this.eventForm.value);
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

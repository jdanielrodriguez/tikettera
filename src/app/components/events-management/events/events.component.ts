import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../../interfaces';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() event: Event | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Event>();

  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const initialDate: NgbDateStruct | null = this.event?.date_start
      ? this.parseDate(this.event.date_start)
      : null;

    console.log(this.event, initialDate);
    this.eventForm = this.fb.group({
      name: [this.event?.name || '', [Validators.required]],
      description: [this.event?.description || ''],
      date_start: [initialDate, [Validators.required]],
      lat: [this.event?.lat || null],
      lng: [this.event?.lng || null],
    });
  }

  parseDate(dateString: string | null): NgbDateStruct | null {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = { ...this.eventForm.value };
      if (formValue.date_start) {
        const { year, month, day } = formValue.date_start;
        formValue.date_start = new Date(year, month - 1, day).toISOString();
      }
      this.save.emit(formValue);
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

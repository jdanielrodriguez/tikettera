import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locality } from '../../../interfaces';

@Component({
  selector: 'app-localities-form',
  templateUrl: './localities-form.component.html',
  styleUrls: []
})
export class LocalitiesFormComponent implements OnInit {
  @Input() locality: Locality | null = null; // Localidad a editar
  @Output() save = new EventEmitter<Locality>();
  @Output() cancel = new EventEmitter<void>();

  localityForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.localityForm = this.fb.group({
      id: [this.locality?.id || null],
      name: [this.locality?.name || '', [Validators.required]],
      description: [this.locality?.description || ''],
      price: [this.locality?.price || 0, [Validators.required, Validators.min(0)]],
      event_id: [this.locality?.event_id || null]
    });
  }

  onSubmit(): void {
    if (this.localityForm.valid) {
      this.save.emit(this.localityForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

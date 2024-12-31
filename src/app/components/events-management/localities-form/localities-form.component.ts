import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locality } from '../../../interfaces';

@Component({
  selector: 'app-localities-form',
  templateUrl: './localities-form.component.html',
  styleUrls: []
})
export class LocalitiesFormComponent implements OnInit {
  @Input() locality: Locality | null = null;
  @Output() save = new EventEmitter<Locality>();
  @Output() close = new EventEmitter<void>();

  localityForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.localityForm = this.fb.group({
      name: [this.locality?.name || '', [Validators.required]],
      description: [this.locality?.description || ''],
      price: [this.locality?.price || 0, [Validators.required, Validators.min(0)]],
      tasa_cambio: [this.locality?.tasa_cambio || 1],
      iva: [this.locality?.iva || 0],
      id: [this.locality?.id || null],
      tasa_iva: [this.locality?.tasa_iva || 0],
      comision: [this.locality?.comision || 0],
      state: [this.locality?.state || 1],
      slug: [this.locality?.slug || '', [Validators.required]]
    });
  }

  generateSlug(): void {
    const name = this.localityForm.get('name')?.value || '';
    const slug = this.slugify(name);
    this.localityForm.patchValue({ slug });
  }

  slugify(text: string): string {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onSubmit(): void {
    if (this.localityForm.valid) {
      this.save.emit(this.localityForm.value);
    }
  }
}

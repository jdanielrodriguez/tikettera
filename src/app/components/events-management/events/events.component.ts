import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
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
  map!: L.Map;
  marker!: L.Marker;
  slugPreview: string = ''; // Para mostrar el slug en tiempo real

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeMap();
  }

  initializeForm(): void {
    const initialSlug = this.event?.slug || '';
    const initialDate: NgbDateStruct | null = this.event?.date_start
      ? this.parseDate(this.event.date_start)
      : null;
    this.slugPreview = initialSlug;
    this.eventForm = this.fb.group({
      name: [this.event?.name || '', [Validators.required]],
      id: [this.event?.id || null],
      description: [this.event?.description || ''],
      slug: [initialSlug, [Validators.required]],
      date_start: [initialDate || '', [Validators.required]],
      lat: [this.event?.lat || 14.6349, [Validators.required]], // Coordenada inicial
      lng: [this.event?.lng || -90.5069, [Validators.required]] // Coordenada inicial
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
      day: date.getDate() + 1,
    };
  }

  // Genera el slug automáticamente basado en el nombre
  generateSlug(): void {
    const name = this.eventForm.get('name')?.value || '';
    this.slugPreview = this.slugify(name);
    this.eventForm.patchValue({ slug: this.slugPreview });
  }

  // Valida cambios manuales en el campo de slug
  validateSlug(): void {
    const slug = this.eventForm.get('slug')?.value || '';
    this.slugPreview = this.slugify(slug);
    this.eventForm.patchValue({ slug: this.slugPreview });
  }

  // Convierte un string a un slug válido
  slugify(text: string): string {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-') // Reemplaza espacios y guiones bajos con guiones
      .replace(/[^\w-]+/g, '') // Elimina caracteres especiales
      .replace(/--+/g, '-') // Reemplaza múltiples guiones por uno solo
      .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio o al final
  }

  // Inicialización del mapa Leaflet
  initializeMap(): void {
    const initialLat = this.eventForm.get('lat')?.value || 14.6349;
    const initialLng = this.eventForm.get('lng')?.value || -90.5069;

    // Crear el mapa centrado en las coordenadas iniciales
    this.map = L.map('map', {
      center: [initialLat, initialLng],
      zoom: 18,
    });

    // Añadir la capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Añadir un marcador draggable
    this.marker = L.marker([initialLat, initialLng], { draggable: true })
      .addTo(this.map)
      .on('dragend', (e: any) => {
        const newLatLng = e.target.getLatLng();
        this.eventForm.patchValue({
          lat: newLatLng.lat,
          lng: newLatLng.lng
        });
      });

    // Forzar el ajuste del tamaño del mapa
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  // Manejo del envío del formulario
  onSubmit(): void {
    if (this.eventForm.valid) {
      // Obtener el valor del formulario
      const formValue = { ...this.eventForm.value };

      // Convertir date_start (de NgbDateStruct) a un string en formato ISO
      if (formValue.date_start) {
        const { year, month, day } = formValue.date_start;
        formValue.date_start = new Date(year, month - 1, day).toISOString(); // Convertir a ISO 8601
      }

      // Emitir el formulario con el valor transformado
      this.save.emit(formValue);
    }
  }

  // Cerrar el formulario
  onCancel(): void {
    this.close.emit();
  }
}

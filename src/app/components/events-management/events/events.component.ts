import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeMap();
  }

  // Inicialización del formulario reactivo
  initializeForm(): void {
    this.eventForm = this.fb.group({
      name: [this.event?.name || '', [Validators.required]],
      description: [this.event?.description || ''],
      date_start: [this.event?.date_start || '', [Validators.required]],
      lat: [this.event?.lat || 14.6349, [Validators.required]], // Coordenada inicial
      lng: [this.event?.lng || -90.5069, [Validators.required]] // Coordenada inicial
    });
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

  // Enviar el formulario
  onSubmit(): void {
    if (this.eventForm.valid) {
      this.save.emit(this.eventForm.value);
    }
  }

  // Cerrar el formulario
  onCancel(): void {
    this.close.emit();
  }
}

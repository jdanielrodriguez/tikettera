import { Component, Input, OnInit } from '@angular/core';
import { Locality } from '../../../interfaces';

@Component({
  selector: 'app-localities-list',
  templateUrl: './localities-list.component.html',
  styleUrls: []
})
export class LocalitiesListComponent implements OnInit {
  @Input() eventId?: number | null;
  localities: Locality[] = [];
  showForm: boolean = false;
  selectedLocality: Locality | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadLocalities();
  }

  loadLocalities(): void {
    // Aquí deberías integrar el servicio para cargar las localidades desde el backend
    this.localities = [
      {
        id: 1,
        name: 'Localidad A',
        description: 'Descripción de Localidad A',
        price: 50,
        event_id: this.eventId,
        places: []
      },
      {
        id: 2,
        name: 'Localidad B',
        description: 'Descripción de Localidad B',
        price: 75,
        event_id: this.eventId,
        places: []
      }
    ];
  }

  showLocalityForm(): void {
    this.selectedLocality = null;
    this.showForm = true;
  }

  editLocality(locality: Locality): void {
    this.selectedLocality = { ...locality }; // Clonar para evitar cambios directos
    this.showForm = true;
  }

  deleteLocality(locality: Locality): void {
    if (confirm(`¿Estás seguro de eliminar la localidad "${locality.name}"?`)) {
      this.localities = this.localities.filter(l => l.id !== locality.id);
    }
  }

  onSaveLocality(locality: Locality): void {
    if (locality.id) {
      const index = this.localities.findIndex(l => l.id === locality.id);
      if (index !== -1) {
        this.localities[index] = locality;
      }
    } else {
      this.localities.push(locality);
    }
    this.showForm = false;
  }

  onCancelForm(): void {
    this.showForm = false;
  }
}

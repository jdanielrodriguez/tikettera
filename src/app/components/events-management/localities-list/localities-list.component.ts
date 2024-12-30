import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Locality } from '../../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localities-list',
  templateUrl: './localities-list.component.html',
  styleUrls: []
})
export class LocalitiesListComponent {
  @Input() localities: Locality[] = [];
  @Output() save = new EventEmitter<Locality>();
  @Output() delete = new EventEmitter<Locality>();

  showForm: boolean = false;
  selectedLocality: Locality | null = null;

  addLocality(): void {
    this.selectedLocality = null;
    this.showForm = true;
  }

  editLocality(locality: Locality): void {
    this.selectedLocality = { ...locality };
    this.showForm = true;
  }

  saveLocality(locality: Locality): void {
    this.save.emit(locality);
    this.closeForm();
  }

  deleteLocality(locality: Locality): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esto eliminará la localidad "${locality.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(locality);
        Swal.fire(
          'Eliminado',
          `La localidad "${locality.name}" ha sido eliminada.`,
          'success'
        );
      }
    });
  }

  closeForm(): void {
    this.showForm = false;
  }
}

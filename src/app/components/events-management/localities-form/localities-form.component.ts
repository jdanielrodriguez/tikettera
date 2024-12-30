import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Locality } from '../../../interfaces';

@Component({
  selector: 'app-localities-form',
  templateUrl: './localities-form.component.html',
  styleUrls: []
})
export class LocalitiesFormComponent {
  @Input() locality: Locality | null = null;
  @Output() save = new EventEmitter<Locality>();
  @Output() close = new EventEmitter<void>();

  localityData: Locality = new Locality();

  ngOnInit(): void {
    if (this.locality) {
      this.localityData = { ...this.locality };
    }
  }

  onSubmit(): void {
    this.save.emit(this.localityData);
  }
}

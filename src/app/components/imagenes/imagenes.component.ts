import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Imagen } from '../../interfaces';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  @Input() lista: Imagen[] = [];
  @Input() esAdmin: boolean = false;
  @Input() carpeta: string = '';

  @Output() imagenPrincipal = new EventEmitter<Imagen[]>();
  @Output() imagenEliminar = new EventEmitter<Imagen>();

  mostrarProgreso: boolean = false;
  avance: number = 0;
  imagen: Imagen = new Imagen();

  constructor() { }

  ngOnInit(): void {
    this.imagenPrincipal.emit(this.lista);
  }

  subirImagenes(event: Event, form?: any, id?: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      // Validar tamaño y tipo
      if (file.size > 3 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Seleccione una imagen de menos de 3 MB.');
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        alert('El tipo de archivo no es válido. Seleccione una imagen PNG o JPEG.');
        return;
      }

      // Convertir a base64 y almacenar temporalmente
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagen = {
          id: null,
          url: base64,
          base64: base64.split(',')[1], // Guardar solo datos base64
          titulo: '',
          descripcion: ''
        };
        input.value = ''; // Resetear el input
      };

      reader.readAsDataURL(file);
    }
  }

  enviarImagen(): void {
    if (this.imagen.base64) {
      this.lista.push(this.imagen);
      this.imagenPrincipal.emit(this.lista);
      this.imagen = new Imagen();
    } else {
      alert('No se ha seleccionado una imagen válida.');
    }
  }

  resetImagen(): void {
    this.imagen = new Imagen();
  }

  eliminarImagen(imagen: Imagen): void {
    this.lista = this.lista.filter((img) => img !== imagen);
    this.imagenEliminar.emit(imagen);
    this.imagenPrincipal.emit(this.lista);
  }
}

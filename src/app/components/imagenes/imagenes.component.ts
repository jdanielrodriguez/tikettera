import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Imagen } from '../../interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  private _lista: Imagen[] = [];

  @Input() esAdmin: boolean = false;
  @Input() carpeta: string = '';
  @Input() soloUnaImagen: boolean = false;

  @Input()
  set lista(value: Imagen[]) {
    this._lista = value;
    this.actualizarEstado();
  }

  get lista(): Imagen[] {
    return this._lista;
  }

  @Output() imagenPrincipal = new EventEmitter<Imagen[]>();
  @Output() imagenEliminar = new EventEmitter<Imagen>();

  mostrarProgreso: boolean = false;
  avance: number = 0;
  imagen: Imagen = new Imagen();
  displayImagen: boolean = false;
  activePanel: string = 'inputSubirImagen';

  constructor(private mySesion: Sesion) { }

  ngOnInit(): void {
    this.actualizarEstado();
    this.imagenPrincipal.emit(this.lista); // Emitir lista inicial
  }

  subirImagenes(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      if (file.size > 3 * 1024 * 1024) {
        this.mySesion.createError('La imagen es demasiado grande. Seleccione una imagen de menos de 3 MB.');
        return;
      }

      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.mySesion.createError('El tipo de archivo no es válido. Seleccione una imagen PNG o JPEG.');
        return;
      }

      this.mostrarProgreso = true;
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.avance = Math.round((event.loaded / event.total) * 100);
        }
      };

      reader.onload = () => {
        const base64 = reader.result as string;

        this.imagen = {
          id: null,
          url: base64,
          base64: base64.split(',')[1], // Guardar datos base64
          titulo: '',
          descripcion: ''
        };

        this.mostrarProgreso = false;
        this.avance = 0;
        this.displayImagen = true; // Mostrar la vista previa
        this.activePanel = 'previewImagen'; // Cambiar al panel de vista previa
        input.value = ''; // Resetear el input
      };

      reader.readAsDataURL(file);
    }
  }

  enviarImagen(): void {
    if (this.imagen.base64) {
      if (this.soloUnaImagen) {
        // Reemplazar la lista con la nueva imagen
        this.lista = [this.imagen];
      } else {
        // Agregar la nueva imagen a la lista
        this.lista.push(this.imagen);
      }
      this.imagenPrincipal.emit(this.lista); // Emitir lista actualizada
      this.imagen = new Imagen(); // Resetear imagen
      this.displayImagen = false; // Ocultar vista previa
      this.activePanel = 'sliderImagenes'; // Cambiar al panel del slider
    } else {
      this.mySesion.createError('No se ha seleccionado una imagen válida.');
    }
  }

  resetImagen(): void {
    this.imagen = new Imagen(); // Resetear la imagen
    this.displayImagen = false; // Regresar al estado inicial
    this.activePanel = this.lista.length > 0 ? 'sliderImagenes' : 'inputSubirImagen'; // Mostrar el slider si hay imágenes
  }

  eliminarImagen(imagen: Imagen): void {
    this.lista = this.lista.filter((img) => img !== imagen); // Remover imagen
    this.imagenEliminar.emit(imagen); // Emitir imagen eliminada
    this.imagenPrincipal.emit(this.lista); // Emitir lista actualizada
    if (this.lista.length === 0) {
      this.activePanel = 'inputSubirImagen'; // Mostrar el panel de carga si no hay imágenes
    }
  }

  private actualizarEstado(): void {
    if (this.displayImagen) {
      this.activePanel = 'inputSubirImagen'; // Mostrar vista previa
    } else if (this.lista.length > 0) {
      this.activePanel = 'sliderImagenes'; // Mostrar slider
    } else {
      this.activePanel = 'inputSubirImagen'; // Mostrar input si no hay imágenes
    }
  }
}

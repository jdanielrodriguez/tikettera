import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil, Imagen } from 'src/app/interfaces';
import { Sesion } from '../../../common/sesion';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();

  perfilForm!: FormGroup;
  imagenes: Imagen[] = []; // Lista de imágenes para el componente
  @Input() token!: string;
  @Input() validacion!: boolean;
  @Input() editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarDatosPerfil();
  }

  // Inicializa el formulario con los datos del perfil
  initForm(): void {
    this.perfilForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      names: [''],
      lastnames: ['']
    });
  }

  cargarDatosPerfil(): void {
    this.usuariosService.getSingle(1).subscribe({
      next: (data) => {
        this.perfilForm.patchValue(data);

        // Si el perfil tiene imagen asociada
        if (data.picture) {
          this.imagenes = [{
            id: null,
            url: data.picture,
            base64: null
          }];
        }
      },
      error: (error) => console.error(error)
    });
  }

  // Método para manejar la imagen cargada desde el componente app-imagenes
  actualizarImagen(imagenes: Imagen[]): void {
    this.imagenes = imagenes;
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      const formData = new FormData();

      // Agregar datos del formulario
      Object.entries(this.perfilForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Agregar imagen si existe
      if (this.imagenes.length > 0 && this.imagenes[0]?.base64) {
        formData.append('picture', this.imagenes[0].base64 as string);
      }

      this.usuariosService.updateProfile(formData).subscribe({
        next: (response) => {
          console.log('Perfil actualizado:', response);
          this.editMode = false; // Salir del modo edición
        },
        error: (error) => console.error('Error al actualizar:', error)
      });
    }
  }

  cancelar(): void {
    this.cargarDatosPerfil();
    this.editMode = false;
  }
}

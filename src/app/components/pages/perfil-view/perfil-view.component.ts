import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil, Imagen, Response } from 'src/app/interfaces';
import { Sesion } from '../../../common/sesion';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {

  perfilForm!: FormGroup;
  imagenes: Imagen[] = [];
  @Input() perfil: Perfil = new Perfil();
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
      id: [''],
      names: [''],
      lastnames: ['']
    });
  }

  cargarDatosPerfil(): void {
    const id = this.mySesion.perfil.id ?? 0
    this.usuariosService.getSingle(id).subscribe({
      next: (response: Response) => {
        const decryptedProfile = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
        if (decryptedProfile) {
          this.perfilForm.patchValue(decryptedProfile);
        }

        // Si el perfil tiene imagen asociada
        if (decryptedProfile.picture) {
          this.imagenes = [{
            id: null,
            url: decryptedProfile.picture,
            base64: null
          }];
        }
      },
      error: (error) => console.error(error)
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.mySesion.loadingStart();
      // Crear el cuerpo del JSON para enviar al backend
      const payload: any = { ...this.perfilForm.value };

      // Agregar imagen si existe
      if (this.imagenes.length > 0 && this.imagenes[0]?.base64) {
        payload.picture = this.imagenes[0].base64; // Agregar imagen en formato base64
      }

      // Llamar al servicio para actualizar el perfil
      this.usuariosService.updateProfile(payload).subscribe({
        next: (response: Response) => {
          this.mySesion.loadingStop();
          this.mySesion.createSuccess(response.msg || 'Perfil actualizado');
        },
        error: (error) => {
          this.mySesion.loadingStop();
          this.mySesion.createError(error.error.msg || 'Error Actualizando Perfil');
        }
      });
    }
  }

  // Método para manejar la imagen cargada desde el componente app-imagenes
  actualizarImagen(imagenes: Imagen[]): void {
    this.imagenes = imagenes;
  }

  cancelar(): void {
    this.cargarDatosPerfil();
  }
}

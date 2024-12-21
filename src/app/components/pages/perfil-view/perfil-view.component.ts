import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/interfaces';

@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();

  perfilForm!: FormGroup;
  _token!: string;
  private _validacion!: boolean;
  @Input() editMode: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Inicializa el formulario con los datos del perfil
  initForm(): void {
    this.perfilForm = this.fb.group({
      usuario: [this.perfil.username || '', [Validators.required]],
      nombre: [this.perfil.names || '', [Validators.required]],
      email: [this.perfil.email || '', [Validators.required, Validators.email]],
      telefono: [this.perfil.phone || ''],
    });
  }

  // Lógica para guardar los cambios
  onSubmit(): void {
    if (this.perfilForm.valid) {
      // Aquí puedes agregar lógica para enviar los cambios al backend
      console.log('Formulario enviado:', this.perfilForm.value);

      // Actualizamos el perfil y desactivamos el modo edición
      this.perfil = { ...this.perfil, ...this.perfilForm.value };
    }
  }
  @Input()
  set token(value: string) {
    this._token = value;
  }
  get token(): string {
    return this._token;
  }
  get validacion(): boolean {
    return this._validacion;
  }
  @Input()
  set validacion(value: boolean) {
    this._validacion = value;
  }
}

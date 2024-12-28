import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from "./../../interfaces";
import { Sesion } from "./../../common/sesion";
import { AuthServices } from "./../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public uuid = '';
  public authProfile: string | null = '';
  public titulo = '';
  public errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private authServices: AuthServices,
    private mySesion: Sesion,
  ) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.uuid = this.route.snapshot.paramMap.get("uuid") || '';
    if (this.uuid != '') {
      this.restore(this.uuid);
    }
  }

  restore(uuid: string) {
    const dat: any = { uuid: btoa(uuid) };

    const authServ = this.authServices.recovery(dat).subscribe({
      next: (response: Response) => {
        if (response.status !== 200) {
          this.handleError('No se encuentra el usuario ingresado, es posible que el token ya haya sido utilizado');
          return;
        }

        const perfil = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
        this.authProfile = perfil ? response.objeto : '';
        if (!this.authProfile) {
          this.handleError('El token ya fue utilizado o no es válido');
        }
        this.mySesion.loadingStop();
      },
      error: () => {
        this.handleError('No se encuentra el usuario ingresado, es posible que el token ya haya sido utilizado');
      },
      complete: () => {
        authServ.unsubscribe();
      }
    });
  }

  handleError(message: string) {
    this.errorMessage = message;
    this.mySesion.createError(message);
    this.mySesion.loadingStop();
    setTimeout(() => {
      this.mySesion.navegar({ url: '/' });
    }, 5000);
  }
}

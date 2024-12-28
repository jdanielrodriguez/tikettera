import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { AuthServices } from "src/app/services/auth.service";
// import { ProveedoresService } from "src/app/services/proveedores.service";
import { ImagenesComponent } from "./../../components/imagenes/imagenes.component";
import {
  Perfil,
  Imagen,
  FilterGET,
} from "src/app/interfaces";
import { Sesion } from 'src/app/common/sesion';
import { Formatos } from 'src/app/common/format';
declare var $: any;
@Component({
  selector: "app-sliders-form",
  templateUrl: "./sliders-form.component.html",
  styleUrls: ["./sliders-form.component.css"],
})
export class SlidersFormComponent implements OnInit {
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  sliders: Imagen[] = [];
  titulo!: string;
  muestraTexto!: boolean;
  constructor(
    private mySesion: Sesion,
    private formatear: Formatos,
    private authService: AuthServices,
    // private provsService: ProveedoresService
  ) { }
  ngOnInit(): void {
    $("html, body").animate({ scrollTop: 0 }, "300");
    this.obtenerSliders();
  }
  cargarImagen(resp: Imagen) {
    // if (resp.id > 0) {
    //   resp.proveedor = this.perfil.id;
    //   if (this.sliders) {
    //     this.sliders.push(resp);
    //   } else {
    //     this.sliders = [resp];
    //   }
    // }
  }
  obtenerSliders() {
    this.mySesion.loadingStart();
    let data: FilterGET = {
      id: 0,
      filter: "imagenes",
      estado: "",
    };
    this.sliders = [];
    // this.provsService
    //   .getAllFilter(data)
    //   .then((response: Imagen[]) => {
    //     this.sliders = response;
    //     this.blockUI.stop();
    //   })
    //   .catch((error) => {
    //     this.blockUI.stop();
    //     console.log(error);
    //   });
    this.mySesion.loadingStop();
  }
  guardar() {
    this.mySesion.loadingStart();
    if (this.sliders.length > 0) {
      let respuesta: Imagen[] = [];
      // this.sliders.forEach(async (element: Imagen) => {
      //   // element.proveedor = this._perfil.id;
      //   const authServ = this.authService
      //     .updateImage(element)
      //     .subscribe({
      //       next: (element: Imagen) => {
      //         respuesta.push(element);
      //         this.createSuccess("Se actualizo la informacion de tus sliders");
      //       },
      //       error: (error) => {
      //         this.createError("Error actualizando Imagen");
      //       },
      //       complete: () => { authServ.unsubscribe(); }
      //     });
      // });
      this.sliders = respuesta;
    }
    this.mySesion.loadingStop();
  }
  eliminarFoto(value: Imagen) {
    this.mySesion.loadingStart();
    let index = this.sliders.findIndex((element: Imagen) => {
      return element.id == value.id;
    });
    if (index >= 0) {
      // const authServ = this.authService
      //   .deleteImage(Number(value.id))
      //   .subscribe({
      //     next: (element: Imagen) => {
      //       if (value) {
      //         this.createSuccess("Se elimino la imagen correctamente");
      //         this.blockUI.stop();
      //         this.obtenerSliders()
      //       }
      //     },
      //     error: (error) => {
      //       this.createError("Imagen no se pudo Eliminar");
      //       if (error.indexOf('401') >= 0) {
      //         this.mySesion.navegar({ url: './logout' })
      //       }
      //       console.log(error);
      //     },
      //     complete: () => { authServ.unsubscribe(); }
      //   });
    } else {
      this.mySesion.createError("Imagen no encontrada");
    }
    this.mySesion.loadingStop();
  }
}

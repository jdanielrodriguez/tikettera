import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AdvertisementsService } from "../../services/advertisements.service";
// import { ProveedoresService } from "src/app/services/proveedores.service";
import { ImagenesComponent } from "../imagenes/imagenes.component";
import {
  Perfil,
  Imagen,
  FilterGET,
} from "src/app/interfaces";
import { Sesion } from 'src/app/common/sesion';
import { Formatos } from 'src/app/common/format';
declare var $: any;
@Component({
  selector: "app-advertisements",
  templateUrl: "./advertisements.component.html",
  styleUrls: ["./advertisements.component.css"],
})
export class AdvertisementsFormComponent implements OnInit {
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  advertisements: Imagen[] = [];
  titulo!: string;
  muestraTexto!: boolean;
  constructor(
    private mySesion: Sesion,
    private formatear: Formatos,
    private advertisementsService: AdvertisementsService,
    // private provsService: ProveedoresService
  ) { }
  ngOnInit(): void {
    this.mySesion.scrollTop();
    this.obtenerAdvertisements();
  }
  cargarImagen(resp: Imagen) {
    // if (resp.id > 0) {
    //   resp.proveedor = this.perfil.id;
    //   if (this.advertisements) {
    //     this.advertisements.push(resp);
    //   } else {
    //     this.advertisements = [resp];
    //   }
    // }
  }
  obtenerAdvertisements() {
    this.mySesion.loadingStart();
    let data: FilterGET = {
      id: 0,
      filter: "imagenes",
      estado: "",
    };
    this.advertisements = [];
    // this.provsService
    //   .getAllFilter(data)
    //   .then((response: Imagen[]) => {
    //     this.advertisements = response;
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
    if (this.advertisements.length > 0) {
      let respuesta: Imagen[] = [];
      // this.advertisements.forEach(async (element: Imagen) => {
      //   // element.proveedor = this._perfil.id;
      //   const authServ = this.authService
      //     .updateImage(element)
      //     .subscribe({
      //       next: (element: Imagen) => {
      //         respuesta.push(element);
      //         this.createSuccess("Se actualizo la informacion de tus advertisements");
      //       },
      //       error: (error) => {
      //         this.createError("Error actualizando Imagen");
      //       },
      //       complete: () => { authServ.unsubscribe(); }
      //     });
      // });
      this.advertisements = respuesta;
    }
    this.mySesion.loadingStop();
  }
  eliminarFoto(value: Imagen) {
    this.mySesion.loadingStart();
    let index = this.advertisements.findIndex((element: Imagen) => {
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
      //         this.obtenerAdvertisements()
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

import { Component, OnInit, ViewChild } from "@angular/core";
import { Advertisement, Imagen, ResponseAdvertisement } from "../../interfaces";
import { AdvertisementsService } from "../../services/advertisements.service";
import { Sesion } from "../../common/sesion";

@Component({
  selector: "app-advertisements",
  templateUrl: "./advertisements.component.html",
  styleUrls: ["./advertisements.component.css"],
})
export class AdvertisementsFormComponent implements OnInit {
  @ViewChild("slidersComponent") slidersComponent: any;
  advertisements: Advertisement[] = [];
  sliders: Imagen[] = [];
  formAdvertisement: Partial<Advertisement> = {
    name: "",
    slug: "",
    description: "",
    picture: null,
  };

  constructor(
    private mySesion: Sesion,
    private advertisementsService: AdvertisementsService
  ) { }

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  cargarImagen(imagenes: Imagen[]) {
    if (imagenes.length > 0) {
      const nuevaImagen = imagenes[imagenes.length - 1]; // Última imagen emitida
      this.formAdvertisement.picture = nuevaImagen;
    }
  }

  guardarAdvertisement(): void {
    if (!this.formAdvertisement.name || !this.formAdvertisement.slug || !this.formAdvertisement.picture) {
      this.mySesion.createError("Por favor, complete todos los campos del formulario.");
      return;
    }
    this.mySesion.loadingStart();
    const newAdvertisement: Advertisement = {
      id: null,
      name: this.formAdvertisement.name,
      slug: this.formAdvertisement.slug,
      description: this.formAdvertisement.description,
      url: this.formAdvertisement.picture?.url || "",
      pictureBase64: this.formAdvertisement.picture?.base64 || "",
      type: 1,
      state: 1,
      event_id: null,
      user_id: this.mySesion.perfil.id || null,
    };

    const request = this.advertisementsService.createAdvertisement(newAdvertisement).subscribe({
      next: (response: ResponseAdvertisement) => {
        const advertisement = response.objeto ?? null;
        if (advertisement) {
          this.advertisements.push(advertisement);
          this.sliders.push({
            id: advertisement.id,
            url: advertisement.url || "",
            titulo: advertisement.name,
            descripcion: advertisement.description,
          });
          this.resetForm();
          this.mySesion.createSuccess("Anuncio creado correctamente.");
        }
      },
      error: () => {
        this.mySesion.createError("Error al crear el anuncio.");
      },
      complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
    });
  }

  eliminarFoto(imagen: Imagen): void {
    const advertisement = this.advertisements.find((ad) => ad.url === imagen.url);
    if (!advertisement) return;
    this.mySesion.loadingStart();
    const request = this.advertisementsService.deleteAdvertisement(advertisement.id!).subscribe({
      next: () => {
        this.advertisements = this.advertisements.filter((ad) => ad.id !== advertisement.id);
        this.sliders = this.sliders.filter((slider) => slider.url !== imagen.url);
        this.mySesion.createSuccess("Anuncio eliminado correctamente.");
      },
      error: () => {
        this.mySesion.createError("Error al eliminar el anuncio.");
      },
      complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
    });
  }

  resetForm(): void {
    this.formAdvertisement = {
      name: "",
      slug: "",
      description: "",
      picture: null,
    };

    // Notificar al componente ImagenesComponent para resetear su estado
    this.slidersComponent?.resetImagen();
  }


  loadAdvertisements(): void {
    this.mySesion.loadingStart();
    const request = this.advertisementsService.getAdvertisements().subscribe({
      next: (data) => {
        this.advertisements = data.objeto;
        this.sliders = this.advertisements.map((ad) => ({
          id: ad.id,
          url: ad.url || "",
          titulo: ad.name || "",
          descripcion: ad.description || "",
        }));
      },
      error: () => {
        this.mySesion.createError("Error al cargar los anuncios.");
      },
      complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
    });
  }
}

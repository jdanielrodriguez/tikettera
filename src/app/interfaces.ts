export class Rol {
  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.state = 1;
  }
  id?: number | null | undefined;
  name?: string;
  description?: string;
  state?: number;
}
export class Menus {
  constructor() {
    this.inicio = false;
    this.nombre = '';
    this.url = '';
    this.rol = 1;
  }
  sesion?: boolean;
  select?: boolean;
  clienteOnly?: boolean;
  inicio?: boolean;
  url: string;
  evento?: any;
  nombre?: string;
  rol?: number;
  submenu?: Menus[];
}
export class Perfil {
  constructor(form?: { email: string, password: string }
  ) {
    this.last_link = '';
    this.facebook_id = '';
    this.google_id = '';
    this.username = '';
    this.token = '';
    this.google_token = '';
    this.formas_pago = [];
    this.picture = 'https://robohash.org/68.186.255.198.png';
    this.google_id_token = '';
    this.twitter_id = '';
    this.tiktok_id = '';
    this.code = '';
    this.names = '';
    this.description = '';
    this.phone = '';
    this.pic1 = '';
    this.pic2 = '';
    this.state = 1;
    this.pic3 = '';
    this.auth_type = 'simple';
    this.id = null;
    if (form) {
      this.email = form.email;
      this.username = form.email.split("@")[0];
      this.password = form.password;
    }
  }
  id?: number | null;
  username?: string;
  password?: string;
  password_rep?: string;
  email?: string;
  code?: string;
  names?: string;
  phone?: string;
  description?: string;
  image?: string;
  birth?: string;
  picture?: string;
  last_conection?: Date;
  twitter_id?: string;
  tiktok_id?: string;
  facebook_id?: string;
  google_id?: string;
  google_token?: string;
  google_id_token?: string;
  pic1?: string;
  pic2?: string;
  pic3?: string;
  token?: string;
  auth_type?: string;
  state?: number;
  rol_id?: number;
  rol?: Rol;

  formas_pago?: MetodoPago[];
  last_link?: string;
}
export class Socialusers extends Perfil {
  firstName?: string;
  lastName?: string;
  authToken?: string;
  photoUrl?: string;
  idToken?: string;
  google_idToken?: string;
  google?: string;
  imagen?: string;
}
export class Comentario {
  constructor(
  ) {
    this.comentario = '';
    this.id = null;
    this.usuario = null;
    this.comment = null;
    this.recive = null;
    this.inventario = null;
    this.url = null;
  }
  comentario?: string;
  creado?: Date;
  leido?: Date;
  recive?: boolean | null;
  usuario?: number | null;
  usuario_obj?: Perfil;
  id?: number | null | undefined;
  comment?: number | null;
  comment_obj?: Perfil;
  inventario?: number | null;
  url?: string | null;
}
export class Reaccion {
  constructor(
  ) {
    this.url = '';
    this.id = null;
    this.usuario = null;
    this.default = null;
    this.estado = null;
    this.path = null;
    this.orden = '0';
  }
  url?: string;
  default?: number | null;
  orden?: string;
  path?: string | null;
  estado?: number | null;
  id?: number | null | undefined;
  usuario?: number | null;
  usuario_obj?: Perfil;
  proveedor?: number;
  like?: number;
  like_obj?: Perfil;
  tipo_forma_pago?: number;
  direccion?: number;
  tipo_item?: number;
}
export class ChangePasswordForm {
  constructor(form?: { old_pass: string, new_pass: string, new_pass_rep: string }) {
    this.id = null;
    this.old_pass = '';
    this.new_pass = '';
    this.new_pass_rep = '';
    this.perfil = new Perfil();
    if (form) {
      this.old_pass = btoa(form.old_pass);
      this.new_pass = btoa(form.new_pass);
      this.new_pass_rep = btoa(form.new_pass_rep);
    }
  }
  id?: number | null | undefined | string;
  old_pass?: string | null;
  new_pass?: string;
  new_pass_rep?: string;
  token?: string;
  perfil?: Perfil;

}
export class Factura {
  constructor() {
    this.id = null;
  }
  tokenReal?: string;
  aprobacion?: string;
  cliente?: Perfil;
  clienteId?: number;
  codigo?: string;
  eliminar?: string;
  comprobante?: string;
  descripcion?: string;
  detalles?: FacturaDetalle[];
  uuid?: string;
  direccion?: string;
  direcciones?: Direccion;
  ern?: string;
  estado?: number;
  pasarela?: number;
  fecha?: Date;
  fecha_aprobacion?: Date;
  fecha_aprobacionT?: string;
  forma_pago?: any;
  formas_pago?: MetodoPago;
  id?: number | null | undefined;
  latitud?: number;
  longitud?: number;
  proveedor?: Perfil;
  tipo?: any;
  tipo_venta?: number;
  token?: string;
  tokenBusqueda?: string;
  total?: number;
  vencimiento?: string;
}
export class MetodoPago {
  constructor() {
    this.user_id = null;
    this.payment_type_id = 1;
    this.card_number = '';
    this.expiration_date = '';
    this.cvv = '';
    this.exp_yearTC = '';
    this.exp_montTC = '';
    this.card_name = '';
    this.is_default = false;
    this.id = null;
  }

  user_id?: number | null;
  payment_type_id?: number;
  card_number?: string;
  expiration_date?: string;
  cvv?: string;
  is_default?: boolean;
  paypalToken?: string;
  exp_yearTC?: string;
  exp_montTC?: string;
  card_name?: string;
  bank_name?: string;
  account_number?: string;
  account_holder?: string;
  swift?: string;
  balance?: number | null;
  id?: number | null;
}
export class FacturaDetalle {
  cantidad?: number;
  descuento?: number;
  estado?: number;
  id?: number;
  precio?: number;
  precio_especial?: number;
  producto?: Producto;
  subtotal?: number;
  venta?: Factura;
}
export class ListaBusqueda {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.slug = '';
    this.imagen = 'https://via.placeholder.com/250x200';
    this.validacion = 5;
  }
  id?: number | null | undefined;
  nombre?: string;
  description?: string;
  address?: string;
  imagen?: string;
  picture?: string;
  name?: string;
  price?: number;
  total?: number;
  withdrawall?: number;
  tasa_cambio?: number;
  tasa_iva?: number;
  slug?: string;
  event_slug?: string;
  imagenes?: Imagen[];
  objeto?: any;
  validacion?: number;
  date_start?: Date;
  time_start?: string;
  cantidad?: number;
  defaultPlaces?: Place[];
  selectedPlaces?: Place[];
}
export class Producto {
  constructor() {
    this.id = null;
    this.estado = 1;
    this.inventario = 0;
    this.cantidad = 0;
    this.color = '';
    this.talla = '';
    this.tamanio = '';
    this.estilo = '';
    this.imagenes = [];
  }
  id?: number | null | undefined;
  codigo?: string;
  estilo?: string;
  cantidad?: number;
  talla?: string;
  tamanio?: string;
  color?: string;
  estado?: number;
  pasarela?: number;
  comision?: number;
  retiro?: number;
  inventario?: number;
  imagenes?: Imagen[];
}

export class Configuracion {
  constructor(public proveedorId?: number, public tipoId?: number) {
    this.id = null;
    this.proveedor = proveedorId ? proveedorId : null;
    this.color_nav = '';
    this.carrousel = '';
    this.sujeto = '';
    this.css = '';
    this.foto = '';
    this.footer = '';
    this.opciones = '';
    this.mensaje = '';
    this.imagenes = [];
    this.tipo = tipoId ? tipoId : 0;
    this.estado = 1;
    this.default = 1;
  }
  id?: number | null | undefined;
  logo?: string;
  color_nav?: string;
  carrousel?: string;
  default?: number;
  mensaje?: string;
  imagenes?: Imagen[];
  sujeto?: string;
  css?: string;
  footer?: string;
  opciones?: string;
  foto?: string;
  estado?: number;
  tipo?: number;
  proveedor?: number | null;
}

export class Imagen {
  constructor() {
    this.id = null;
    this.url = 'https://via.placeholder.com/50X50';
    this.base64 = null;
    this.titulo = '';
    this.descripcion = '';
  }

  id?: number | null;
  url: string;
  base64?: string | null;
  titulo?: string;
  descripcion?: string;
}
export class Advertisement {
  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.slug = '';
    this.url = '';
    this.picture = new Imagen();
    this.type = 1;
    this.state = 1;
    this.event_id = null;
    this.user_id = null;
  }

  id?: number | null;
  name?: string;
  description?: string;
  slug?: string;
  url?: string;
  picture?: Imagen | null;
  pictureBase64?: string | null;
  type?: number;
  state?: number;
  event_id?: number | null;
  user_id?: number | null;
}

export class Direccion {
  constructor() {
    this.id = null;
    this.calle = '';
    this.casa = '';
    this.pais = 'Guatemala';
    this.zona = '';
    this.default = 0;
    this.direccion_envio = '';
    this.usuario = new Perfil();
  }
  id?: number | null | undefined;
  calle?: string;
  casa?: string;
  pais?: string;
  departamento?: string;
  municipio?: string;
  zona?: string;
  latitud?: string;
  longitud?: string;
  direccion_envio?: string;
  recibe?: string;
  default?: number;
  tipo_direccion?: number;
  usuario?: Perfil;
}

export class FilterGET {
  constructor() {
    this.id = 0;
    this.estado = '0';
    this.filter = 'nada';
  }
  id: number | null | undefined;
  estado: string;
  filter: string;
}

export class Pasarela {
  constructor() {
    this.nombre = 'No Seleccionada';
    this.porcentaje = 0;
    this.plus = 0;
  }
  nombre?: string;
  logo?: string;
  id?: number;
  porcentaje?: number;
  cambio?: number;
  plus?: number;
  estado?: number;
}

export class Comision {
  constructor() {
    this.descripcion = 'No Seleccionada';
    this.porcentaje = 0;
    this.plus = 0;
    this.cambio = 0;
  }
  descripcion?: string;
  minimo?: number;
  maximo?: number;
  plus?: number;
  porcentaje?: number;
  cambio?: number;
  tipo?: number;
  estado?: number;
}

export class Caja {
  constructor() {
    this.saldo = 0;
    this.debitos = 0;
    this.creditos = 0;
  }
  status?: number;
  creditosTotales?: number;
  debitosTotales?: number;
  creditos?: number;
  debitos?: number;
  impuestosCredito?: number;
  impuestosDebito?: number;
  pasarelaCredito?: number;
  pasarelaDebito?: number;
  plataformaCredito?: number;
  plataformaDebito?: number;
  saldo?: number;
}

export class HistoricoCaja {
  constructor() {
    this.total = 0;
  }
  total?: number;
  cambio?: number;
  tipo?: number;
  estado?: number;
  impuesto?: number;
  comision?: number;
  usuario?: number;
  proveedor?: number;
  cliente?: number;
  fecha?: Date;
  venta?: number;
  gasto?: number;
  token?: string;
  vieneDe?: number;
  pasarela?: number;
  tipo_forma_pago?: number;
  tipo_transaccion?: number;
}

// Tikettera
export class Event {
  constructor() {
    this.localities = [];
  }

  id?: number | null;
  name?: string | null;
  picture?: string | null;
  slug?: string | null;
  description?: string | null;
  address?: string | null;
  time_start?: string | null;
  time_end?: string | null;
  date_start?: string | null;
  date_end?: string | null;
  start?: string | null; // Timestamp combining date and time (start)
  end?: string | null; // Timestamp combining date and time (end)
  lat?: number | null;
  lng?: number | null;
  reason_id?: number | null;
  type_id?: number | null;
  state?: number | null;
  created_at?: string | null;
  updated_at?: string | null;

  localities: Locality[];
}

export class Locality {
  constructor() {
    this.places = [];
  }

  id?: number | null;
  name?: string | null;
  description?: string | null;
  slug?: string | null;
  tasa_cambio?: number | null; // Exchange rate
  iva?: number | null; // VAT amount
  tasa_iva?: number | null; // VAT rate
  comision?: number | null; // Commission amount
  price?: number | null;
  sold?: number | null; // Tickets sold
  withdrawall?: number | null; // Withdrawn tickets
  state?: number | null;
  event_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;

  places: Place[];
  event?: Event;
}

export class Place {
  constructor() {
    this.state = 1; // Default state is available
    this.price = 0;
  }

  id?: number | null;
  name?: string | null;
  description?: string | null;
  slug?: string | null;
  seat_number?: string | null; // Seat identifier
  price?: number | null;
  x?: number | null; // X-coordinate for SVG mapping
  y?: number | null; // Y-coordinate for SVG mapping
  sold?: number | null; // Number of seats sold
  avaliable?: number | null; // Availability flag (1 = available, 0 = not available)
  state?: number | null; // Current state of the place
  locality_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// HTTP
class CaptchaObj {
  constructor() {
    this.success = false;
    this.challenge_ts = (new Date()).toLocaleString();
    this.hostname = '';
    this.score = 0;
    this.action = '';
  }
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

export class RSP {
  constructor() {
    this.status = 500;
  }
  status: number;
  msg?: string;
}

export class Response extends RSP {
  constructor() {
    super();
    this.objeto = null;
  }
  objeto: string | null;
}

export class ResponseUser extends RSP {
  constructor() {
    super();
    this.objeto = null;
  }
  objeto: Perfil | null;
}
export class ResponseEvent extends RSP {
  constructor() {
    super();
    this.objeto = null;
    this.count = null;
    this.cripto = null;
  }
  count: number | null;
  objeto: Event | null;
  cripto: string | null;
}
export class ResponseLocality extends RSP {
  constructor() {
    super();
    this.objeto = null;
    this.count = null;
  }
  count: number | null;
  objeto: Locality | null;
}

export class ResponseCAPTCHA extends RSP {
  constructor() {
    super();
    this.objeto = new CaptchaObj();
  }
  objeto: CaptchaObj;
}


export class ResponseAdvertisement extends RSP {
  constructor() {
    super();
    this.objeto = null;
  }
  objeto: Advertisement | null;
}

export class ResponseAdvertisementList extends RSP {
  constructor() {
    super();
    this.objeto = [];
    this.count = 0;
  }
  objeto: Advertisement[];
  count: number;
}

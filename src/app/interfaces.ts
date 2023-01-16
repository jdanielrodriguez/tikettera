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
    this.lastnames = '';
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
  lastnames?: string;
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
  constructor() {
    this.id = null;
    this.old_pass = '';
    this.new_pass = '';
    this.new_pass_rep = '';
    this.perfil = new Perfil();
  }
  id?: number | null | undefined;
  old_pass?: string;
  new_pass?: string;
  new_pass_rep?: string;
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
    this.noTC = '';
    this.mtVencimiento = '';
    this.yrVencimiento = '';
    this.cvvTC = '';
    this.envio = '';
    this.token = '';
    this.nombre = '';
    this.id = null;
    this.tipo_forma_pago = 1;
    this.default = 0;
    this.exp_montTC = '';
    this.exp_yearTC = '';
    this.numeroTC = '';
    this.exp_dateTC = '';
    this.nombreTC = '';
    this.paypalToken = '';
    this.tipo = '';
  }
  noTC?: string;
  id?: string | null;
  mtVencimiento?: string;
  nameTC?: string;
  yrVencimiento?: string;
  cvvTC?: string;
  envio?: string;
  token?: string;
  tipo?: string;
  cod?: string;
  default?: number;
  cambio?: number;
  total?: number;
  nombre?: string;
  componente?: any;
  paypalToken?: string;
  nombreTC?: string;
  exp_dateTC?: string;
  numeroTC?: string;
  cuenta?: string;
  nombreCuenta?: string;
  exp_yearTC?: string;
  exp_montTC?: string;
  tipo_forma_pago?: number;
  pasarela?: number;
  clave?: string;
  estado?: number;
  usuario?: number;
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
  imagen?: string;
  slug?: string;
  imagenes?: Imagen[];
  objeto?: any;
  validacion?: number;
  cantidad?: number;
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
    this.titulo = '';
    this.descripcion = '';
    this.estado = 1;
  }
  id?: number | null | undefined;
  url: string;
  default?: string;
  orden?: string;
  titulo?: string;
  descripcion?: string;
  path?: string;
  estado?: number;
  cliente?: number;
  proveedor?: number;
  usuario?: number;
  producto?: number;
  configuracion?: number;
  inventario?: number;
  item?: number;
  tipo_item?: number;
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

export class Locality {
  constructor() {
    this.id = null;
    this.name = '';
    this.picture = '';
    this.description = '';
    this.address = '';
    this.event = {};
  }
  id?: number | null | undefined;
  name?: string;
  picture?: string;
  description?: string;
  address?: string;
  slug?: string;
  time_start?: Date;
  time_end?: Date;
  date_start?: Date;
  date_end?: Date;
  start?: Date;
  end?: Date;

  lat?: number;
  lng?: number;
  type?: number;
  state?: number;

  event_id?: number;
  event?: Configuracion;
  created_at!: Date;
  updated_at!: Date;
}

export class Response {
  constructor() {
    this.status = 500;
    this.objeto = null;
  }
  status: number;
  objeto: string | null;
  msg?: string;
}

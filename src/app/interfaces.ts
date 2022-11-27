export class Socialusers {
  provider?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  image?: string;
  token?: string;
  authToken?: string;
  photoUrl?: string;
  idToken?: string;
  google_id?: string;
  google_token?: string;
  google_idToken?: string;
  google?: string;
  imagen?: string;
  username?: string;
  password?: string;
  nombres?: string;
  codigo?: string;
  apellidos?: string;
  rol?: string;
  nacimiento?: string;
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
  constructor(
  ) {
    this.last_link = '';
    this.facebook_id = '';
    this.one_signal_id = '';
    this.google_id = '';
    this.token = '';
    this.google_token = '';
    this.formas_pago = [];
    this.direcciones = [];
    this.imagenes = [];
    this.google_idToken = '';
  }
  provider?: string;
  id?: number;
  name?: string;
  image?: string;
  idToken?: string;
  google?: string;
  imagen?: string;
  formas_pago?: MetodoPago[];
  direcciones?: Direccion[];
  imagenes?: Imagen[];
  picture?: string;
  empleados?: Empleado[];
  clientes?: Cliente[];
  proveedores?: Proveedor[];
  username?: string;
  password_rep?: string;
  password?: string;
  email?: string;
  nombre?: string;
  codigo?: string;
  nacimiento?: string;
  last_link?: string;
  foto?: string;
  last_conection?: string;
  facebook_id?: string;
  one_signal_id?: string;
  google_id?: string;
  google_token?: string;
  google_idToken?: string;
  token?: string;
  estado?: number;
  rol?: Rol;
  referido?: Perfil;
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
  id?: number | null;
  comment?: number | null;
  comment_obj?: Perfil;
  inventario?: number | null;
  inventario_obj?: Inventario;
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
    this.inventario = null;
  }
  url?: string;
  default?: number | null;
  orden?: string;
  path?: string | null;
  estado?: number | null;
  id?: number | null;
  usuario?: number | null;
  usuario_obj?: Perfil;
  proveedor?: number;
  proveedor_obj?: Proveedor;
  like?: number;
  like_obj?: Perfil;
  inventario?: number | null;
  inventario_obj?: Inventario;
  tipo_forma_pago?: number;
  direccion?: number;
  tipo_item?: number;
}
export class Empleado {
  id?: number;
  nombre?: string;
  apellido?: string;
  direccion?: string;
  telefono?: string;
  celular?: string;
  sueldo?: number;
  estado?: number;
  puesto?: number;
}
export class Identificador {
  carrito?: Carrito[];
  proveedor?: Proveedor;
  token?: string;
  aprobacion?: string;
}
export class IdentificadorQ {
  carrito?: string;
  proveedor?: string;
  token?: string;
  carritoEliminar?: string;
}
export class ChangePasswordForm {
  constructor() {
    this.id = null;
    this.old_pass = '';
    this.new_pass = '';
    this.new_pass_rep = '';
    this.perfil = new Perfil();
  }
  id?: number | null;
  old_pass?: string;
  new_pass?: string;
  new_pass_rep?: string;
  perfil?: Perfil;

}
export class Proveedor {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.apellido = '';
    this.nit = '';
    this.dpi = '';
    this.estado = 1;
    this.usuario = new Perfil();
    this.imagenes = [];
    this.configuraciones = [];
  }
  id?: number | null;
  direccion?: string;
  telefono?: string;
  nacimiento?: string;
  celular?: string;
  sueldo?: number;
  imagenes?: Imagen[];
  nombre?: string;
  apellido?: string;
  nit?: string;
  comercio?: string;
  dpi?: string;
  foto?: string;
  estado?: number;

  usuario?: Perfil;
  configuraciones: Configuracion[];
  created_at!: Date;
  updated_at!: Date;
}
export class Cliente {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.apellido = '';
    this.nombre_a_facturar = '';
    this.dpi = '';
    this.nit = '';
    this.telefono = '';
    this.estado = 1;
    this.usuario = new Perfil();
    this.imagenes = [];
  }
  id?: number | null;
  direccion?: string;
  cuenta?: string;
  nombre?: string;
  apellido?: string;
  nit?: string;
  nombre_a_facturar?: string;
  dpi?: string;
  telefono?: string;
  foto?: string;
  imagenes?: Imagen[];
  estado?: number;

  usuario?: Perfil;
}
export class Rol {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.estado = 1;
  }
  id?: number | null;
  nombre?: string;
  estado?: number;
}
export class Factura {
  constructor() {
    this.id = null;
  }
  tokenReal?: string;
  aprobacion?: string;
  cliente?: Cliente;
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
  id?: number | null;
  latitud?: number;
  longitud?: number;
  proveedor?: Proveedor;
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
    this.productos = [];
    this.carrito = [];
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
  productos?: Inventario[];
  carrito?: Carrito[];
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
    this.imagen = 'https://placehold.it/250x200';
    this.validacion = 5;
    this.inventario = new Inventario();
  }
  id?: number | null;
  nombre?: string;
  imagen?: string;
  imagenes?: Imagen[];
  objeto?: any;
  validacion?: number;
  cantidad?: number;
  inventario?: Inventario;
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
  id?: number | null;
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
export class Inventario {
  constructor() {
    this.id = null;
    this.portada = 'https://placehold.it/250x200';
    this.cantidad = 1;
    this.nombre = '';
    this.estado = 1;
    this.item = new Item();
    this.imagenes = [];
    this.productos = [];
    this.pasarela = 0;
    this.comision_venta = 0;
    this.iva = 0;
    this.retiro = 0;
  }
  id?: number | null;
  portada?: string;
  nombre?: string;
  descripcion?: string;
  codigo?: string;
  cantidad?: number;
  minimo?: number;
  precio?: number;
  comision?: number;
  precio_venta?: number;
  comision_venta?: number;
  precio_especial?: number;
  pasarela?: number;
  iva?: number;
  retiro?: number;
  descuento?: number;
  estado?: number;
  item?: Item;
  marca?: any;
  imagenes?: Imagen[];
  productos?: Producto[];
  presentaciones?: Producto[];
  sabores?: Producto[];
  tallas?: Producto[];
  colores?: Producto[];
}

export class Item {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.estado = 1;
    this.tipo_item = new TipoItem();
    this.proveedor = new Proveedor();
  }
  id?: number | null;
  nombre?: string;
  descripcion?: string;
  estado?: number;
  tipo_item?: TipoItem;
  proveedor?: Proveedor;
}

export class TipoItem {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.estado = 1;
    this.imagenes = [];
  }
  id?: number | null;
  nombre?: string;
  descripcion?: string;
  portada?: string;
  color?: string;
  css?: string;
  opciones?: string;
  estado?: number;
  imagenes?: Imagen[];
  proveedor?: Proveedor;
}
export class Carrito {
  constructor() {
    this.inventario = new Inventario();
    this.nombre = this.inventario.nombre;
    this.id = this.inventario.id;
    this.leido = false;
  }
  inventario?: Inventario;
  id?: number | null;
  cantidad?: number;
  nombre?: string;
  leido?: boolean;
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
  id?: number | null;
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
    this.url = 'https://placehold.it/50X50';
    this.titulo = '';
    this.descripcion = '';
    this.estado = 1;
  }
  id?: number | null;
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
  id?: number | null;
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
  id: number;
  estado: string;
  filter: string;
}

export class Wiki {
  constructor() {
    this.titulo = 'Nuevo Contenido';
    this.contenido = '';
  }
  uuid?: string;
  titulo?: string;
  contenido?: string;
  subtitulo?: string;
  creador?: number;
  modificador?: number;
  anterior?: Wiki;
  siguiente?: Wiki;
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

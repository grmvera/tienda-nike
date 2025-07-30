export interface Zapato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  colores: string[];
  tallas: number[];
  categoria: string;
  destacado?: boolean;
}

export interface Provincia {
     nombre?: string;
}
export interface Canton {
  id?: number;
  nombre?: string;
  Provinica?: Provincia;
}

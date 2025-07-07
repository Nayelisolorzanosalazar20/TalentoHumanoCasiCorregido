export interface Canton {
    id_canton?: number;
}
export interface Parroquia {
    id?: number;
    nombre?: string;
    Canton?: Canton;
}

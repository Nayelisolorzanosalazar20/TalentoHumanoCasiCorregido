export interface CategoriaOrdenanza { 
    descripcion?: string; 
} 
export interface YearMe { 
    mes?: string; 
    id_year?: number; 
} 
export interface Ordenanza { 
    id?: number; 
    descripcion?: string; 
    dia_publicacion?: number; 
    estado?: string; 
    url?: string; 
    url_RegistroOficial?: string; 
    CategoriaOrdenanza?: CategoriaOrdenanza; 
    YearMe?: YearMe; 
}

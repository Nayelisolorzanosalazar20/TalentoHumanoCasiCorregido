export interface Funcionario {
  id?: number;
  nombres?: string;
  apellidos?: string;
  edad?: number;
  DNI?: string;
  nacionalidad?: string;
  tipo_sangre?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  direccion_referencia?: string;
  residencia?: string;
  profesion?: string;
  fecha_inicio_contrato?: string;
  fecha_fin_contrato?: string;
  Numero_carnet_discapacidad?: string | number;
  genero_id?: number;
  estado_civil_id?: number;
  etnia_id?: number;
  parroquia_id?: number;
  tipo_discapacidad_id?: number;
  grado_discapacidad_id?: number;
  foto?: string;
  canton_id?: number; // <-- AGREGA ESTA LÍNEA
  provincia_id?: number;
  trayectoria_laboral?: any[];
  informacion_bancaria?: any[];
  discapacidad?: any[];
  canton_referencia_id?: number;
  parroquia_referencia_id?: number;
  provincia_residencia_id?: number;
  provincia_referencia_id?: number;
  canton_residencia_id?: number;
  parroquia_residencia_id?: number;
  contactos?: any[];
  capacitaciones?: any[];
  documentos?: any[];
  formacion_academica?: any[];
}
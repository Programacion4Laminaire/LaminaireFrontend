export interface AccessoryEquivalenceResponse {
  id: number;
  codigoPT: string;
  descripcionPT: string;
  codigoMP: string;
  descripcionMP: string;
  costo: number;
  fechaCreacion: string;

  // Para la tabla
  icEdit: string;
  icDelete: string;
}

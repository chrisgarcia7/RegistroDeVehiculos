export interface Entrada {
  id: number;
  vehiculo_id: number;
  placa_vehiculo: string;
  motorista: string;
  fecha_entrada: Date;
  hora_entrada: string;
  kilometraje: number;
  isAdentro: boolean;
}

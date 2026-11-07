export interface Reservavel {
  reservar(nomePessoa: string): void;
  cancelarReserva(): void;
  get reservaAtiva(): boolean;
}

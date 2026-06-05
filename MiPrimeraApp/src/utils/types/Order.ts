export type OrderStatus = 'pendiente' | 'en progreso' | 'completado';

export type Order = {
    id: string;
    customerId: string;
    tipoRopa: string;
    precio: string;
    fechaEntrega: string;
    fechaCreacion: string;
    estado: OrderStatus;
};

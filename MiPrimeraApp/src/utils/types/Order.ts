export type OrderStatus = 'pendiente' | 'en progreso' | 'completada';

export type Order = {
    id: string;
    customerId: string;
    tipoRopa: string;
    descripcion: string;
    precio: string;
    fechaEntrega: string;
    fechaCreacion: string;
    estado: OrderStatus;
};

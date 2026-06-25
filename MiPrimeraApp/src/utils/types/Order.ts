export type OrderStatus = 'pendiente' | 'en progreso' | 'completada';

export type Order = {
    id?: number;
    customerId: number;
    userid:string;
    tipoRopa: string;
    descripcion: string;
    precio: string;
    fechaEntrega: string;
    fechaCreacion: string;
    estado: OrderStatus;
    imagePath?: string;
};

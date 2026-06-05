import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../utils/types/Order";

type OrdersState = {
    orders: Order[];
};

const initialState: OrdersState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        updateOrder: (state, action: PayloadAction<Partial<Order>>) => {
            const index = state.orders.findIndex(o => o.id === action.payload.id);
            if (index !== -1) {
                Object.assign(state.orders[index], action.payload);
            }
        },
    },
});

export const { addOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import customerProfileReducer from "./slices/customerProfileSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        customers: customerProfileReducer,
        orders: orderReducer,
    },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerProfile } from "../../utils/types/Customer";

type CustomersState = {
    customers: CustomerProfile[];
};

const initialState: CustomersState = {
    customers: [],
};

const customerProfileSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<CustomerProfile>) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Partial<CustomerProfile>>) => {
            const index = state.customers.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                Object.assign(state.customers[index], action.payload);
            }
        },
    },
});

export const { addCustomer, updateCustomer } = customerProfileSlice.actions;

export default customerProfileSlice.reducer;

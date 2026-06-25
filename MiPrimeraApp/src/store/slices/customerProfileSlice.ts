import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerProfile } from "../../utils/types/Customer";
import { supabase } from "../../services/supabaseClient";

type CustomersState = {
    customers: CustomerProfile[];
};

const initialState: CustomersState = {
    customers: [],
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    // 1. get the currently authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return rejectWithValue('No authenticated user');

    // 2. filter customers by that user's uuid
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('userid', user.id);

    if (error)
        {
            console.log("Error al obtener clientes: ", error.message);
            return rejectWithValue(error.message);
        } 
    return data as CustomerProfile[];
  }
);

// 1. El thunk hace el trabajo asíncrono (la inserción en Supabase)
export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customer: CustomerProfile, { rejectWithValue }) => {
    const { data, error } = await supabase.from('clientes').insert({ ...customer }).select().single();
    if (error) {
      console.log("Hubo un error al agregar cliente", error.message);
      return rejectWithValue(error.message); // marca el thunk como "rejected"
    }
    return data as CustomerProfile; // se vuelve action.payload en "fulfilled"
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customer: CustomerProfile, { rejectWithValue }) => {
    const {data, error } = await supabase.from('clientes').update({ ...customer }).eq('id', customer.id).select().single();
    if (error) {
      console.log("Hubo un error al actualizar cliente", error.message);
      return rejectWithValue(error.message); // marca el thunk como "rejected"
    }
    return data as CustomerProfile;
  }
);

const customerProfileSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    builder
        .addCase(addCustomer.fulfilled, (state, action) => {
            state.customers.push(action.payload); // solo se añade si Supabase confirmó
        })
        .addCase(updateCustomer.fulfilled, (state, action) => {
            const index = state.customers.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
            state.customers = action.payload;
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            console.log("Error al obtener clientes", action.payload);
        });
  },
});

export const { } = customerProfileSlice.actions;

export default customerProfileSlice.reducer;

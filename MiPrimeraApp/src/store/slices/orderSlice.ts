import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../utils/types/Order";
import { supabase } from "../../services/supabaseClient";

type OrdersState = {
    orders: Order[];
};

const initialState: OrdersState = {
    orders: [],
};

type NewOrderInput = Omit<Order, 'id' | 'imagePath'> & { imageUri?: string };
type UpdateOrderInput = Omit<Order, 'imagePath'> & { imageUri?: string };

const uploadOrderImage = async (userId: string, orderId: number, imageUri: string) => {
    const extMatch = imageUri.match(/\.(\w+)$/);
    const ext = extMatch ? extMatch[1] : 'jpg';
    const path = `${userId}/${orderId}.${ext}`;

    const response = await fetch(imageUri);
    const arrayBuffer = await response.arrayBuffer();

    const { error } = await supabase.storage
        .from('almacenamientoapp')
        .upload(path, arrayBuffer, { contentType: `image/${ext}`, upsert: true });

    if (error) throw error;
    return path;
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return rejectWithValue('No authenticated user');

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('userid', user.id);

    if (error) {
        console.log("Error al obtener ordenes: ", error.message);
        return rejectWithValue(error.message);
    }
    return data as Order[];
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (order: NewOrderInput, { rejectWithValue }) => {
    const { imageUri, ...orderFields } = order;

    const { data, error } = await supabase
      .from('orders')
      .insert({ ...orderFields })
      .select()
      .single();

    if (error) {
      console.log("Hubo un error al agregar orden", error.message);
      return rejectWithValue(error.message);
    }

    let savedOrder = data as Order;

    if (imageUri) {
        try {
            const imagePath = await uploadOrderImage(order.userid, savedOrder.id!, imageUri);
            const { data: updated, error: updateError } = await supabase
                .from('orders')
                .update({ imagePath })
                .eq('id', savedOrder.id)
                .select()
                .single();
            if (updateError) {
                console.log("Error al guardar la imagen de la orden", updateError.message);
            } else {
                savedOrder = updated as Order;
            }
        } catch (e: any) {
            console.log("Error al subir la imagen de la orden", e.message);
        }
    }

    return savedOrder;
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (order: UpdateOrderInput, { rejectWithValue }) => {
    const { imageUri, ...orderFields } = order;
    let imagePath: string | undefined;

    if (imageUri) {
        try {
            imagePath = await uploadOrderImage(order.userid, order.id!, imageUri);
        } catch (e: any) {
            console.log("Error al subir la imagen de la orden", e.message);
            return rejectWithValue(e.message);
        }
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ ...orderFields, ...(imagePath && { imagePath }) })
      .eq('id', order.id)
      .select()
      .single();

    if (error) {
      console.log("Hubo un error al actualizar orden", error.message);
      return rejectWithValue(error.message);
    }
    return data as Order;
  }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    builder
        .addCase(addOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            const index = state.orders.findIndex(o => o.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            console.log("Error al obtener ordenes", action.payload);
        });
  },
});

export const { } = orderSlice.actions;

export default orderSlice.reducer;

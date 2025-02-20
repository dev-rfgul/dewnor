// import { createSlice } from '@reduxjs/toolkit';


// const cartSlice = createSlice({
//     name: "cart",
//     initialState: { items: [] },
//     reducers: {
//         addToCart: (state, action) => {
//             state.items.push(action.payload)
//         },
//         removeFromCart: (state, action) => {
//             state.items.filter(item => item.id !== action.payload)
//         }
//     }
// })

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Async action to add product to cart via API
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, userId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/product/add-to-cart`, product,userId);
            return response.data; // Returning added product
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

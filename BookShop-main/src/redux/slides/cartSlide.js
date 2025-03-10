import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cart")) || [],
        totalQuantity: 0
    },
    reducers: {
        updateCart: (state, action) => {
            state.cartItems = action.payload;
            state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem("cart", JSON.stringify(action.payload));
        },
    }
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer; 
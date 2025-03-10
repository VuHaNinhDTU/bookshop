import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                _id = '',
                name = '',
                email = '',
                access_token = '',
                address = '',
                avatar = '',
                phone = '',
                isAdmin = false
            } = action.payload;

            state.id = _id;
            state.name = name;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.access_token = access_token;
            state.isAdmin = Boolean(isAdmin);
        },
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.access_token = '';
            state.isAdmin = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer
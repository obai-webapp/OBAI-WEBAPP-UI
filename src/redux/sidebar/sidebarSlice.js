import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeLink: {
        name: 'Home',
        linkTo: '/'
    }
};

const sidebarSlice = createSlice({
    name: 'sidebarActive',
    initialState,
    reducers: {
        changeLink: (state, action) => {
            state.activeSidebarItem = action.payload;
        }
    }
});

export const { changeLink } = sidebarSlice.actions;
export default sidebarSlice.reducer;

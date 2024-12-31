import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
    activeSidebarItem?: number;
    activeLink: {
        name: string;
        linkTo: string;
    };
}

const initialState: SidebarState = {
    activeLink: {
        name: 'Home',
        linkTo: '/'
    }
};

const sidebarSlice = createSlice({
    name: 'sidebarActive',
    initialState,
    reducers: {
        changeLink: (state, action: PayloadAction<number>) => {
            state.activeSidebarItem = action.payload;
        }
    }
});

export const { changeLink } = sidebarSlice.actions;
export default sidebarSlice.reducer;

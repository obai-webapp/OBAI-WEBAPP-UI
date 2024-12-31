import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/redux';

const initialState: ThemeState = {
    collapsed: false,
    autoCollapsed: false,
    activeTab: ''
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed;
        },
        collapseSidebar: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        },
        toggleAutoCollapse: (state, action: PayloadAction<boolean>) => {
            state.autoCollapsed = action.payload;
        },
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        }
    }
});

export const { toggleSidebar, collapseSidebar, toggleAutoCollapse, setActiveTab } = themeSlice.actions;
export default themeSlice.reducer;

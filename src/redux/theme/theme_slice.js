import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        collapseSidebar: (state, action) => {
            state.collapsed = action.payload;
        },
        toggleAutoCollapse: (state, action) => {
            state.autoCollapsed = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
    }
});

export const { toggleSidebar, collapseSidebar, toggleAutoCollapse, setActiveTab } = themeSlice.actions;
export default themeSlice.reducer;

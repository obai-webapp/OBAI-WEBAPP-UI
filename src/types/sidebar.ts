export interface SidebarItem {
    id: number;
    name: string;
    iconLight: string;
    iconDark: string;
    linkTo?: string;
    child?: SidebarItem[];
}

export interface SidebarItemProps {
    item: SidebarItem;
    selectedItemId: number;
    handleSideBarClick: (item: SidebarItem) => void;
}

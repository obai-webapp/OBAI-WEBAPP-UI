export interface SidebarItemType {
    id: number;
    name: string;
    iconLight: string;
    iconDark: string;
    linkTo?: string;
    child?: SidebarItemType[];
}

export interface SidebarItemProps {
    item: SidebarItemType;
    selectedItemId: number;
    handleSideBarClick: (item: SidebarItemType) => void;
}

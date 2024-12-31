import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collapseSidebar } from '@redux/theme/themeSlice';
import { SidebarItemProps } from '@/src/types';

const SidebarItem: FC<SidebarItemProps> = ({ item, selectedItemId, handleSideBarClick }) => {
    const dispatch = useDispatch();

    const checkScreenSize = (): void => {
        if (window.innerWidth <= 768) {
            dispatch(collapseSidebar(true));
        }
    };

    const changeRoute = (): void => {
        handleSideBarClick(item);
        checkScreenSize();
    };

    return (
        <Link to={item.linkTo ?? '#'} className={item.id === selectedItemId ? 'active-item' : ''} onClick={changeRoute}>
            <img
                src={item.id === selectedItemId ? item.iconDark : item.iconLight}
                className="side-nav-icon"
                alt={`${item.name} icon`}
            />
            <span>{item.name}</span>
        </Link>
    );
};

export default SidebarItem;

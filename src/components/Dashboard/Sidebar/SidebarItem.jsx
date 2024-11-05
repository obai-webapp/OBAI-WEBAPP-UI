import React from 'react';
import { collapseSidebar } from '@redux/theme/theme_slice.js';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SidebarItem = ({ item, selectedItemId, handleSideBarClick }) => {
    const dispatch = useDispatch();

    const checkScreenSize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            dispatch(collapseSidebar(true));
        }
    };

    const changeRoute = () => {
        handleSideBarClick(item);
        checkScreenSize();
    };

    return (
        <Link to={item.linkTo} className={item.id === selectedItemId ? 'active-item' : ''} onClick={changeRoute}>
            <img
                src={item.id === selectedItemId ? item.iconDark : item.iconLight}
                className="side-nav-icon"
                alt="nav-icon"
            />
            <span>{item.name}</span>
        </Link>
    );
};
export default SidebarItem;

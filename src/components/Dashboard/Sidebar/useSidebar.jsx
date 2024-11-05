import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import sideBarItems from './sidebarData';
import { changeLink } from '@redux/sidebar/sidebarSlice';

const useSideBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const findActiveItem = (items) => {
        for (const item of items) {
            if (location.pathname === item.linkTo) {
                return item;
            }
            if (item.child) {
                const found = findActiveItem(item.child);
                if (found) return found;
            }
        }
        return null;
    };

    const selectActiveItem = () => {
        const activeItem = findActiveItem(sideBarItems);
        if (activeItem) {
            dispatch(changeLink(activeItem.id));
        }
    };

    useEffect(() => {
        selectActiveItem();
        // Adding location.pathname to the dependency array to re-run this effect when the route changes
    }, [location.pathname]);

    const handleSideBarClick = (item) => {
        dispatch(changeLink(item.id)); // Dispatch the selected item to update the activeLink
        if (item.id === 7) {
            handleLogoutClick(); // Make sure you define this function or import it if it's defined elsewhere
        } else {
            navigate(item.linkTo);
        }
    };

    return { handleSideBarClick };
};

export default useSideBar;

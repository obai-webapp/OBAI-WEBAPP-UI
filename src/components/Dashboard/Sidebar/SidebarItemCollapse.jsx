import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { collapseSidebar } from '@redux/theme/theme_slice';

const SidebarItemCollapse = ({ item, selectedItemId, handleSideBarClick }) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const toggleDropdown = () => {
        setShow(!show);
    };

    const resetDropdown = () => {
        setShow(false);
    };

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

    useEffect(() => {
        resetDropdown();
        dropIfChildSelected(item.child, selectedItemId);
    }, [selectedItemId]);

    const dropIfChildSelected = (childList, selectedItemId) => {
        const foundSelectChild = childList.filter((child) => child.id === selectedItemId);
        if (foundSelectChild.length) setShow(true);
    };

    return (
        <div className="nested-nav-container">
            <button type="button" onClick={toggleDropdown} className="nested-item-toggler">
                <span className="nested-toggler-left">
                    <img
                        src={item.id === selectedItemId ? item.iconDark : item.iconLight}
                        className="side-nav-icon"
                        alt="nav-icon"
                    />
                    {item.name}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className={`side-nav-ddn ${show ? 'angle-up' : ''}`} />
            </button>
            <div className={`nested-nav-items ${show ? 'collapse-ddn' : ''}`}>
                {item.child.map((childItem) => (
                    <Link
                        key={childItem.id}
                        className={childItem.id === selectedItemId ? 'active-item-nested' : ''}
                        to={childItem.linkTo}
                        onClick={changeRoute}
                    >
                        <img
                            src={childItem.id === selectedItemId ? childItem.iconDark : childItem.iconLight}
                            className="side-nav-icon"
                            alt="nav-icon"
                        />
                        {childItem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default SidebarItemCollapse;

import React, { useState, useEffect } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoImg from '@images/ropstam.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import { collapseSidebar } from '@redux/theme/themeSlice';
import ConfirmationBox from '../../ConfirmationBox/ConfirmationBox';
import { logoutUser } from '@redux/auth/authSlice';
import changeLink from '@redux/sidebar';
import sideBarItems from './sidebarData';
import { RootState } from '@/src/redux/store';
import type { SidebarItemType } from '@/src/types';

import './sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { theme: collapsed, theme: autoCollapsed, activeSidebarItem } = useSelector((state: RootState) => state);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    const selectActiveItem = () => {
        const findActiveItem = (items: SidebarItemType[]) => {
            for (const item of items) {
                if (window.location.pathname === item.linkTo) {
                    return item;
                }
                if (item.child) {
                    const found = findActiveItem(item.child);
                    if (found) return found;
                }
            }
            return null;
        };

        const activeItem = findActiveItem(sideBarItems);
        if (activeItem) {
            dispatch(changeLink(activeItem.id));
        }
    };

    const handleSideBarClick = (item) => {
        dispatch(changeLink(item.id)); // Dispatch the selected item to update the activeLink

        if (item.id === 7) {
            handleLogoutClick();
        } else if (item.linkTo) {
            navigate(item.linkTo);
        }
    };

    useEffect(() => {
        selectActiveItem();
        // This effect should ideally depend on the pathname to update active items on route change
    }, [location.pathname]);

    const handleLogoutClick = () => {
        setModalShow(!modalShow);
    };

    return (
        <React.Fragment>
            {modalShow && (
                <ConfirmationBox
                    show={modalShow}
                    onClose={handleLogoutClick}
                    loading={false}
                    title="Logout"
                    body="Are you sure you want to logout?"
                    onConfirm={() => dispatch(logoutUser())}
                />
            )}
            <div className={`sidebar ${collapsed ? 'hide-sidebar' : ''}`}>
                {autoCollapsed ? (
                    <button
                        type="button"
                        onClick={() => dispatch(collapseSidebar(true))}
                        className="btn-collapse-sidebar"
                    >
                        <FontAwesomeIcon className="collapse-icon" icon={faCircleXmark} />
                    </button>
                ) : (
                    <></>
                )}

                <Container>
                    <div className="brand-logo">
                        <img src={logoImg} alt="brand-logo" />
                    </div>
                    <div className="side-nav-wrapper">
                        <Nav defaultActiveKey="/" className="sidebar-nav-items">
                            {sideBarItems.map((item) =>
                                item.child ? (
                                    <SidebarItemCollapse
                                        key={item.id}
                                        item={item}
                                        selectedItemId={activeSidebarItem}
                                        handleSideBarClick={handleSideBarClick}
                                    />
                                ) : (
                                    <SidebarItem
                                        key={item.id}
                                        item={item}
                                        selectedItemId={activeSidebarItem}
                                        handleSideBarClick={handleSideBarClick}
                                    />
                                )
                            )}
                        </Nav>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};
export default Sidebar;

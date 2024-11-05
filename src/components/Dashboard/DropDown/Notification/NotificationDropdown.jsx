import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './notifcationdropdown.scss';

const NotificationsDropdown = ({ items, handler }) => {
    const [show, setShow] = useState(false);
    const toggleDropdown = () => {
        setShow(!show);
    };

    const hasUnseen = (items) => {
        const foundItem = items.filter((item) => item.seen === false);
        if (foundItem.length) return true;
        return false;
    };
    return (
        <Dropdown className="notification-dropdown" onToggle={toggleDropdown}>
            <Dropdown.Toggle id="notifications-dropdown-toggle">
                <FontAwesomeIcon icon={faBell} />
                {hasUnseen(items) && <span className="dot"></span>}
            </Dropdown.Toggle>
            <Dropdown.Menu show={show} id="notifications-dropdown-menu">
                {items.map((notification) => (
                    <Dropdown.Item
                        key={notification.id}
                        onClick={() => handler()}
                        className={notification.seen ? 'seen' : ''}
                    >
                        {notification.message}
                    </Dropdown.Item>
                ))}
                {items.length === 0 && <Dropdown.Item disabled>No new notifications</Dropdown.Item>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationsDropdown;

import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './profiledropdown.scss';
import userImg from '@images/user-img.jpg';
import { logoutUser } from '../../../../redux/auth/auth_slice';
import { useDispatch } from 'react-redux';

const ProfileDropdown = () => {
    const [show, setShow] = useState(false);
    const toggleDropdown = () => {
        setShow(!show);
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser()); // Dispatch logoutUser action (redux
    };

    return (
        <Dropdown className="profile-dropdown" onToggle={toggleDropdown}>
            <Dropdown.Toggle id="profile-dropdown-toggle">
                <img src={userImg} alt="user-img" />
                <span>Hello Smith!</span>
                <FontAwesomeIcon className={show ? 'angle-up' : ''} icon={faAngleDown} />
            </Dropdown.Toggle>
            <Dropdown.Menu show={show} id="profile-dropdown-menu">
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Setting</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;

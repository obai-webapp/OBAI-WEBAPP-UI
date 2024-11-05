import './topbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Updated to use FontAwesome for the menu icon
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import logo from '../../../assets/logos/OBAI_Branding_FullColorLogo.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutModal from '../../Modal/LogoutModal/LogoutModal';

const Topbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [show, setShow] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const closeLogoutModal = () => setShowLogoutModal(false);
    const openLogoutModal = () => setShowLogoutModal(true);

    const toggleDropdown = () => {
        setShow(!show);
    };

    useEffect(() => {
        const handleResize = () => {
            setShowNav(window.innerWidth < 576);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container>
            <div className="top-nav">
                <Row className="w-100 m-0">
                    <Col lg={8} md={6} xs={6} sm={6} className="ps-0">
                        <img
                            src={logo}
                            alt="logo"
                            className="obai-logo" // Updated class for consistency
                            onClick={() => navigate('/claims')}
                            style={{ cursor: 'pointer' }}
                        />
                    </Col>
                    {!showNav && (
                        <Col lg={4} md={6} sm={6} className="d-flex justify-content-end pe-0 for-media-content">
                            <Row className="w-100 m-0">
                                <Col onClick={openLogoutModal} className="d-flex justify-content-end">
                                    <p>Logout</p>
                                </Col>
                            </Row>
                        </Col>
                    )}

                    {showNav && (
                        <Col xs={6} ssm={6} className="nav-left-items d-flex justify-content-end ">
                            <Dropdown className="profile-dropdown" onToggle={toggleDropdown}>
                                <Dropdown.Toggle id="profile-dropdown-toggle" className="d-flex menu-icon">
                                    <FontAwesomeIcon icon={faBars} /> {/* Updated to FontAwesome icon */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu show={show} id="profile-dropdown-menu">
                                    {location.pathname !== '/create-claim' && (
                                        <Dropdown.Item onClick={() => navigate('/create-claim')}>
                                            Create
                                        </Dropdown.Item>
                                    )}
                                    <Dropdown.Item onClick={openLogoutModal}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    )}
                </Row>
                <LogoutModal showLogoutModal={showLogoutModal} closeLogoutModal={closeLogoutModal} />
            </div>
        </Container>
    );
};

export default Topbar;

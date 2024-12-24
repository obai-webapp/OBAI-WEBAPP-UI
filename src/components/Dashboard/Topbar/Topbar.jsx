import './topbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import logo from '../../../assets/logos/OBAI_Branding_FullColorLogo.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import LogoutModal from '../../Modal/LogoutModal/LogoutModal';

const Topbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [show, setShow] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [uploadedLogo, setUploadedLogo] = useState(() => {
        const savedLogo = localStorage.getItem('uploadedLogo');
        return savedLogo || null;
    });

    const location = useLocation();
    const navigate = useNavigate();

    const closeLogoutModal = () => setShowLogoutModal(false);
    const openLogoutModal = () => setShowLogoutModal(true);

    const toggleDropdown = () => {
        setShow(!show);
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 300;
                    const MAX_HEIGHT = 100;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Get compressed image as base64 string
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality here (0.7 = 70% quality)
                    resolve(compressedBase64);
                };
            };
        });
    };

    const handleLogoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                if (file.size > 5000000) {
                    alert('File is too large. Please select a smaller image.');
                    return;
                }

                const compressedImage = await compressImage(file);
                try {
                    localStorage.setItem('uploadedLogo', compressedImage);
                    setUploadedLogo(compressedImage);
                } catch (storageError) {
                    console.error('Storage error:', storageError);
                    alert('Unable to save the logo. Please try a smaller image.');
                }
            } catch (error) {
                console.error('Error processing image:', error);
                alert('Error processing image. Please try again.');
            }
        }
        setShow(false);
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
                            src={uploadedLogo || logo}
                            alt="logo"
                            className="obai-logo"
                            onClick={() => navigate('/claims')}
                            style={{ cursor: 'pointer' }}
                        />
                    </Col>
                    {!showNav && (
                        <Col lg={4} md={6} sm={6} className="d-flex justify-content-end pe-0 for-media-content">
                            <Row className="w-100 m-0">
                                <Col className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="upload-btn"
                                        onClick={() => document.getElementById('logo-upload-desktop').click()}
                                    >
                                        Upload Logo
                                    </button>
                                    <input
                                        type="file"
                                        id="logo-upload-desktop"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        style={{ display: 'none' }}
                                    />
                                </Col>
                                <Col onClick={openLogoutModal} className="d-flex justify-content-end">
                                    <p>Logout</p>
                                </Col>
                            </Row>
                        </Col>
                    )}
                    {showNav && (
                        <Col xs={6} ssm={6} className="nav-left-items d-flex justify-content-end">
                            <Dropdown className="profile-dropdown" onToggle={toggleDropdown}>
                                <Dropdown.Toggle id="profile-dropdown-toggle" className="d-flex menu-icon">
                                    <FontAwesomeIcon icon={faBars} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu show={show} id="profile-dropdown-menu">
                                    {location.pathname !== '/create-claim' && (
                                        <Dropdown.Item onClick={() => navigate('/create-claim')}>Create</Dropdown.Item>
                                    )}
                                    <Dropdown.Item as="div">
                                        {' '}
                                        {/* Changed to div to prevent click event issues */}
                                        <div
                                            className="mobile-upload-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                document.getElementById('logo-upload-mobile').click();
                                            }}
                                            style={{ cursor: 'pointer', padding: '8px' }}
                                        >
                                            Upload Logo
                                        </div>
                                        <input
                                            type="file"
                                            id="logo-upload-mobile"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleLogoUpload(e);
                                                setShow(false);
                                            }}
                                            style={{ display: 'none' }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </Dropdown.Item>
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

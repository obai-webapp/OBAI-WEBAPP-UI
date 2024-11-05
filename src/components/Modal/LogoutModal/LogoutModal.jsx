import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import byePic from '@images/bye-pic.png';
import './LogoutModal.scss';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/auth_slice';

const LogoutModal = ({ showLogoutModal, closeLogoutModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/admin-login');
        dispatch(logoutUser());
        closeLogoutModal();
    };
    return (
        <div>
            <Modal show={showLogoutModal} onHide={closeLogoutModal} centered className="logout-modal">
                <Modal.Body>
                    <Row>
                        <Col lg={12} className="d-flex justify-content-center mt-5">
                            <img src={byePic} alt="byePic" />
                        </Col>
                        <Col lg={12} className="d-flex justify-content-center mt-5">
                            <div className="logout-text">
                                <p>
                                    Are you sure you want to <strong>Logout</strong>?
                                </p>
                            </div>
                        </Col>
                        <Col lg={12} className="end-button mt-5 mb-4">
                            <button
                                className="lato-regular without-background"
                                type="button"
                                onClick={closeLogoutModal}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#FF8C00', // Tertiary color for Back button
                                    border: '2px solid #FF8C00',
                                    padding: '10px',
                                    borderRadius: '36px',
                                    fontSize: '16px'
                                }}
                            >
                                Cancel
                            </button>
                            <button className="lato-regular with-background mt-3" type="submit" onClick={handleLogout}>
                                Logout
                            </button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LogoutModal;

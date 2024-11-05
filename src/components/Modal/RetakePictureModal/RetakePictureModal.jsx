import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './RetakePictureModal.scss';
import { Row, Col, Container } from 'react-bootstrap';
import user from '@images/user.png';
import profile from '@images/profile.png';
import { useDispatch } from 'react-redux';

const RetakePictureModal = ({ showRetakeModal, closeRetakeModal, selectedImage }) => {
    return (
        <div>
            <Modal show={showRetakeModal} onHide={closeRetakeModal} className="retake-modal" centered>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg={12} className="d-flex justify-content-center mt-5">
                                <div className="img-border">
                                    <img src={user} alt="user" width="119px" />
                                </div>
                            </Col>
                            <Col lg={12} className="profile-section mt-5">
                                <div className="profile-img">
                                    <img src={profile} alt="profile" />
                                </div>
                                <div className="mt-1">
                                    <p>
                                        I noticed that I can’t really see the <strong> Driver Rear Corner </strong>
                                        picture. Could you try stepping a few steps back and retake the picture?
                                    </p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="end-button mt-3 mb-5">
                                    <button className="lato-regular without-background mt-3" type="button">
                                        Back
                                    </button>
                                    <button className="lato-regular with-background mt-3" type="button">
                                        Retake
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RetakePictureModal;

import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import byePic from '@icons/archive.svg';
import './ArchiveModal.scss';

const ArchiveModal = ({ closeArchiveModal, showArchiveModal, clickAction, isClaim }) => {
    return (
        <div>
            <Modal show={showArchiveModal} onHide={closeArchiveModal} centered className="archive-modal">
                <Modal.Body>
                    <Row>
                        <Col lg={12} className="d-flex justify-content-center mt-5">
                            <img src={byePic} alt="byePic" />
                        </Col>
                        <Col lg={12} className="d-flex justify-content-center mt-5">
                            <div className="logout-text">
                                <p>
                                    Are you sure you want to <strong>{!isClaim ? 'Unarchive' : 'Archive'} </strong>?
                                </p>
                            </div>
                        </Col>
                        <Col lg={12} className="end-button mt-5 mb-4">
                            <button
                                className="lato-regular without-background"
                                type="button"
                                onClick={closeArchiveModal}
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
                            <button className="lato-regular with-background mt-3" type="submit" onClick={clickAction}>
                                {!isClaim ? 'Unarchive' : 'Archive'}
                            </button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ArchiveModal;

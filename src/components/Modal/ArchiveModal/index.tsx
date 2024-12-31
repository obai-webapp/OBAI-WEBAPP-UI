import React, { FC } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
// import byePic from '@icons/archive.svg';
import byePic from '../../../assets/icons/archive.svg';
import './ArchiveModal.scss';

interface ArchiveModalProps {
    closeArchiveModal: () => void;
    showArchiveModal: boolean;
    clickAction: () => void;
    isClaim: boolean;
}

const ArchiveModal: FC<ArchiveModalProps> = ({ closeArchiveModal, showArchiveModal, clickAction, isClaim }) => {
    return (
        <Modal show={showArchiveModal} onHide={closeArchiveModal} centered className="archive-modal">
            <Modal.Body>
                <Row>
                    {/* Archive/Unarchive Icon */}
                    <Col lg={12} className="d-flex justify-content-center mt-5">
                        <img src={byePic} alt="Archive or Unarchive" />
                    </Col>

                    {/* Confirmation Text */}
                    <Col lg={12} className="d-flex justify-content-center mt-5">
                        <div className="logout-text">
                            <p>
                                Are you sure you want to <strong>{isClaim ? 'Archive' : 'Unarchive'}</strong>?
                            </p>
                        </div>
                    </Col>

                    {/* Action Buttons */}
                    <Col lg={12} className="end-button mt-5 mb-4">
                        <button
                            className="lato-regular without-background"
                            type="button"
                            onClick={closeArchiveModal}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#FF8C00',
                                border: '2px solid #FF8C00',
                                padding: '10px',
                                borderRadius: '36px',
                                fontSize: '16px'
                            }}
                        >
                            Cancel
                        </button>
                        <button className="lato-regular with-background mt-3" type="button" onClick={clickAction}>
                            {isClaim ? 'Archive' : 'Unarchive'}
                        </button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ArchiveModal;

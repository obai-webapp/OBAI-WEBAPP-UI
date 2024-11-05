import React from 'react';
import './DeleteModal.scss';
import { Col, Modal, Row } from 'react-bootstrap';

const DeleteModal = ({ deleteModal, closeDeleteModal, deleteClaim, claimId }) => {
    return (
        <div>
            <Modal show={deleteModal} onHide={closeDeleteModal} centered className="delete-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Delete Claim </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="my-4">
                        <Col lg={12} className="justify-content-center align-items-center d-flex">
                            <p>Are you sure, you want to delete claim?</p>
                        </Col>
                        <Col lg={12} className="last-button mt-3">
                            <button className="lato-regular cancel-background" type="button" onClick={closeDeleteModal}>
                                Cancel
                            </button>
                            <button
                                className="lato-regular del-button"
                                type="button"
                                onClick={() => deleteClaim(claimId)}
                            >
                                Delete
                            </button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeleteModal;

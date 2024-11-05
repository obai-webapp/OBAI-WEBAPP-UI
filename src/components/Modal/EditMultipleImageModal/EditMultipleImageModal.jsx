import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import { useDispatch } from 'react-redux';
import { editAnotherImage } from '../../../redux/cars_images/cars_images_slice';
import './EditMultipleImageModal.scss';

const EditMultipleImageModal = ({ selectedImage, showRetakeModal, closeRetakeModal }) => {
    const dispatch = useDispatch();
    const [openCam, setOpenCam] = useState(false);

    const handleTakePhoto = (dataUri) => {
        // dispatch(
        //     editAnotherImage({
        //         currentSubStep: selectedImage.currentSubStep,
        //         dataUriIndex: selectedImage.dataUriIndex,
        //         dataUri
        //     })
        // );
        setOpenCam(false);
        closeRetakeModal(dataUri);
    };
    return (
        <div>
            <Modal
                show={showRetakeModal}
                onHide={closeRetakeModal}
                className="retake-modal"
                size={openCam ? 'lg' : 'md'}
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Container>
                        {openCam === false ? (
                            <Row>
                                <Col lg={12} className="d-flex justify-content-center mt-5">
                                    <div className="img-border">
                                        <img src={selectedImage?.img} alt="user" width="329px" />
                                    </div>
                                </Col>

                                <Col lg={12}>
                                    <div className="end-button mt-3 mb-5">
                                        <button
                                            className="lato-regular cancel-btn-retake mt-3"
                                            onClick={closeRetakeModal}
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setOpenCam(true)}
                                            className="lato-regular without-background mt-3"
                                            type="button"
                                        >
                                            Retake
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        ) : null}

                        {openCam && (
                            <div className="camera-div-second">
                                <Camera
                                    isImageMirror={false}
                                    idealFacingMode="environment"
                                    onTakePhoto={(dataUri) => {
                                        handleTakePhoto(dataUri);
                                    }}
                                />
                            </div>
                        )}
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditMultipleImageModal;

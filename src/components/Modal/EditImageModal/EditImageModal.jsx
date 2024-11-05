import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import { useDispatch } from 'react-redux';
import { UpdateCapturedImage, editVinReviewedImage } from '../../../redux/cars_images/cars_images_slice';

const EditImageModal = ({ selectedImage, showRetakeModal, closeRetakeModal }) => {
    const dispatch = useDispatch();
    const [openCam, setOpenCam] = useState(false);

    const handleTakePhoto = (dataUri) => {
        // dispatch(editVinReviewedImage({ index: selectedImage.index, dataUri, arrayIndex: selectedImage.arrayIndex }));
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
                                            onClick={() => setOpenCam(true)}
                                            className="lato-regular without-background mt-3"
                                            type="button"
                                        >
                                            Retake
                                        </button>
                                        <button
                                            className="lato-regular with-background mt-3"
                                            onClick={closeRetakeModal}
                                            type="button"
                                        >
                                            Cancel
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

export default EditImageModal;

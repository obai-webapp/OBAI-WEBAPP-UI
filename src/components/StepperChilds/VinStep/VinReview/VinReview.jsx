import React, { useState, useMemo } from 'react';
import vin1 from '@images/vin1.jpeg';
import vin2 from '@images/vin2.png';
import edit from '@images/edit.svg';
import check from '@icons/save.svg';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import EditImageModal from '../../../Modal/EditImageModal/EditImageModal';
import backImg from '@icons/back.svg';
import Camera from 'react-html5-camera-photo';
import { addVinReviewImg, updateOnlyCapturedImages } from '../../../../redux/cars_images/cars_images_slice';
import { base64ToBlob } from '../../../../helpers/helpers';
import axiosWrapper from '../../../../utils/api';

const VinReview = ({ pVinReviewHandler, pDentInfo, pVinReviewEditImageHandler }) => {
    const dispatch = useDispatch();
    const reduxData = useSelector((state) => state.cars_images);
    const [odometerValue, setOdometerValue] = useState('KNDJ23AU6M7791679');
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(pDentInfo?.vinNumber);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showRetakeModal, setRetakeModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { vinReviewedImages } = useSelector((state) => state.cars_images);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [openCam, setOpenCam] = useState(false);

    const closeRetakeModal = () => setRetakeModal(false);
    const showRetake = () => setRetakeModal(true);

    console.log({ pDentInfo });

    const handleEditClick = () => {
        // setNewValue(odometerValue);
        setEditing(true);
    };

    const handleChange = (e) => {
        setNewValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [...rest] = [...reduxData?.capturedImages];
        const index = rest.findIndex((el) => el.title === 'DashboardVin');

        if (index > -1) rest[index] = { ...rest[index], vinNumber: newValue };
        dispatch(updateOnlyCapturedImages({ images: rest }));

        setOdometerValue(newValue);
        setEditing(false);
    };

    const handleAddVinReviewPic = async (dataUri) => {
        try {
            const formData = new FormData();
            const blob = base64ToBlob(dataUri);
            formData.append('files', blob, 'image.jpg');

            const { data } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/media/upload`,
                formData,
                false,
                true
            );

            const imagePath = data[0]?.path;

            setOpenCam(false);

            const key = selectedIndex === 0 ? 'doorJamVinImages' : 'dashboardVinImages';

            pVinReviewHandler(key, [imagePath]);
        } catch (error) {
            console.log({ error });
        }

        setOpenCam(false);
    };

    const vinData = [
        {
            title: 'Door Jam VIN',
            img: vin2,
            keyValue: 'doorJamVinImages'
        },
        {
            title: 'Dashboard VIN',
            img: vin1,
            keyValue: 'dashboardVinImages'
        }
    ];

    return (
        <>
            {!openCam && (
                <div className="stepper-main">
                    <h4 className="mt-5 heading-section">VIN Review</h4>
                    <span>You can retake any photo or edit any info that you want. Just click on it!</span>
                    <div className="car-corners mt-5">
                        {vinData.map((key, index) => {
                            return (
                                <>
                                    <div>
                                        {pDentInfo && pDentInfo[key?.keyValue]?.length > 0 && (
                                            <div className="for-title">
                                                <p>{key?.title}</p>
                                            </div>
                                        )}
                                        <div
                                            className={`for-vin-img ${pDentInfo && pDentInfo[key?.keyValue]?.length > 4 ? 'additional-class' : ''}`}
                                        >
                                            {pDentInfo && pDentInfo[key.keyValue]?.length
                                                ? pDentInfo[key.keyValue].map((img, arrayIndex) => (
                                                      <div lg={6} className="me-2 mt-2 p-1">
                                                          <div className="for-img-vin-review">
                                                              <img src={img} alt="front" />
                                                              <div
                                                                  className="edit-icon-img"
                                                                  onClick={() => {
                                                                      setSelectedImage({
                                                                          index: index,
                                                                          arrayIndex,
                                                                          img,
                                                                          keyValue: key?.keyValue
                                                                      });
                                                                      showRetake();
                                                                  }}
                                                              >
                                                                  <img src={edit} alt="edit" />
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ))
                                                : []}
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => {
                                            setSelectedIndex(index);
                                            setOpenCam(true);
                                        }}
                                        className={
                                            pDentInfo && pDentInfo[key?.keyValue]?.length > 0
                                                ? 'add-another me-4 mt-2 mb-3'
                                                : 'empty-add me-4 mt-2 mb-3'
                                        }
                                    >
                                        <h6>+ {index === 1 ? 'Add Dashboard Jam' : 'Add Door Jam'}</h6>
                                    </div>
                                </>
                            );
                        })}
                        {/* {vinData.map((car) => (
                    <div lg={6} className="all-corners me-3">
                        <div className="for-title">
                            <p>{car.title}</p>
                        </div>
                        <div className="for-img-vin for-edit-img img-set">
                            <img src={car.img} alt="front" />
                            <div
                                className="edit-icon-img"
                                onClick={() => {
                                    showRetake();
                                }}
                            >
                                <img src={edit} alt="edit" />
                            </div>
                        </div>
                    </div>
                ))} */}
                    </div>

                    <div className="d-flex justify-content-center mt-4 vin-number">
                        <p>VIN Number</p>
                    </div>

                    <div className="code-number  odometer-form mt-2">
                        <div className="odometer-for-edit">
                            {editing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="save-form">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            placeholder="1234456"
                                            value={newValue}
                                            onChange={handleChange}
                                        />
                                        <img
                                            src={check}
                                            alt="check"
                                            onClick={() => {
                                                pVinReviewHandler('vinNumber', newValue);
                                                setEditing(false);
                                            }}
                                        />
                                    </div>
                                </form>
                            ) : (
                                <div className="d-flex align-items-center for-bg">
                                    <div className="d-flex align-items-center">
                                        <Form.Control disabled type="text" placeholder="1234456" value={newValue} />
                                    </div>
                                    <div className="edit-btn" onClick={handleEditClick}>
                                        <img src={edit} alt="edit" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <EditImageModal
                        selectedImage={selectedImage}
                        showRetakeModal={showRetakeModal}
                        closeRetakeModal={(imagePath) => {
                            pVinReviewEditImageHandler(imagePath, selectedImage?.arrayIndex, selectedImage?.keyValue);

                            closeRetakeModal();
                        }}
                    />
                </div>
            )}
            {openCam && (
                <div className="camera-div">
                    <Camera
                        isImageMirror={false}
                        idealFacingMode="environment"
                        onTakePhoto={(dataUri) => {
                            handleAddVinReviewPic(dataUri);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default VinReview;

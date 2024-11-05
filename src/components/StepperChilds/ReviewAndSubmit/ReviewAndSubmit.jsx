import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import damage1 from '@images/damage1.jpeg';
import front from '@images/front.jpeg';
import passenger from '@images/passenger.jpeg';
import backPassenger from '@images/back-passenger.jpeg';
import rearCorner from '@images/rear-corner.jpeg';
import vin1 from '@images/vin1.jpeg';
import vin2 from '@images/vin2.png';
import or from '@images/or.jpeg';
import edit from '@images/edit.png';
import check from '@icons/save.svg';
import { useDispatch, useSelector } from 'react-redux';
import EditMultipleImageModal from '../../Modal/EditMultipleImageModal/EditMultipleImageModal';
import EditImageModal from '../../Modal/EditImageModal/EditImageModal';
import Camera from 'react-html5-camera-photo';
import { addVinReviewImg } from '../../../redux/cars_images/cars_images_slice';
import { screenList } from '../../../helpers/helpers';

const ReviewAndSubmit = ({ pDentsInfoList, pReviewAndSubmitHandler, pVinOrOdoNumberHandler, pIsAdminView = false }) => {
    const dispatch = useDispatch();
    const [odometerValue, setOdometerValue] = useState(
        pDentsInfoList.find((el) => el.title === 'OdometerReview')?.odoMeterNumber || ''
    );
    const [vinValue, setVinValue] = useState(pDentsInfoList.find((el) => el.title === 'VinReview')?.vinNumber || '');
    const [odometerEditing, setOdometerEditing] = useState(false);
    const [vinEditing, setVinEditing] = useState(false);
    const [newValue, setNewValue] = useState('');

    const [openCam, setOpenCam] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [showRetakeModal, setRetakeModal] = useState(false);

    const [selectedVinImage, setSelectedVinImage] = useState(null);
    const [showVinRetakeModal, setShowVinRetakeModal] = useState(false);
    const closeVinRetakeModal = () => setShowVinRetakeModal(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const closeRetakeModal = () => setRetakeModal(false);
    const showRetake = () => setRetakeModal(true);

    const handleEditOdometerClick = () => {
        setNewValue(odometerValue);
        setOdometerEditing(true);
    };

    const handleEditVinClick = () => {
        setNewValue(vinValue);
        setVinEditing(true);
    };

    const handleChangeVin = (e) => {
        setVinValue(e.target.value);
    };

    const handleChangeOdoMeter = (e) => {
        setOdometerValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (odometerEditing) {
            pVinOrOdoNumberHandler('OdometerReview', odometerValue, 'odoMeterNumber');
            setOdometerEditing(false);
        }
        if (vinEditing) {
            pVinOrOdoNumberHandler('VinReview', vinValue, 'vinNumber');
            setVinEditing(false);
        }
    };
    const handleAddVinReviewPic = (dataUri) => {
        dispatch(addVinReviewImg({ dataUri, index: selectedIndex }));
        setOpenCam(false);
    };

    // const damageCar = [
    //     {
    //         title: 'Driver Front Door',
    //         img: damage1
    //     },
    //     {
    //         title: 'Driver Rear Door',
    //         img: damage1
    //     },
    //     {
    //         title: 'Driver Roof Rail',
    //         img: damage1
    //     }
    // ];

    // const carCorner = [
    //     {
    //         title: 'Hood',
    //         img: front
    //     },
    //     {
    //         title: 'Cowl',
    //         img: passenger
    //     },
    //     {
    //         title: 'Driver Fender',
    //         img: backPassenger
    //     },
    //     {
    //         title: 'Passenger Fender',
    //         img: rearCorner
    //     }
    // ];

    // const vinData = [
    //     {
    //         title: 'Door Jam VIN',
    //         img: vin1
    //     },
    //     {
    //         title: 'Dashboard VIN',
    //         img: vin2
    //     }
    // ];

    // const rearData = [
    //     {
    //         title: 'Deck Lid/Gate',
    //         img: damage1
    //     },
    //     {
    //         title: 'Driver Quarter Panel',
    //         img: damage1
    //     },
    //     {
    //         title: 'Passenger Quarter Panel',
    //         img: damage1
    //     }
    // ];

    // const passengerSide = [
    //     {
    //         title: 'Passenger Front Door',
    //         img: damage1
    //     },
    //     {
    //         title: 'Passenger Rear Door',
    //         img: damage1
    //     },
    //     {
    //         title: 'Passenger Roof Rail',
    //         img: damage1
    //     }
    // ];

    // const overhead = [
    //     {
    //         title: 'Roof',
    //         img: damage1
    //     },
    //     {
    //         title: 'Sunroof',
    //         img: damage1
    //     }
    // ];

    // const odoMeter = [
    //     {
    //         title: 'Odometer',
    //         img: or
    //     }
    // ];

    const totalAlphabets = 15;
    const totalAlphabetsVin = 10;
    const truncatedValue =
        odometerValue.length > totalAlphabets ? odometerValue.slice(0, totalAlphabets) + '...' : odometerValue;
    const vinValueLength =
        vinValue.length > totalAlphabetsVin ? vinValue.slice(0, totalAlphabetsVin) + '...' : vinValue;

    return (
        <div className="stepper-main review-step">
            {!pIsAdminView && (
                <div className="review-heading">
                    <h4 className="mt-5 heading-section">Review & Submit</h4>
                    <div className="mt-3 final-review">
                        <span>
                            The final review! <br /> You can retake any photo or edit any <br /> info that you want.
                            Just click on it!
                        </span>
                    </div>
                </div>
            )}

            {[...new Set(screenList.map((el) => el.side))]
                .filter((el) => el)
                .map((el) => {
                    const getAllSides = screenList.filter((item) => item.side === el);

                    const groupSidesData = getAllSides.reduce((arr, item) => {
                        const screenData = pDentsInfoList.find((_item) => _item?.title === item?.screenName);
                        arr = [...arr, screenData];
                        return arr;
                    }, []);

                    return (
                        <div className="heading-block block-width mt-5">
                            <h4>{el}</h4>
                            {groupSidesData.map((item, _index) => (
                                <div lg={6} className="all-corners-car mb-4">
                                    <div className="for-title w-100">
                                        <p>{item?.title}</p>
                                    </div>

                                    {item?.title === 'VinReview' && (
                                        <div className="d-flex justify-content-center align-items-center w-100 flex-column">
                                            <div className="_vinReview">
                                                {item?.dashboardVinImages?.length
                                                    ? item?.dashboardVinImages.map((el) => (
                                                          <img
                                                              src={el}
                                                              alt="Captured"
                                                              style={{ width: '200px', margin: '0 0.5rem' }}
                                                          />
                                                      ))
                                                    : null}
                                            </div>

                                            <div className="_vinReview">
                                                {item?.doorJamVinImages?.length
                                                    ? item?.doorJamVinImages.map((el) => (
                                                          <img
                                                              src={el}
                                                              alt="Captured"
                                                              style={{ width: '200px', margin: '0 0.5rem' }}
                                                          />
                                                      ))
                                                    : null}
                                            </div>

                                            <div className="d-flex justify-content-center mt-4 vin-number">
                                                <p>VIN Number</p>
                                            </div>

                                            <div className="code-number odometer-for-edit mt-2">
                                                {vinEditing ? (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="save-form">
                                                            <Form.Control
                                                                autoFocus
                                                                type="text"
                                                                value={vinValue}
                                                                onChange={handleChangeVin}
                                                            />
                                                            <img src={check} alt="check" onClick={handleSubmit} />
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div className="d-flex align-items-center for-bg">
                                                        <div className="d-flex align-items-center">
                                                            <Form.Control
                                                                disabled
                                                                type="text"
                                                                value={item?.vinNumber}
                                                            />
                                                        </div>
                                                        {!pIsAdminView && (
                                                            <div className="edit-btn ms-3" onClick={handleEditVinClick}>
                                                                <img src={edit} alt="edit" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {item?.title === 'OdometerReview' && (
                                        <div className="d-flex justify-content-center align-items-center w-100 flex-column">
                                            <div className="d-flex justify-content-center mt-4 vin-number">
                                                <p>Odometer Number</p>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center odometer-form-review mt-2">
                                                <div className="code-number odometer-for-edit ">
                                                    {odometerEditing ? (
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="save-form">
                                                                <Form.Control
                                                                    autoFocus
                                                                    type="text"
                                                                    value={odometerValue}
                                                                    onChange={handleChangeOdoMeter}
                                                                />
                                                                <img src={check} alt="check" onClick={handleSubmit} />
                                                            </div>
                                                        </form>
                                                    ) : (
                                                        <div className="d-flex align-items-center for-bg-ml">
                                                            <div className="d-flex align-items-center">
                                                                <Form.Control
                                                                    disabled
                                                                    type="text"
                                                                    value={item?.odoMeterNumber}
                                                                />
                                                            </div>
                                                            {!pIsAdminView && (
                                                                <div
                                                                    className="edit-btn ms-3"
                                                                    onClick={handleEditOdometerClick}
                                                                >
                                                                    <img src={edit} alt="edit" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ms-3">
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={item?.miles}
                                                        onChange={(e) => {
                                                            pVinOrOdoNumberHandler(
                                                                'OdometerReview',
                                                                e.target.value,
                                                                'miles'
                                                            );
                                                        }}
                                                        disabled={pIsAdminView}
                                                    >
                                                        <option value="mi">mi</option>
                                                        <option value="km">km</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!['VinReview', 'OdometerReview'].includes(item?.title) && (
                                        <div
                                            key={`review-${_index + 1}`}
                                            className={`ai-img for-img-vin-car ${item?.images?.length > 4 ? 'additional-class' : ''}`}
                                        >
                                            {item?.images?.length > 0 ? (
                                                item?.images?.map((img, dataUriIndex) => (
                                                    <div className="for-edit-img">
                                                        <img src={img} alt="Captured" style={{ width: '200px' }} />

                                                        {!pIsAdminView && (
                                                            <div
                                                                className="edit-icon-img"
                                                                onClick={() => {
                                                                    setSelectedImage({
                                                                        imageIndex: dataUriIndex,
                                                                        title: item?.title,
                                                                        img
                                                                    });
                                                                    showRetake();
                                                                }}
                                                            >
                                                                <img src={edit} alt="edit" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span className="m-0">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })}

            {/* <h1>=====================</h1>

            <div className="heading-block block-width mt-5">
                <h4>Front</h4>

                <div className="car-corners mt-4">
                    {capturedImages?.slice(0, 4)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{carCorner[i]?.title}</p>
                            </div>
                            <div
                                className={`ai-img for-img-vin-car ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.length > 0 ? (
                                    car?.dataUri?.map((img, dataUriIndex) => (
                                        <div className="for-edit-img">
                                            <img src={img || car} alt="Captured" />

                                            <div
                                                className="edit-icon-img"
                                                onClick={() => {
                                                    setSelectedImage({
                                                        dataUriIndex,
                                                        img,
                                                        currentSubStep: car.currentSubStep
                                                    });
                                                    showRetake();
                                                }}
                                            >
                                                <img src={edit} alt="edit" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="m-0">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="heading-block block-width  mt-5">
                <h4>Driver Side</h4>

                <div className="car-corners mt-4">
                    {capturedImages?.slice(4, 7)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{damageCar[i]?.title}</p>
                            </div>
                            <div
                                className={`ai-img for-img-vin-car ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.length > 0 ? (
                                    car?.dataUri?.map((img, dataUriIndex) => (
                                        <div className="ai-img for-img-vin-car for-edit-img">
                                            <img src={img || car} alt="Captured" />

                                            <div
                                                className="edit-icon-img"
                                                onClick={() => {
                                                    setSelectedImage({
                                                        dataUriIndex,
                                                        img,
                                                        currentSubStep: car.currentSubStep
                                                    });
                                                    showRetake();
                                                }}
                                            >
                                                <img src={edit} alt="edit" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="m-0">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="heading-block block-width  mt-5">
                <h4>Rear</h4>
                <div className="car-corners mt-4">
                    {capturedImages?.slice(7, 10)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{rearData[i].title}</p>
                            </div>
                            <div
                                className={`ai-img for-img-vin-car ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.length > 0 ? (
                                    car?.dataUri?.map((img, dataUriIndex) => (
                                        <div className="ai-img for-img-vin-car for-edit-img">
                                            <img src={img || car} alt="Captured" />
                                            <div
                                                className="edit-icon-img"
                                                onClick={() => {
                                                    setSelectedImage({
                                                        dataUriIndex,
                                                        img,
                                                        currentSubStep: car.currentSubStep
                                                    });
                                                    showRetake();
                                                }}
                                            >
                                                <img src={edit} alt="edit" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="m-0">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="heading-block block-width  mt-5">
                <h4>Passenger Side</h4>
                <div className="car-corners mt-4">
                    {capturedImages?.slice(10, 13)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{passengerSide[i].title}</p>
                            </div>
                            <div
                                className={`ai-img for-img-vin-car ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.length > 0 ? (
                                    car?.dataUri?.map((img, dataUriIndex) => (
                                        <div className="ai-img for-img-vin-car for-edit-img">
                                            <img src={img || car} alt="Captured" />
                                            <div
                                                className="edit-icon-img"
                                                onClick={() => {
                                                    setSelectedImage({
                                                        dataUriIndex,
                                                        img,
                                                        currentSubStep: car.currentSubStep
                                                    });
                                                    showRetake();
                                                }}
                                            >
                                                <img src={edit} alt="edit" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="m-0">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="heading-block block-width  mt-5">
                <h4>Overhead</h4>
                <div className="car-corners mt-4">
                    {capturedImages?.slice(13, 15)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{overhead[i]?.title}</p>
                            </div>
                            <div
                                className={`ai-img for-img-vin-car ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.length > 0 ? (
                                    car?.dataUri?.map((img, dataUriIndex) => (
                                        <div className="ai-img for-img-vin-car for-edit-img">
                                            <img src={img || car} alt="Captured" />
                                            <div
                                                className="edit-icon-img"
                                                onClick={() => {
                                                    setSelectedImage({
                                                        dataUriIndex,
                                                        img,
                                                        currentSubStep: car.currentSubStep
                                                    });
                                                    showRetake();
                                                }}
                                            >
                                                <img src={edit} alt="edit" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="m-0">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="heading-block block-width  mt-5">
                <h4>Vin</h4>
                <div className="car-corners mt-4">
                    {Object.keys(vinReviewedImages).map((key, index) => {
                        return (
                            <>
                                <div className="all-corners-car mb-4">
                                    {vinReviewedImages[key].length > 0 && (
                                        <div className="for-title w-100">
                                            <p>{vinData[index].title}</p>
                                        </div>
                                    )}
                                    <div
                                        className={`for-vin-img ${vinReviewedImages[key].length > 4 ? 'additional-class' : ''}`}
                                    >
                                        {vinReviewedImages[key].length > 0 ? (
                                            vinReviewedImages[key].map((img, arrayIndex) => (
                                                <div className=" mt-2">
                                                    <div className="for-img-vin-review">
                                                        <img src={img} alt="front" />
                                                        <div
                                                            className="edit-icon-img"
                                                            onClick={() => {
                                                                setSelectedVinImage({ index: index, arrayIndex, img });
                                                                setShowVinRetakeModal(true); //
                                                            }}
                                                        >
                                                            <img src={edit} alt="edit" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="m-0">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center w-100 flex-column">
                <div className="d-flex justify-content-center mt-4 vin-number">
                    <p>VIN Number</p>
                </div>

                <div className="code-number odometer-for-edit mt-2">
                    {odometerEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="save-form">
                                <Form.Control autoFocus type="text" value={newValue} onChange={handleChange} />
                                <img src={check} alt="check" onClick={handleSubmit} />
                            </div>
                        </form>
                    ) : (
                        <div className="d-flex align-items-center for-bg">
                            <div className="d-flex align-items-center">
                                <Form.Control disabled type="text" value={truncatedValue} />
                            </div>
                            <div className="edit-btn ms-3" onClick={handleEditOdometerClick}>
                                <img src={edit} alt="edit" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="heading-block block-width mt-5">
                <h4>Odometer</h4>
                <div className="car-corners for-last mt-4">
                    {capturedImages?.slice(17, 18)?.map((car, i) => (
                        <div lg={6} className="all-corners-car mb-4">
                            <div className="for-title w-100">
                                <p>{odoMeter[i]?.title}</p>
                            </div>
                            <div
                                className={`ai-img img-for-odo mb-2 ${car?.dataUri?.length > 4 ? 'additional-class' : ''}`}
                            >
                                {car?.dataUri?.map((img, dataUriIndex) => (
                                    <div className="ai-img for-img-vin-car for-edit-img">
                                        <img src={img || car} alt="Captured" />
                                        <div
                                            className="edit-icon-img"
                                            onClick={() => {
                                                setSelectedImage({
                                                    dataUriIndex,
                                                    img,
                                                    currentSubStep: car.currentSubStep
                                                });
                                                showRetake();
                                            }}
                                        >
                                            <img src={edit} alt="edit" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4 vin-number">
                    <p>Odometer Number</p>
                </div>

                <div className="d-flex align-items-center justify-content-center odometer-form-review mt-2">
                    <div className="code-number odometer-for-edit ">
                        {vinEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="save-form">
                                    <Form.Control autoFocus type="text" value={newValue} onChange={handleChange} />
                                    <img src={check} alt="check" onClick={handleSubmit} />
                                </div>
                            </form>
                        ) : (
                            <div className="d-flex align-items-center for-bg-ml">
                                <div className="d-flex align-items-center">
                                    <Form.Control disabled type="text" value={vinValueLength} />
                                </div>
                                <div className="edit-btn ms-3" onClick={handleEditVinClick}>
                                    <img src={edit} alt="edit" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ms-3">
                        <Form.Select aria-label="Default select example">
                            <option value="mi">mi</option>
                            <option value="km">km</option>
                        </Form.Select>
                    </div>
                </div>
            </div> */}
            <EditMultipleImageModal
                selectedImage={selectedImage}
                showRetakeModal={showRetakeModal}
                closeRetakeModal={(image) => {
                    pReviewAndSubmitHandler(image, selectedImage?.title, selectedImage?.imageIndex);
                    closeRetakeModal();
                }}
            />
            <EditImageModal
                selectedImage={selectedVinImage}
                showRetakeModal={showVinRetakeModal}
                closeRetakeModal={closeVinRetakeModal}
            />

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
        </div>
    );
};

export default ReviewAndSubmit;

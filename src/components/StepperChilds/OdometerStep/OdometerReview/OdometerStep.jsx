import React, { useState } from 'react';
import or from '@images/or.jpeg';
import { Form } from 'react-bootstrap';
import edit from '@images/edit.svg';
import check from '@icons/save.svg';
import './OdometerStep.scss';

const OdometerReview = ({ pOdoMeterReviewHandler, pDentInfo }) => {
    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleChange = (key) => (e) => {
        pOdoMeterReviewHandler(key, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditing(false);
    };

    return (
        <div className="stepper-main-form">
            <h4 className="mt-4 heading-section">Odometer Review</h4>
            <span>
                You can retake any photo or edit any <br /> info that you want. Just click on it!
            </span>
            <div className="car-corners-odo mt-5">
                <div lg={6} className="all-corners">
                    <div className="for-title">
                        <p>Odometer</p>
                    </div>
                    <div className="for-img-vin">
                        <img src={pDentInfo?.images?.length ? pDentInfo?.images[0] : or} alt="front" />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4 vin-number">
                <p>Odometer Number</p>
            </div>

            <div className="d-flex justify-content-center odometer-form mt-2">
                <div className="odometer-for-edit">
                    {editing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="save-form">
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    placeholder="123456"
                                    value={pDentInfo?.odoMeterNumber}
                                    onChange={handleChange('odoMeterNumber')}
                                />
                                <img src={check} alt="check" onClick={handleSubmit} />
                            </div>
                        </form>
                    ) : (
                        <div className="d-flex align-items-center for-bg">
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    placeholder="123456"
                                    disabled
                                    type="text"
                                    value={pDentInfo?.odoMeterNumber}
                                />
                            </div>
                            <div className="edit-btn" onClick={handleEditClick}>
                                <img src={edit} alt="edit" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="ms-3 mt-1">
                    <Form.Select
                        aria-label="Default select example"
                        value={pDentInfo?.miles}
                        onChange={handleChange('miles')}
                    >
                        <option hidden>- -</option>
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};

export default OdometerReview;

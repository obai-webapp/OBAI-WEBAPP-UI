import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import OtpInput from './OtpComponent';
import logo from '@images/logo.svg';
import axiosWrapper from '../../utils/api';
import { toast } from 'react-toastify';
import { addIdForOtpUser } from '../../redux/auth/auth_slice';

const OtpScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const { loading, otpForUser } = useSelector((state) => state?.auth);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        try {
            if (otp.length !== 6) {
                setErrors({ otp: 'Please enter a 6-digit OTP' });
                return;
            }

            const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/api/admin/otp/verify`, {
                userID: otpForUser?.userID,
                otp
            });

            navigate('/update-password');
            toast.success('OTP verified successfully');
        } catch (error) {
            setErrors({ general: 'Failed to submit the form' });
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>OTP | Oba-ai</title>
            </Helmet>

            <div className="login-section">
                <div className="logo">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: '120px', height: '60px', objectFit: 'contain' }} // Inline styles for logo
                    />
                </div>

                <div className="main-heading">
                    <h3 className="auth-form-title">Enter OTP</h3>
                </div>

                <div className="auth-main-wrapper">
                    <Card className="auth-card-wrapper">
                        <Row className="justify-content-center g-0">
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <div className="auth-form-wrapper">
                                    <div className="for-otp">
                                        <OtpInput onChange={setOtp} value={otp} valueLength={6} />
                                    </div>

                                    {errors.otp && (
                                        <div className="mt-3">
                                            <p className="error-message">{errors.otp}</p>
                                        </div>
                                    )}

                                    <div className="submit-btn">
                                        <Button
                                            className="my-3 back-background"
                                            type="button"
                                            disabled={loading}
                                            onClick={() => navigate('/forgot-password')}
                                            style={{
                                                backgroundColor: 'transparent',
                                                color: '#FF8C00', // Tertiary brand color for Back button
                                                border: '2px solid #FF8C00',
                                                padding: '10px',
                                                borderRadius: '36px',
                                                fontSize: '16px'
                                            }}
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            className="submit-button"
                                            type="button"
                                            disabled={loading}
                                            onClick={handleSubmit}
                                            style={{
                                                backgroundColor: '#FF5F1E', // Primary button color
                                                color: '#FFF',
                                                borderRadius: '36px',
                                                fontSize: '20px',
                                                padding: '10px 0'
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </div>

                                    {errors.general && (
                                        <div className="mt-3">
                                            <p className="error-message">{errors.general}</p>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default OtpScreen;

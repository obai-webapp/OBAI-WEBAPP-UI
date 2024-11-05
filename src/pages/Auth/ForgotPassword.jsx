import React from 'react';
import logo from '@images/logo.svg';
import { Helmet } from 'react-helmet';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import Input from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import './auth.scss';
import { toast } from 'react-toastify';
import axiosWrapper from '../../utils/api';
import { addIdForOtpUser } from '../../redux/auth/auth_slice';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state?.auth);

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email')
            .required('Email is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/api/admin/forgot`, values);
            dispatch(addIdForOtpUser({ data }));
            navigate(`/otp-screen/`);
            setSubmitting(false);
            toast.success('OTP sent to email successfully');
        } catch (error) {
            console.error('Error:', error);
            setSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Forgot Password | Oba-ai</title>
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
                    <h3 className="auth-form-title">Provide Email</h3>
                </div>

                <div className="auth-main-wrapper">
                    <Card className="auth-card-wrapper">
                        <Row className="justify-content-center g-0">
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <div className="auth-form-wrapper">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <FormikForm>
                                                <div>
                                                    <Input name="email" placeholder="Email" type="text" />
                                                </div>

                                                <div className="submit-btn-forgot">
                                                    <button
                                                        className="lato-regular without-background mt-3"
                                                        type="button"
                                                        onClick={() => navigate('/admin-login')}
                                                        style={{
                                                            backgroundColor: 'transparent',
                                                            color: '#FF8C00', // Tertiary color for Back button
                                                            border: '2px solid #FF8C00',
                                                            padding: '10px',
                                                            borderRadius: '36px',
                                                            fontSize: '16px'
                                                        }}
                                                    >
                                                        Back
                                                    </button>

                                                    <Button
                                                        className="my-3 submit-button w-100"
                                                        type="submit"
                                                        disabled={loading}
                                                        style={{
                                                            backgroundColor: '#FF5F1E', // Primary button color
                                                            color: '#FFF',
                                                            borderRadius: '36px',
                                                            fontSize: '20px'
                                                        }}
                                                    >
                                                        {isSubmitting ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (
                                                            'Submit'
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormikForm>
                                        )}
                                    </Formik>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ForgotPassword;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '@images/logo.svg';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';
import { Form as FormikForm, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import './auth.scss';
import { toast } from 'react-toastify';
import axiosWrapper from '../../utils/api';
import { addIdForOtpUser } from '../../redux/auth/auth_slice';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, otpForUser } = useSelector((state) => state?.auth);

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/api/admin/update/password`, {
                userID: otpForUser.userID,
                ...values
            });

            navigate('/admin-login');
            dispatch(addIdForOtpUser(null));
            toast.success('Password Updated successfully');
        } catch (error) {
            toast.error('Error updating password');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Update Password | Oba-ai</title>
            </Helmet>

            <div className="login-section">
                <div className="logo">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: '120px', height: '60px', objectFit: 'contain' }} // Inline styling for logo
                    />
                </div>

                <div className="main-heading">
                    <p>Update Password</p>
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
                                                    <Input name="password" placeholder="Password" type="password" />
                                                </div>
                                                <div className="mt-4">
                                                    <Input
                                                        name="confirmPassword"
                                                        placeholder="Confirm Password"
                                                        type="password"
                                                    />
                                                </div>

                                                <div className="login-btn">
                                                    <Button
                                                        className="my-3 w-100"
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
                                                            'Update Password'
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormikForm>
                                        )}
                                    </Formik>

                                    <div
                                        className="contact-us-login"
                                        onClick={() => navigate('/contact')}
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '20px',
                                            color: '#FF8C00', // Tertiary brand color
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <p>Contact Us</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UpdatePassword;

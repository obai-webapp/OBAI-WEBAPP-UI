import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row, Spinner, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@logos/OBAI_Branding_FullColorLogo.png'; // Use the updated logo path
import Input from '@components/Input/Input';
import * as Yup from 'yup';
import { Form as FormikForm, Formik } from 'formik';
import { toast } from 'react-toastify';
import './auth.scss';
import { loginUser } from '../../redux/auth/auth_actions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);

    const toggleIsShow = () => {
        setIsShow((prev) => !prev);
    };

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        await dispatch(loginUser(values)).unwrap();
        navigate('/claims');
        setSubmitting(false);
        toast.success('Logged in successfully');
    };

    return (
        <React.Fragment>
            <div className="login-section">
                <div className="logo">
                    <img className='obai-welcomelogo' src={logo} alt="logo" />
                </div>

                <div className="main-heading">
                    <h3 className="auth-form-title">Welcome</h3>
                    <p>Login to get started</p>
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
                                                <div className="mt-4">
                                                    <Input
                                                        name="password"
                                                        placeholder="Password"
                                                        type={isShow ? 'text' : 'password'}
                                                    />
                                                </div>
                                                <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" checked={isShow} onChange={toggleIsShow} />
                                                    <label style={{ marginLeft: '8px' }}>Show password</label>
                                                </div>
                                                <div className="mt-3">
                                                    <Link
                                                        className="auth-link"
                                                        to="/forgot-password"
                                                        style={{ color: '#FF8C00' }} 
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <div className="login-btn">
                                                    <Button className="my-3 w-100" type="submit" disabled={isSubmitting}>
                                                        {isSubmitting ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (
                                                            'Login'
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormikForm>
                                        )}
                                    </Formik>

                                    <div className="contact-us-login" onClick={() => navigate('/contact')}>
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

export default Login;

import React from 'react';
import { Container } from 'react-bootstrap';
import './WelcomeScreen.scss';
import { useNavigate, useParams } from 'react-router-dom';
import wheel from '@images/wheel.png';
import { screenList } from '../../helpers/helpers';

const WelcomeScreen = ({ setActiveStep, pageIndex, claim }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="welcome-screen">
                <div className="welcome-text">
                    <div>
                        <h1 className="lato-bold ">
                            Welcome, <br /> {claim?.vehicle?.ownerName?.split(' ')[0]}
                        </h1>
                    </div>
                    <div className="mt-5 lato-regular d-flex align-items-center justify-center">
                        <p className="me-2">Let’s get rolling</p>
                        <img src={wheel} alt="wheel" width={'40px'} />
                    </div>
                </div>

                <div className="button-section">
                    <div>
                        <button
                            className="lato-regular with-background"
                            type="buttom"
                            onClick={() => {
                                setActiveStep(screenList[pageIndex + 1]?.stepNo);
                            }}
                        >
                            <span> Start Claim </span>
                        </button>
                    </div>
                    <div className="mt-5">
                        <p className="lato-regular" type="button" onClick={() => navigate('/contact')}>
                            Contact Us
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default WelcomeScreen;

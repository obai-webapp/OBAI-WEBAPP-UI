import React from 'react';
import './HowItWorks.scss';
import banner from '@images/how-it.png';
import { useNavigate, useParams } from 'react-router-dom';
import { screenList } from '../../helpers/helpers';

const HowItWorks = ({ setActiveStep, pageIndex }) => {
    const navigate = useNavigate();
    const { claimID } = useParams();

    return (
        <div className="how-it-works">
            <div className="banner-section">
                <div className="for-width">
                    <div>
                        <h2>How It Works</h2>
                    </div>
                    <div className="mt-5 d-flex justify-content-center">
                        <img src={banner} alt="banner" />
                    </div>

                    <div className="bullets mt-4">
                        <p>
                            It’s super easy! <br /> We will tell you each picture you need and how to take it
                        </p>
                    </div>
                    <div className="end-button mt-5">
                        <button
                            className="lato-regular without-background"
                            type="button"
                            // onClick={() => navigate('/')}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#FF8C00', // Tertiary color for Back button
                                border: '2px solid #FF8C00',
                                padding: '10px',
                                borderRadius: '36px',
                                fontSize: '16px'
                            }}
                            onClick={() => {
                                setActiveStep(screenList[pageIndex - 1]?.stepNo);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="lato-regular with-background mt-3"
                            type="button"
                            // onClick={() => navigate(`/${claimID}/super-cool-pictures`)}
                            onClick={() => {
                                setActiveStep(screenList[pageIndex + 1]?.stepNo);
                            }}
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

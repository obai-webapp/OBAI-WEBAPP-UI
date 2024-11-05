import React from 'react';
import car from '@images/submit.png';
import { useNavigate } from 'react-router-dom';
import './ClaimSubmitted.scss';
import { useSelector } from 'react-redux';

const ClaimSubmitted = ({ claimID, status }) => {
    const navigate = useNavigate();

    const renderInfo = () => {
        switch (status) {
            case 'ARCHIVE':
                return {
                    info: ['Your claim has been archived', 'If you need assistance, please contact our support team'],
                    btnText: '',
                    status: 'Archive'
                };

            case 'ON_GOING':
                return {
                    info: [
                        `Whoooo!!! We got them thanks! Your estimate and payment will be sent to you within the
                    next 72 hours.`
                    ],
                    btnText: '',
                    status: 'Submitted'
                };

            case 'APPROVE':
                return {
                    info: [
                        `Your claim has been successfully viewed by one of our administrators`,
                        'We are currently processing your request and will provide you with an update shortly',
                        'Thank you for your patience.'
                    ],
                    btnText: '',
                    status: 'Viewed'
                };

            case 'REJECT':
                return {
                    info: [
                        `We regret to inform you that your claim has been rejected`,
                        'If you believe this decision is a mistake, or if you have any questions, please contact our support team for further assistance.',
                        'We are here to help you through this process.'
                    ],
                    btnText: '',
                    status: 'Rejected'
                };

            default:
                return {
                    info: [
                        `Whoooo!!! We got them thanks! Your estimate and payment will be sent to you within the
                    next 72 hours.`
                    ],
                    btnText: '(This window is safe to close)',
                    status: ''
                };
        }
    };
    return (
        <div className="claim-submit vh-100">
            <div className="for-width">
                <div>
                    <h4>Claim Submitted!</h4>
                </div>

                <div className="ai-img mt-5">
                    <img src={car} alt="car" />
                </div>

                {renderInfo().info?.map((e, i) => (
                    <p className={i === 0 ? 'mt-4' : 'mt-3'}>{e}</p>
                ))}

                <div className="end-button mt-4">
                    {/* <div>
                        <p>{renderInfo().btnText}</p>
                    </div> */}

                    <p className={`status_label ${String(status).toLowerCase()}`}>
                        Status: <span> {renderInfo().status} </span>
                    </p>
                </div>

                <div className="mt-3 contact_us_" onClick={() => navigate('/contact')}>
                    <p>Contact Us</p>
                </div>
            </div>
        </div>
    );
};

export default ClaimSubmitted;

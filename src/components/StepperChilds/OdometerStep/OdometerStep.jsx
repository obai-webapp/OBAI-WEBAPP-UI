import React from 'react';
import Odometer from './Odometer/Odometer';
import OdometerReview from './OdometerReview/OdometerReview';

const OdometerStep = ({ currentStep }) => {
    return (
        <div>
            {currentStep === 16 && <Odometer />}
            {currentStep === 17 && <OdometerReview />}
        </div>
    );
};

export default OdometerStep;

import React from 'react';
import Vin from './Vin/Vin';
import VinDriverDoor from './VinDriverDoor/VinDriverDoor';
import VinDashboard from './VinDashboard/VinDashboard';
import VinReview from './VinReview/VinReview';

const VinStep = ({ currentStep }) => {
    return (
        <div>
            {currentStep === 12 && <Vin />}
            {currentStep === 13 && <VinDriverDoor />}
            {currentStep === 14 && <VinDashboard />}
            {currentStep === 15 && <VinReview />}
        </div>
    );
};

export default VinStep;

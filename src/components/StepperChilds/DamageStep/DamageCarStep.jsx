import React from 'react';
import DamagePictureOne from './Damage/DamagePictureOne/DamagePictureOne';
import DamagePictureTwo from './Damage/DamagePictureTwo/DamagePictureTwo';
import DamagePictureThree from './Damage/DamagePictureThree/DamagePictureThree';
import DamagePictureFour from './Damage/DamagePictureFour/DamagePictureFour';
import DamageReview from './Damage/DamageReview/DamageReview';
import DamageStep from './Damage/DamageStep/DamageStep';

const DamageCarStep = ({ currentStep }) => {
    return (
        <div>
            {currentStep === 6 && <DamageStep />}
            {currentStep === 7 && <DamagePictureOne />}
            {currentStep === 8 && <DamagePictureTwo />}
            {currentStep === 9 && <DamagePictureThree />}
            {currentStep === 10 && <DamagePictureFour />}
            {currentStep === 11 && <DamageReview />}
        </div>
    );
};

export default DamageCarStep;

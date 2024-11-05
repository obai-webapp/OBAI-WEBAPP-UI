import React from 'react';
import damage from '@images/dlg.png';

const DeckLidGate = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Deck Lid / Gate</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage} alt="Deck Lid / Gate" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Inspect the deck lid or gate for any dents, scratches, or other visible damage.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeckLidGate;

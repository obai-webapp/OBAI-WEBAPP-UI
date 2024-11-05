import React from 'react';
import { Form } from 'react-bootstrap';
import './RadioButton.scss';

const RadioButton = React.forwardRef(({ onClick, color = '#f25c22', ...rest }, ref) => {
    return (
        <div className="radio-button">
            <Form.Check
                type={'radio'}
                name="send-email"
                ref={ref}
                onClick={onClick}
                {...rest}
                style={{
                    accentColor: color // Apply custom color to the radio button
                }}
            />
        </div>
    );
});

export default RadioButton;

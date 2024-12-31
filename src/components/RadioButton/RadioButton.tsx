import React, { ForwardRefRenderFunction } from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';
import './RadioButton.scss';

interface RadioButtonProps extends FormCheckProps {
    onClick?: () => void;
    color?: string;
}

const RadioButton: ForwardRefRenderFunction<HTMLInputElement, RadioButtonProps> = (
    { onClick, color = '#f25c22', ...rest },
    ref
) => {
    return (
        <div className="radio-button">
            <Form.Check
                type="radio"
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
};

export default React.forwardRef(RadioButton);

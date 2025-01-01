import React from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';
import './RadioButton.scss';

interface RadioButtonProps extends FormCheckProps {
    onClick?: () => void;
    color?: string;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
    const { onClick, color = '#f25c22', ...rest } = props;
    return (
        <div className="radio-button">
            <Form.Check
                type="radio"
                name="send-email"
                ref={ref}
                onClick={onClick}
                {...rest}
                style={{ accentColor: color }}
            />
        </div>
    );
});

export default RadioButton;

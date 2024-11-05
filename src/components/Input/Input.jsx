import Text from './Text';
import Password from './Password';
import Label from './Label';
import Radio from './Radio';
import TextArea from './TextArea';
import Select from './Select';
import { ErrorMessage } from 'formik';
import './input.scss';

export default function Input(props) {
    const inputs = {
        text: Text,
        password: Password,
        radio: Radio,
        textarea: TextArea,
        select: Select
    };
    const InputComponent = inputs[props.type];
    return (
        <div className={`formgroup ${props.inline ? 'form-inline' : ''}`}>
            <Label label={props.label} />
            <InputComponent {...props} />
            <ErrorMessage name={props.name} component="span" className="validation-error" />
        </div>
    );
}

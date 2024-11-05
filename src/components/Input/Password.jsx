import { Form } from 'react-bootstrap';
import { Field } from 'formik';

function Password(props) {
    return (
        <Field name={props.name} type={props.type}>
            {/* feel free to customize the password control here */}
            {({ field }) => <Form.Control type={props.type} placeholder={props.placeholder} {...field} />}
        </Field>
    );
}

export default Password;

import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function TextArea(props) {
    return (
        <Field name={props.name} type={props.type}>
            {/* feel free to customize the textarea control here */}
            {({ field }) => <Form.Control as={props.type} rows={3} placeholder={props.placeholder} {...field} />}
        </Field>
    );
}

export default TextArea;

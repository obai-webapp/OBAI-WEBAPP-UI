import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function Text(props) {
    return (
        <Field name={props.name} type={props.type}>
            {/* feel free to customize the text control here */}
            {({ field }) => <Form.Control type={props.type} placeholder={props.placeholder} {...field} />}
        </Field>
    );
}

export default Text;

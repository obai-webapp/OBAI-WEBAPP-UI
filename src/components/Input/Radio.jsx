import Form from 'react-bootstrap/Form';
import { Field } from 'formik';

function Radio(props) {
    return props.options.map((option) => {
        return (
            <Field key={option.value} type={props.type} name={props.name} value={option.value}>
                {({ field }) => {
                    return (
                        // feel free to customize the radio inputs here
                        <Form.Check
                            id={option.value}
                            key={option.value}
                            className="check-control"
                            type={props.type}
                            label={option.label}
                            checked={field.value === option.value}
                            {...field}
                        />
                    );
                }}
            </Field>
        );
    });
}
export default Radio;

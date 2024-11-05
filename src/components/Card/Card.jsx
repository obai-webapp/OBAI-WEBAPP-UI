import { Card as BootsrapCard, Form } from 'react-bootstrap';
import './Card.scss';
function Card(props) {
    const getCardSize = (cardType) => {
        if (cardType === 'small') return 'card-small';
        if (cardType === 'large') return 'card-large';
        return '';
    };
    return (
        <BootsrapCard className={`${'custom-card'} ${getCardSize(props.cardType)}`}>
            {/* render card header only if header props is true */}
            {props.header ? (
                <BootsrapCard.Header>
                    <div className="flexed-card-header">
                        {props.title ? <h3 className="card-title">{props.title}</h3> : null}
                        {/* render time filters only if filter props is true */}
                        {props.filters ? (
                            <Form.Select aria-label="Default select example">
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="year">1 Year</option>
                            </Form.Select>
                        ) : null}
                    </div>
                    {props.description ? <p className="card-description">{props.description}</p> : null}
                </BootsrapCard.Header>
            ) : null}
            {/* dynamic card body */}
            <BootsrapCard.Body>{props.children}</BootsrapCard.Body>
            {/* render card footer only if footer props is true */}
            {props.footer ? (
                <BootsrapCard.Footer>{props.summary ? <p>{props.summary}</p> : null}</BootsrapCard.Footer>
            ) : null}
        </BootsrapCard>
    );
}
export default Card;

import { Modal as BootstrapModal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ size, show, onClose, title, children }) => {
    const getSize = (size) => {
        switch (size) {
            case 'small':
                return 'sm';
            case 'medium':
                return 'md';
            case 'large':
                return 'lg';
            default:
                return 'md'; // by default it is medium size modal
        }
    };
    return (
        <BootstrapModal show={show} size={getSize(size)} onHide={onClose} centered>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title className="modal-title">{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body className="modal-content">{children}</BootstrapModal.Body>
        </BootstrapModal>
    );
};

Modal.propTypes = {
    show: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;

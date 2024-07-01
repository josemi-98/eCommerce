import { Modal } from "react-bootstrap";

const ModalProduct = ({ isOpen, onClose, children, initialData  }) => {
    if (!isOpen) return null;

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {initialData && initialData.id !== null ? "Editar producto" : "Añadir nuevo producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            
        </Modal>
    );
};

export default ModalProduct;

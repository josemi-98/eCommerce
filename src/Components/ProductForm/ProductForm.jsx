import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useProduct from "../../Hooks/useProduct";

const ProductForm = ({ initialData, closeModal }) => {
    const { editedProduct, setEditedProduct, handleInputChange, handleSave } = useProduct();

    useEffect(() => {
        if (initialData) {
            setEditedProduct(initialData);
        }
    }, [initialData, setEditedProduct]);

    const handleSaveAndClose = () => {
        handleSave();
        closeModal(); 
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Camiseta"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio del producto</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="10"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image Url"
                    name="image"
                    value={editedProduct.image}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Electrónica"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Modal.Footer>
                <Button onClick={handleSaveAndClose}>{editedProduct.id !== null ? "Guardar" : "Añadir"}</Button>
            </Modal.Footer>
        </Form>
    );
};

export default ProductForm;

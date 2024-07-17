import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const ProductForm = ({ initialData, closeModal, onSubmit }) => {
    const [productData, setProductData] = useState({
        id: initialData.id || null,
        title: initialData.title || "",
        price: initialData.price || 0,
        description: initialData.description || "",
        category: initialData.category || "",
        image: initialData.image || ""
    });

    useEffect(() => {
        setProductData({
            id: initialData.id || null,
            title: initialData.title || "",
            price: initialData.price || 0,
            description: initialData.description || "",
            category: initialData.category || "",
            image: initialData.image || ""
        });
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "price" ? parseFloat(value) : value;
        setProductData((prevData) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleSave = () => {
        onSubmit(productData);
    };

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
                    value={productData.title}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio del producto</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="10"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image Url"
                    name="image"
                    value={productData.image}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Electrónica"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Modal.Footer>
                <Button onClick={handleSaveAndClose}>
                    {productData.id ? "Guardar" : "Añadir"}
                </Button>
            </Modal.Footer>
        </Form>
    );
};

export default ProductForm;

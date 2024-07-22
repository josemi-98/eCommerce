import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ProductForm = ({ initialData, closeModal, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        formState: { errors },
        setValue,
        
    } = useForm();

    useEffect(() => {
        if (initialData) {
            setValue("title", initialData.title || "");
            setValue("price", initialData.price || 0);
            setValue("description", initialData.description || "");
            setValue("category", initialData.category || "");
            setValue("image", initialData.image || "");
        }
    }, [initialData, setValue]);

    const handleImageValidation = () => {
        const image = watch("image");
        const isValid = image.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i);

        if (!isValid) {
            setError("image", {
                type: "manual",
                message: "Ingrese una URL válida (https://www.ejemplo.com).",
            });
            return false;
        } else {
            setError("image", {
                type: "manual",
                message: "",
            });
            return true;
        }
    };

    // Maneja el guardado del formulario
    const handleSave = (data) => {
        
        const isImageValid = handleImageValidation();

        if (!isImageValid) {
            return; 
        }

        const productData = {
            id: initialData.id || null,
            ...data,
        };
        onSubmit(productData);
        closeModal();
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(handleSave)}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Camiseta"
                    {...register("title", {
                        required:
                            "Por favor, ingrese un nombre para el producto.",
                        minLength: {
                            value: 4,
                            message:
                                "El nombre debe tener al menos 4 caracteres.",
                        },
                        maxLength: {
                            value: 40,
                            message:
                                "El nombre no debe exceder los 40 caracteres.",
                        },
                    })}
                />
                {errors.title && (
                    <Form.Text className="m-2 error-text">
                        {errors.title.message}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio del producto</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="10"
                    {...register("price", {
                        required: "Por favor, ingrese el precio del producto.",
                        valueAsNumber: true,
                        min: {
                            value: 0.01,
                            message: "El precio debe ser mayor que 0.",
                        },
                    })}
                />
                {errors.price && (
                    <Form.Text className="m-2 error-text">
                        {errors.price.message}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image Url"
                    {...register("image", {
                        required:
                            "Por favor, ingrese la URL de la imagen del producto.",
                    })}
                    onBlur={handleImageValidation}
                />
                {errors.image && (
                    <Form.Text className="m-2 error-text">
                        {errors.image.message}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("description", {
                        required:
                            "Por favor, ingrese una descripción para el producto.",
                        minLength: {
                            value: 4,
                            message:
                                "La descripción debe tener al menos 4 caracteres.",
                        },
                        maxLength: {
                            value: 500,
                            message:
                                "La descripción no debe exceder los 500 caracteres.",
                        },
                    })}
                />
                {errors.description && (
                    <Form.Text className="m-2 error-text">
                        {errors.description.message}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Electrónica"
                    {...register("category", {
                        required:
                            "Por favor, ingrese una categoría para el producto.",
                        minLength: {
                            value: 4,
                            message:
                                "La categoría debe tener al menos 4 caracteres.",
                        },
                        maxLength: {
                            value: 20,
                            message:
                                "La categoría no debe exceder los 20 caracteres.",
                        },
                    })}
                />
                {errors.category && (
                    <Form.Text className="m-2 error-text">
                        {errors.category.message}
                    </Form.Text>
                )}
            </Form.Group>
            <Modal.Footer>
                <Button type="submit">
                    {initialData.id ? "Guardar" : "Añadir"}
                </Button>
            </Modal.Footer>
        </Form>
    );
};

export default ProductForm;

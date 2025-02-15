
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);

    const [editableFields, setEditableFields] = useState({
        name: '', price: '', description: '', stock: '', size: '', category: '', SKU: '', tag: '',
    });
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/get-product/${id}`);
                const data = await response.json();
                if (data.product) {
                    setProduct(data.product);
                    setEditableFields({
                        name: data.product.name,
                        price: data.product.price,
                        description: data.product.description,
                        stock: data.product.stock,
                        category: data.product.category,
                        SKU: data.product.SKU,
                        tag: data.product.tag,
                        size: data.product.size,
                    });
                    setImages(data.product.images || []);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleColorChange = (e) => {
        const newColor = e.target.value.trim(); // Remove any accidental spaces

        // Ensure the color is not empty and is a valid hex color
        if (newColor && newColor !== "#" && !selectedColors.includes(newColor)) {
            setSelectedColors([...selectedColors, newColor]);
        }
    };

    console.log(selectedColors)
    const removeColor = (color) => {
        setSelectedColors(selectedColors.filter((c) => c !== color));
    };


    const handleEdit = (field, value) => {
        setEditableFields(prev => ({
            ...prev,
            [field]: field === "price" || field === "stock" ? (value === "" ? "" : parseInt(value, 10) || "") : value
        }));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveSelectedImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpdateProduct = async () => {
        setLoading(true);
        const formData = new FormData();
        // Add editable fields
        Object.entries(editableFields).forEach(([key, value]) => formData.append(key, value));

        // Combine the old images with new images
        images.forEach(image => formData.append('images', image)); // Add old images first
        selectedFiles.forEach(file => formData.append('images', file)); // Add new images
        formData.append('color', selectedColors)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/edit-product/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Product updated successfully');
                const updatedProduct = await response.json();
                setProduct(updatedProduct.product);
                setImages(updatedProduct.product.images);
                setSelectedFiles([]);
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>

            {Object.entries(editableFields).map(([key, value]) => (
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                        key={key}
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) => handleEdit(key, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={`Edit ${key}`}
                    />
                </div>

            ))}
            <div className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <label htmlFor="color" className="block text-gray-700 font-medium mb-1"> color</label>
                <input type="color"

                    onChange={handleColorChange} />

                <div className="mt-3 flex flex-wrap gap-2">
                    {selectedColors.map((color, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                            <span className="block w-6 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                            <span className="text-sm font-medium">{color}</span>
                            <button
                                type="button"
                                onClick={() => removeColor(color)}
                                className="text-red-500 hover:text-red-700 font-semibold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
                        <button onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">X</button>
                    </div>
                ))}
            </div>

            <input type="file" multiple onChange={handleFileChange} className="my-3" />

            <div className="flex flex-wrap gap-4 mt-3">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                        <button onClick={() => handleRemoveSelectedImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">X</button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white p-2 rounded mt-4"
                disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
            </button>
        </div>
    );
};

export default EditProduct;

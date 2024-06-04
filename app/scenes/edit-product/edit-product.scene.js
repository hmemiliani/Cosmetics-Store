import { navigateTo } from "../../Router";
//import styles from "./home.styles.css";

export function EditProductScene() {
    const productInfo = JSON.parse(sessionStorage.getItem('productInfo') || '{}');
    const { id, name, description, price, stock, category } = productInfo;
    

    const pageContent = `
        <div class="editProductContainer">
            <h1>Edit Product</h1>
            <form id="editProductForm">
                <label for="name">Product Name:</label>
                <input type="text" id="name" name="name" value="${name}" disabled><br>
                <label for="description">Description:</label>
                <input type="text" id="description" name="description" value="${description}" required><br>
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" value="${price}" required><br>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" value="${stock}" required><br>
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value="${category}" required><br>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    `;

    const logic = () => {
        const form = document.getElementById('editProductForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Obtener los valores del formulario
            const updatedProduct = {
                name: form.elements.name.value,
                description: form.elements.description.value,
                price: form.elements.price.value,
                stock: form.elements.stock.value,
                category: form.elements.category.value
            };

            // Enviar solicitud PUT para actualizar el producto
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });

                if (response.ok) {
                    // Producto actualizado exitosamente, redirigir a la página principal
                    navigateTo('/');
                } else {
                    // Error al actualizar el producto
                    console.error('Error updating product:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });
    };

    return {
        pageContent,
        logic
    };
}

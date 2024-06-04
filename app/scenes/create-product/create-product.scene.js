import { navigateTo } from "../../Router";
import styles from "./create-product.styles.css";

export function CreateNewProductScene(){
    const pageContent = `
    <div class="container">
        <form class="createForm">
            <input type="text" placeholder="Product name" id="name">
            <input type="text" placeholder="Description..." id="description">
            <input type="number" placeholder="Price" id="price">
            <input type="number" placeholder="Stock" id="stock">
            <input type="text" placeholder="Category" id="category">
            <button type="submit" id="createProdBtn">Add Product</button>
        </form>
    </div>
    `;


    const logic = () => {
        const createProdBtn = document.getElementById("createProdBtn");
        createProdBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const $name = document.getElementById("name").value;
            const $description = document.getElementById("description").value;
            const $price = document.getElementById("price").value;
            const $stock = document.getElementById("stock").value;
            const $category = document.getElementById("category").value;

            const apiUrl = "http://localhost:3000/products";

            const productData = {
                name: $name,
                description: $description,
                price: $price,
                stock: $stock,
                category: $category
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
            if(response.ok){
                alert("Product created successfully");
                navigateTo('/home')
            } else{
                console.log("algo no salio bien");
            }
            });
        
    };

    return {
        pageContent,
        logic
    }
}
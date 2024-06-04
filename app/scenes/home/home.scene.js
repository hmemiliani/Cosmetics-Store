import { navigateTo } from "../../Router";
import styles from "./home.styles.css";

export function HomeScene(){

    const role = localStorage.getItem('role');
    let CardButton;
    let addProduct;
    if(role == "Admin"){
        CardButton = `
        <button class="edit ${styles.btn}" data-id="edit">Editar</button>
        <button class="delete ${styles.btn}" data-id="delete">Borrar</button>
        `;
        addProduct = `<button id="create" class="${styles.btn}">Add Product</button>`;
    }
    if(role == "User"){
        CardButton = `<button class="buy ${styles.btn}">Comprar</button>`;
    }
    const pageContent = `
    <div class="${styles.homeContainer}">
        <div class="${styles.header}">
            <h1>Productos</h1>
        </div>
        <div id="productsCards" class="${styles.productCards}"></div>
        ${addProduct || ''}
    </div>
    `;

    const logic = () => {
        // Función para cargar los productos
        const allProducts = "http://localhost:3000/products";
        const loadProducts = async () => {
            const response = await fetch(allProducts);
            const products = await response.json();
            products.forEach(prod => {
                appendProductToList(prod);
            });
            // Ahora que las tarjetas están creadas, podemos agregar los event listeners a los botones
            addEventListeners();
        };

        // Función para añadir una tarjeta de producto al DOM
        const appendProductToList = (prod) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="${styles.card}">
                    <div class="info">
                        <h3>${prod.name}</h3>
                        <p>${prod.description}</p>
                        <h6>Valor:</h6>
                        <h4>${prod.price}</h4>
                        <small>Stock: ${prod.stock}</small><br>
                        <small>Category: ${prod.category}</small>
                    </div>
                    <div class="buttons">
                        ${CardButton}
                    </div>
                </div>
            `;
            
            //cambia el data-id por el id correcto que se quiere borrar
            const deleteButton = card.querySelector('.delete');
            if (deleteButton) {
                deleteButton.setAttribute('data-id', prod.id);
            }

            const editbutton = card.querySelector('.edit');
            if (editbutton) {
                editbutton.setAttribute('data-id', prod.id);
            }
            document.getElementById("productsCards").appendChild(card);
        };

        // Función para agregar event listeners a los botones
        const addEventListeners = () => {
            if(role == "User"){
                const $buttonBuy = document.querySelectorAll('.buy');
                $buttonBuy.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const card = e.target.closest('.card');
                        const id = e.target.getAttribute('data-id');
                        const name = card.querySelector('h3').textContent;
                        const description = card.querySelector('p').textContent;
                        const price = card.querySelector('h4').textContent;
                        const stock = card.querySelector('small:nth-child(5)').textContent.split(' ')[1];
                        const category = card.querySelector('small:nth-child(7)').textContent.split(' ')[1];

                        // Crear la información del producto
                        const productInfo = { id, name, description, price, stock, category };
                        sessionStorage.setItem('productInfo', JSON.stringify(productInfo));

                        // Navegar a la página de orden
                        navigateTo('/order');
                    });
                });
            }
            if(role == "Admin"){
                const $buttonEdit = document.querySelectorAll('.edit');
                const $buttonDelete = document.querySelectorAll('.delete');
                const $buttonCreate = document.querySelector('#create');
                
                $buttonEdit.forEach(button => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.card');
                        const id = button.getAttribute('data-id');
                        const name = card.querySelector('h3').textContent;
                        const description = card.querySelector('p').textContent;
                        const price = card.querySelector('h4').textContent;
                        const stock = card.querySelector('small:nth-child(5)').textContent.split(' ')[1];
                        const category = card.querySelector('small:nth-child(7)').textContent.split(' ')[1];

                        // Crear la escena de edición de productos con la información del producto
                        const productInfo = { id, name, description, price, stock, category };
                        sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
                        
                        // Navegar a la página de edición de productos
                        navigateTo('/editproduct');
                    });
                });

                $buttonDelete.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const id = e.target.getAttribute('data-id'); // Obtener el ID del producto desde el atributo data-id
                        const productName = e.target.closest('.card').querySelector('h3').textContent; // Obtener el nombre del producto
                        const confirmed = confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`); // Mostrar un mensaje de confirmación
                        if (confirmed) {
                            const response = await fetch(`http://localhost:3000/products/${id}`, {
                                method: 'DELETE',
                            });
                            if(response.ok){
                                const card = button.closest('.card'); // Obtener la tarjeta asociada al botón
                                if (card) {
                                    card.remove(); // Eliminar la tarjeta del DOM
                                }
                            }
                        }
                    });
                });
                

                $buttonCreate.addEventListener('click', () => {
                    navigateTo('/addproduct');
                });
            }
        };

        loadProducts();



    };

    return {
        pageContent,
        logic
    };
}

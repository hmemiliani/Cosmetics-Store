import { navigateTo } from "../../Router";
import styles from "./order.styles.css";

export function OrderScene() {
    const pageContent = `
    <div class="${styles.orderContainer}">
        <div class="${styles.header}">
            <h1>Confirmar Pedido</h1>
        </div>
        <div id="orderDetails" class="${styles.orderDetails}"></div>
        <button id="confirmOrder" class="${styles.btn}">Confirmar Pedido</button>
    </div>
    `;

    const logic = () => {
        const productInfo = JSON.parse(sessionStorage.getItem('productInfo'));

        if (!productInfo) {
            alert("No hay información del producto disponible.");
            navigateTo('/');
            return;
        }

        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = `
            <h3>${productInfo.name}</h3>
            <p>${productInfo.description}</p>
            <h6>Valor:</h6>
            <h4>${productInfo.price}</h4>
            <small>Stock: ${productInfo.stock}</small><br>
            <small>Category: ${productInfo.category}</small>
        `;

        document.getElementById('confirmOrder').addEventListener('click', () => {
            alert("Pedido confirmado");
            navigateTo('/');
        });
    };

    return {
        pageContent,
        logic
    };
}

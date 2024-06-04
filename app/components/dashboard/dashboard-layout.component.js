import { navigateTo } from "../../Router";
import styles from "./dashboard-layout.styles.css"

export function DashboardLayout(pageContent,logic){
    const root = document.getElementById('root');

    const logout = `<button type="button" id="logout" class="${styles.btn}">Logout</button>`
    
    root.innerHTML = `
    <nav class=${styles.nav}>
        <ul>
            <li><a href="/home">Productos</a></li>
            <li><a href="/order">Ordenes</a></li>
        </ul>
        ${logout}
    </nav>
    ${pageContent}
    `;

    logic();

const $logOut = root.querySelector('#logout');

$logOut.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigateTo('/login');
})

}
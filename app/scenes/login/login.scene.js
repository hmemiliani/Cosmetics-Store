import { navigateTo } from "../../Router";
import { decryptData } from "../../helpers/encrypt";
import { fetchApi } from "../../helpers/fetch.api";
import styles from "./login.styles.css"

export function LoginScene(){
    const root = document.getElementById('root');
    root.innerHTML = `
        <div  class="${styles.container}">
            <form class=${styles.loginForm}>
                <h2>Login</h2>
                <input type="email" placeholder="email@email.com" autocomplete="email">
                <input type="password" autocomplete="current-password" placeholder="Password">
                <button type="submit">Login</button>
                <button id="register-button">Register</button>
            </form>
        </div>
    `;
    const $emailHTML = root.querySelector('input[type="email"]');
    const $passHTML = root.querySelector('input[type="password"]');

    const $myForm = root.getElementsByTagName('form')[0];
    
    $myForm.addEventListener('submit', async (event) =>{
        event.preventDefault();

        if(!$emailHTML.value || !$passHTML.value){
            alert("Rellena todos los campos")
        }

        //fetch

        const users = await fetchApi('http://localhost:3000/users')
        const user = users.find(user => user.email === $emailHTML.value && decryptData(user.password) === $passHTML.value);
        if(user){
            const token = Math.random().toString(36).substring(2);
            const role = user.role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            navigateTo('/home');
        } else {
            alert("Credenciales incorrectas");
        }
    })

    const registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', () => {
        navigateTo('/register');
    });


}
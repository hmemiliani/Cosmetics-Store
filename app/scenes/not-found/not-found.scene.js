import styles from './not-found.styles.css'

export function NotFoundScene(){
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="${styles.container}">
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
        `;
}
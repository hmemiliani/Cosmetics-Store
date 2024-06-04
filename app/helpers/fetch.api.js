export async function fetchApi(url, options){
    try{
        const resp = await fetch(url, options);
        const data = await resp.json();
        return data;
    } catch (error){
        alert("Hubo un error", error);
    }

}
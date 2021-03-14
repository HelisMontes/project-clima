const container:any = document.querySelector('.container');
const resultado:any = document.querySelector('#resultado');
const formulario:any = document.querySelector('#formulario');
const ciudad:any=document.querySelector('#ciudad');
const pais:any=document.querySelector('#pais');

window.addEventListener('load', ()=>{
    document.addEventListener('submit', obtenerClima)
})

const obtenerClima = (e:any):void => {   
    e.preventDefault();
    if( ciudad.value ==='' || pais.value===''){
        printMessage('Ambos campos son obligatorios');
        return
    }
}

const printMessage = (message:string) => {
    const alerta:any = document.querySelector('.bg-red-100')
    if(!alerta){
        const divMessage:any = document.createElement('div');
        divMessage.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

        divMessage.innerHTML = `
            <strong class="font-bold">Error!</strong><br>
            <span class="block sm:inline">${message}</span>
        `;
        container.appendChild(divMessage);
        setTimeout(()=>{
            divMessage.remove();
        },3000);
    }
}
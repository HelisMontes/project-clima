const container:any = document.querySelector('.container');
const resultado:any = document.querySelector('#resultado');
const formulario:any = document.querySelector('#formulario');
const ciudad:any=document.querySelector('#ciudad');
const pais:any=document.querySelector('#pais');

window.addEventListener('load', ()=>{
    document.addEventListener('submit', obtenerClima);
})

const obtenerClima = (e:any):void => {   
    e.preventDefault();
    if( ciudad.value ==='' || pais.value===''){
        printMessage('Ambos campos son obligatorios');
        return
    };
    consultarApi(ciudad.value, pais.value);
};

const printMessage = (message:string):void => {
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
    };
};

const consultarApi = (ciudad:string, pais:string):void => {
    const apiKey:string = '366c702cc6505ba2ca508a46c7d8552b';
    const url:string = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
    fetch(url)
        .then(result => result.json())
        .then(data => {
            const {cod, main:{temp, temp_max, temp_min}}= data
            if(cod === '404'){
                printMessage('La ciudad no existe');
                return;
            };
            console.log(temp, temp_max, temp_min)
        });

}
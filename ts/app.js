const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');
window.addEventListener('load', () => {
    document.addEventListener('submit', obtenerClima);
});
const obtenerClima = (e) => {
    e.preventDefault();
    if (ciudad.value === '' || pais.value === '') {
        printMessage('Ambos campos son obligatorios');
        return;
    }
};
const printMessage = (message) => {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const divMessage = document.createElement('div');
        divMessage.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center");
        divMessage.innerHTML = `
            <strong class="font-bold">Error!</strong><br>
            <span class="block sm:inline">${message}</span>
        `;
        container.appendChild(divMessage);
        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    }
};

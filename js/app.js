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
    ;
    consultarApi(ciudad.value, pais.value);
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
    ;
};
const consultarApi = (ciudad, pais) => {
    const apiKey = '366c702cc6505ba2ca508a46c7d8552b';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    Spinner();
    fetch(url)
        .then(result => result.json())
        .then(data => {
        romveHTML();
        const { cod } = data;
        if (cod === '404') {
            printMessage('La ciudad no existe');
            return;
        }
        ;
        printData(data);
    });
};
const printData = (data) => {
    const { name, main: { temp, temp_max, temp_min } } = data;
    const grados = kelvinAndFahrenheit(temp);
    const max = kelvinAndFahrenheit(temp_max);
    const min = kelvinAndFahrenheit(temp_min);
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${grados.toFixed()} &#8451;`;
    tempActual.classList.add('font-bold', 'text-6xl');
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max.toFixed()} &#8451;`;
    tempMaxima.classList.add('text-xl');
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min.toFixed()} &#8451;`;
    tempMinima.classList.add('text-xl');
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    resultado.appendChild(resultadoDiv);
};
const kelvinAndFahrenheit = (temp) => temp - 273.15;
const romveHTML = () => {
    while (resultado.firstChild) {
        resultado.firstChild.remove();
    }
    ;
};
function Spinner() {
    romveHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}

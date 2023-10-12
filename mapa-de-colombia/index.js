


const datos = [
    { 'Depto residencia Estd': 'amazonas', puntaje: 229 },
    { 'Depto residencia Estd': 'antioquia', puntaje: 247 },
    { 'Depto residencia Estd': 'arauca', puntaje: 242 },
    { 'Depto residencia Estd': 'atlantico', puntaje: 248 },
    { 'Depto residencia Estd': 'bogota', puntaje: 269 },
    { 'Depto residencia Estd': 'bolivar', puntaje: 232 },
    { 'Depto residencia Estd': 'boyaca', puntaje: 261 },
    { 'Depto residencia Estd': 'caldas', puntaje: 252 },
    { 'Depto residencia Estd': 'caqueta', puntaje: 239 },
    { 'Depto residencia Estd': 'casanare', puntaje: 249 },
    { 'Depto residencia Estd': 'cauca', puntaje: 236 },
    { 'Depto residencia Estd': 'cesar', puntaje: 243 },
    { 'Depto residencia Estd': 'choco', puntaje: 215 },
    { 'Depto residencia Estd': 'cordoba', puntaje: 240 },
    { 'Depto residencia Estd': 'cundinamarca', puntaje: 257 },
    { 'Depto residencia Estd': 'guainia', puntaje: 232 },
    { 'Depto residencia Estd': 'guaviare', puntaje: 236 },
    { 'Depto residencia Estd': 'huila', puntaje: 254 },
    { 'Depto residencia Estd': 'la guajira', puntaje: 230 },
    { 'Depto residencia Estd': 'magdalena', puntaje: 228 },
    { 'Depto residencia Estd': 'meta', puntaje: 251 },
    { 'Depto residencia Estd': 'nariÃ±o', puntaje: 252 },
    { 'Depto residencia Estd': 'norte santander', puntaje: 259 },
    { 'Depto residencia Estd': 'putumayo', puntaje: 241 },
    { 'Depto residencia Estd': 'quindio', puntaje: 254 },
    { 'Depto residencia Estd': 'risaralda', puntaje: 255 },
    { 'Depto residencia Estd': 'santander', puntaje: 267 },
    { 'Depto residencia Estd': 'sucre', puntaje: 240 },
    { 'Depto residencia Estd': 'tolima', puntaje: 245 },
    { 'Depto residencia Estd': 'valle', puntaje: 247 },
    { 'Depto residencia Estd': 'vaupes', puntaje: 213 },
    { 'Depto residencia Estd': 'vichada', puntaje: 232 }
  ]


  function mostrarOcultarDetalleDepartamento(element,data) {

    // si solo esta siendo seleccionado uno entonces se trae esta vaina que es 
    // mostrar el div con la informacion 
    
    // Convertir nombres de departamentos a mayúsculas y reemplazar "nariño" con "Nariño"
    const depa= document.getElementById('info-dep-avg');
    
    datos.forEach(departamento => {
        const nombreDepartamento = departamento['Depto residencia Estd'];
        const idElemento = element.id.toLowerCase();
       
        // Compara si el nombre del departamento coincide con el ID del elemento
        if (nombreDepartamento === idElemento) {
            // Muestra el puntaje en consola si hay una coincidencia
            console.log(`Puntaje global promedio en ${nombreDepartamento}: ${departamento.puntaje}`);
            depa.innerHTML = `Promedio en ${element.id} de ${departamento.puntaje}`
            depa.style.fontFamily = "Comfortaa, sans-serif";
            depa.style.textAlign = 'center';
            depa.style.paddingTop = '5px'
        }if( nombreDepartamento =='nariÃ±o' && idElemento =='nariño'){
            depa.innerHTML =`Promedio en ${element.id} de ${departamento.puntaje}`
            depa.style.fontFamily = "Comfortaa, sans-serif";
            depa.style.textAlign = 'center';
            depa.style.paddingTop = '5px'
           
        }
        
    });



    
}

function seleccionarDepartamento(element,data) {
    // Se busca por clase si existe la case "click-departamento"
    // si existe se elimina y se agrega la clase "departamento-estandar"
    // despues al elemnto Departamento se le remueve su clase actual y
    // se agrega la case "click-departamento" asi garantizamos
    // que solo un elemento tenga la clase "click-departamento".

    const yaSeleccionado = document.getElementsByClassName(
        "departamento-seleccionado");

    if (yaSeleccionado.length > 0) {// esto es por si se selecciona otro departamento, entonces ya se selccionan mas de 1 
        yaSeleccionado[0].classList.add("color-departamento-estandar")
        yaSeleccionado[0].classList.remove("departamento-seleccionado");
    }

    
        mostrarOcultarDetalleDepartamento(element,data);
    
    
    element.classList.add("departamento-seleccionado");
    element.classList.remove("color-departamento-estandar");
}
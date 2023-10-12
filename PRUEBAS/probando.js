// segundo.js


// main.mjs
import { data2 } from './fetchPpl.js';

console.log("Inicio");

setTimeout(function() {
    console.log(data2); // Accede al array y úsalo como sea necesario
    console.log("Dentro del setTimeout");
}, 3000);

console.log("Fin");




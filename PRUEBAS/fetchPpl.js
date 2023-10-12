// fetch('http://localhost:4000/api/data')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);

//     console.log(data[0])
//     console.log(data[1])

    

//   })
//   // esto es si la peticion a la api no funciona
//   .catch(error => {
//     console.error('Error al obtener datos:', error);
//   });




  // FECTH CUANDO SE US EL TYPE MODULE
//  let data2 = [];

// fetch('http://localhost:3000/api/data') // Reemplaza 'URL_DEL_API' con la URL de tu API
//   .then(response => response.json())
//   .then(data => {
//       console.log("hola desdes fetch ")
//       console.log(data)
//         data2 = data
     
//   })
//   .catch(error => {
//     console.error('Error al obtener datos:', error);
//   });

// export { data2 }; // Exporta el array después de que se resuelve el fetch


 var query = 'select [Depto residencia Estd] ,avg(punt_global) promedioPuntaje  from dbo.datos group by [Depto residencia Estd]';

// Agrega el parámetro 'query' a la URL como una cadena de consulta
var url = `http://localhost:3000/api/data?query=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Hacer algo con los datos obtenidos
    console.log(data);
    console.log('probando')

  })
  .catch(error => {
    // Manejar errores
    console.error('Error al obtener datos:', error);
  });







const express = require('express');
const app = express();
const cors = require('cors'); // Importa el paquete cors
const { Connection, Request } = require('tedious');

// Configurar conexión a la base de datos
const config = {
    server: 'LAPTOP-VOL1V24V\\SQLEXPRESS',
    authentication: {
      type: 'default',
      options: {
        userName: 'sa',
        password: '123456'
      }
    },
    options: {
      port: 1433,
      database: 'bd',
      trustServerCertificate: true // Habilita la encriptación SSL que es el protocolo de seguridad 
    }
  };
  app.use(cors()); // Habilita CORS para todas las rutas
// Endpoint para obtener datos desde la base de datos
app.get('/api/data', (req, res) => {
    const connection = new Connection(config);
    connection.connect();

    connection.on('connect', async (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        res.status(500).json({ error: 'Error de conexión a la base de datos' });
    } else {

        // cuando se conecta a la base de datos 
        try {
            // hacer las consultas 
          const results = await executeQueries();
          res.json(results);
        } catch (error) {
          console.error('Error al ejecutar las consultas:', error);
          res.status(500).json({ error: 'Error al ejecutar las consultas' });
        } finally {
          connection.close();
        }
      }
    });
  
    async function executeQueries() {

      // aquí se escriben las queries que se vayna a hacer
      const queries = [
        'select Estrato, avg(punt_global) promedioPuntajeGlobal from dbo.datos group by Estrato  order by promedioPuntajeGlobal',
        'select [Depto residencia Estd] ,avg(punt_global) promedioPuntaje  from dbo.datos group by [Depto residencia Estd]' ,
        
        // Agrega más consultas aquí si es necesario
      ];
  
      const results = [];// cada espacio de resultados, es unla lista con los resultados de cada query especificados arriba
  

      // ejecuctando las queries
      for (const query of queries) {
        const data = await executeQuery(query);
        results.push(data);// lo que devuelva cada query se agrega a la result que es el resultado final de todas las queries que se vayan a realizar
      }
  
      return results;
    }
  
    // aqui se ejcuta query por query individualmente
    function executeQuery(query) {
      // se devuelve una promesa, basicamente mirarlo solo como un return y ya 
      return new Promise((resolve, reject) => {

        // lo mismo que se hace en server con one query
        const data = [];
  
        const request = new Request(query, (err, rowCount) => {
          if (err) {
            reject(new Error('Error al ejecutar la consulta'));
          } else {
            resolve(data);// esto es lo que devuelve la query
          }
        });
  
        // organizar la info que devuelve la query en una lista siento cada espacio en la lista un objeto ( cada row del query)
        request.on('row', columns => {
          const rowData = {};
          columns.forEach(column => {
            rowData[column.metadata.colName] = column.value;
          });
          data.push(rowData);
        });
  
        connection.execSql(request);// aqui es donde en sí se ejecuta el request
      });
    }
  });
  

  // poner el puerto a escuchar las peticiones de index.js 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
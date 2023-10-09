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
  
  const data = [];

  connection.on('connect', (err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err.message);
      res.status(500).json({ error: 'Error de conexión a la base de datos' });
    } else {
      executeStatement();
    }
  });

  function executeStatement() {
    const request = new Request("select Estrato, avg(punt_global) promedioPuntajeGlobal from dbo.datos group by Estrato  order by promedioPuntajeGlobal", (err, rowCount) => {
      if (err) {
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
      } else {
        res.json(data);
        connection.close();
      }
    });

    request.on('row', (columns) => {

      const rowData = {};
      columns.forEach((column) => {
        rowData[column.metadata.colName] = column.value;
      });
      data.push(rowData);
    });

    connection.execSql(request);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

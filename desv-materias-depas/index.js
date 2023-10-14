query = "WITH promMate (depa, desviacion_matematicas) AS (SELECT [Depto residencia Estd], STDEV(punt_matematicas) AS desviacion FROM dbo.datos GROUP BY [Depto residencia Estd]),promNaturales (depa, desviacion_naturales) AS (SELECT [Depto residencia Estd], STDEV(punt_c_naturales) AS desviacion FROM dbo.datos GROUP BY [Depto residencia Estd]),promSociales (depa, desviacion_sociales) AS ( SELECT [Depto residencia Estd], STDEV(punt_sociales_ciudadanas) AS desviacion FROM dbo.datos GROUP BY [Depto residencia Estd]),promLectura (depa, desviacion_lectura) AS ( SELECT [Depto residencia Estd], STDEV(punt_lectura_critica) AS desviacion FROM dbo.datos GROUP BY [Depto residencia Estd]),promIngles (depa, desviacion_ingles) AS (SELECT [Depto residencia Estd], STDEV(punt_ingles) AS desviacion FROM dbo.datos GROUP BY [Depto residencia Estd])SELECT promMate.depa,promMate.desviacion_matematicas as desvmath,promNaturales.desviacion_naturales as desvNaturales,promSociales.desviacion_sociales as desvSociales,promLectura.desviacion_lectura as desvLectura, promIngles.desviacion_ingles as desvIngles FROM promMate JOIN promNaturales ON promMate.depa = promNaturales.depa JOIN promSociales ON promMate.depa = promSociales.depa JOIN promLectura ON promMate.depa = promLectura.depa JOIN promIngles ON promMate.depa = promIngles.depa"
url = `http://localhost:3004/api/data?query=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde desviacion estandar")
    console.log(data);
    
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('#chart-desv')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const materias = ['desvMath', 'desvNaturales', 'desvSociales', 'desvLectura', 'desvIngles'];
const colors = ['red', 'green', 'blue', 'orange', 'purple'];

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(materias.map(materia => d[materia])))])
    .range([height, 0]);

const lineGenerator = d3.line()
    .x((d, i) => i * (width / (materias.length - 1)))
    .y(d => yScale(d));

materias.forEach((materia, index) => {
    svg.append('path')
        .datum(data.map(d => d[materia]))
        .attr('fill', 'none')
        .attr('stroke', colors[index])
        .attr('stroke-width', 2)
        .attr('data-id', index) // Agrega el atributo data-id
        .attr('d', lineGenerator)
        .on('mouseover', function () {
          
            const id = d3.select(this).attr('data-id'); // Recupera el data-id
            const departamento = data[id].depa;
            const materia = materias[id];
            const desviacion = data[id][materia];
            console.log(`Departamento: ${departamento}\nMateria: ${materia}\nDesviación: ${desviacion}`)
            d3.select(this).attr('stroke-width', 4);
            svg.append('text')
                .attr('class', 'tooltip')
                .attr('x', 0 )
                .attr('y', yScale(desviacion))
                .text(`Departamento: ${departamento}\nMateria: ${materia}\nDesviación: ${desviacion}`)
                .attr('alignment-baseline', 'middle');
        })
        .on('mouseout', function () {
            d3.select(this).attr('stroke-width', 2);
            svg.select('.tooltip').remove();
        });
});

// Eje Y
svg.append('g')
    .call(d3.axisLeft(yScale));

// Agrega etiquetas para las materias (no es necesario en el eje X según tu solicitud)
// svg.selectAll('.materia-label')
//     .data(materias)
//     .enter().append('text')
//     .attr('class', 'materia-label')
//     .attr('x', (d, i) => i * (width / (materias.length - 1)))
//     .attr('y', height + 20)
//     .attr('text-anchor', 'middle')
//     .text(d => d);

// Estilo para la línea de la regla horizontal
svg.selectAll('.rule')
    .data(yScale.ticks())
    .enter().append('line')
    .attr('class', 'rule')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', d => yScale(d))
    .attr('y2', d => yScale(d));






  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
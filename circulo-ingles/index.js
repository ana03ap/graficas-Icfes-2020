// Define tus datos

// Define tus datos

query = "WITH nueva AS (SELECT SUM(CASE WHEN d.desemp_ingles='a-' THEN 1 ELSE 0 END) AS 'Nivel A-',SUM(CASE WHEN d.desemp_ingles='a1' THEN 1 ELSE 0 END) AS 'Nivel A1',SUM(CASE WHEN d.desemp_ingles='a2' THEN 1 ELSE 0 END) AS 'Nivel A2',SUM(CASE WHEN d.desemp_ingles='b1' THEN 1 ELSE 0 END) AS 'Nivel B1',SUM(CASE WHEN d.desemp_ingles='b+' THEN 1 ELSE 0 END) AS 'Nivel B+' FROM dbo.datos d)SELECT * FROM nueva"
const datosss  = [{
  'Nivel A-': 540,
  'Nivel A1': 56783,
  'Nivel A2': 135738,
  'Nivel B1': 122513,
  'Nivel B+': 54749,
}]

const datoss = Object.entries(datosss[0]).map(([label, raw]) => ({
label: label,
raw: raw
}));

console.log(datoss)
  // Define el tamaño del lienzo del gráfico
  const width = 800;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  

  // Define una escala de colores personalizada
  const customColors = ["#0369B0", "#a0cf67", "#7790c3", "#4e9399", "#7fb382"];
  
  // Crea el lienzo SVG para el gráfico
  const svg = d3.select('#chart-ingles')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);
  
  // Crea una función para generar el arco de cada sección del gráfico
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
  
  // Crea una función para generar el diseño de pastel
  const pie = d3.pie()
    .value(d => parseFloat(d.raw));
  
  // Agrega las secciones del gráfico de pastel
  const g = svg.selectAll(".arc")
    .data(pie(datoss))
    .enter().append("g")
    .attr("class", "arc");
  
  // Dibuja los arcos del gráfico y asigna colores personalizados
  g.append("path")
    .attr("d", arc)
    .style("fill", (d, i) => customColors[i]) // Asigna colores personalizados
    .on('click', function (event, d) {

    // hago que la carta que tiene 
    //   alert(`Label: ${d.data.label}, Raw Value: ${d.data.raw}`);

    //AQUI HACER QUE SE PONGA MÁS ARRIBA LAS LINEAS QUE PONGA CON EL TEXTO 
    });
  
  
  
  
  
  















  
 

query = "WITH nueva AS (SELECT SUM(CASE WHEN d.desemp_ingles='a-' THEN 1 ELSE 0 END) AS 'Nivel A-',SUM(CASE WHEN d.desemp_ingles='a1' THEN 1 ELSE 0 END) AS 'Nivel A1',SUM(CASE WHEN d.desemp_ingles='a2' THEN 1 ELSE 0 END) AS 'Nivel A2',SUM(CASE WHEN d.desemp_ingles='b1' THEN 1 ELSE 0 END) AS 'Nivel B1',SUM(CASE WHEN d.desemp_ingles='b+' THEN 1 ELSE 0 END) AS 'Nivel B+' FROM dbo.datos d)SELECT * FROM nueva";
// Agrega el parámetro 'query' a la URL como una cadena de consulta
url = `http://localhost:3003/api/data?query=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde circulo en ingles")
    console.log(data);
    const color1 = document.getElementById("txt-uno-CI");
    const color2 = document.getElementById("txt-dos-CI");
    const color3 = document.getElementById("txt-tres-CI");
    const color4 = document.getElementById("txt-cuatro-CI");
    const color5 = document.getElementById("txt-cinco-CI");

    const uno = document.getElementById("uno-CI");
    const dos = document.getElementById("dos-CI");
    const tres = document.getElementById("tres-CI");
    const cuatro = document.getElementById("cuatro-CI");
    const cinco = document.getElementById("cinco-CI");
   


function normal(){
  uno.style.transform='scale(1.0)';
  dos.style.transform='scale(1.0)';
  tres.style.transform='scale(1.0)';
  cuatro.style.transform='scale(1.0)';
  cinco.style.transform='scale(1.0)';
}

    const niveles = Object.keys(data[0]);

    color1.innerHTML = `${niveles[0]} No de Personas ${data[0][niveles[0]]}`;
    color2.innerHTML = `${niveles[1]} No de Personas ${data[0][niveles[1]]}`;
    color3.innerHTML = `${niveles[2]} No de Personas ${data[0][niveles[2]]}`;
    color4.innerHTML = `${niveles[3]} No de Personas ${data[0][niveles[3]]}`;
    color5.innerHTML = `${niveles[4]} No de Personas ${data[0][niveles[4]]}`;



    const datoss = Object.entries(data[0]).map(([label, raw]) => ({
      label: label,
      raw: raw
      }));
      
      console.log(datoss)
        // Define el tamaño del lienzo del gráfico
        const width = 600;
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
            console.log("d",d)
            if(d.data.label=='Nivel A-'){
              normal()
              uno.style.transform='scale(1.1)';
            }else if(d.data.label=='Nivel A1'){
              normal()
              dos.style.transform='scale(1.1)';

            }else if(d.data.label=='Nivel A2'){
              normal()
              tres.style.transform='scale(1.1)';

            }else if(d.data.label=='Nivel B1'){
              normal()
              cuatro.style.transform='scale(1.1)';

            }else{
            normal()
              cinco.style.transform='scale(1.1)';

            }

          // hago que la carta que tiene 
          // alert(`Label: ${d.data.label}, Raw Value: ${d.data.raw}`);
            
          
          });
        
        


    
  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });

// const datosss  = [{
//   'Nivel A-': 219218,
//   'Nivel A1': 100073,
//   'Nivel A2': 34520,
//   'Nivel B1': 21445,
//   'Nivel B+': 4917,
// }]


  
  
  
  















  
 
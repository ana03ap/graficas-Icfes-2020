query="with internet(depa,global, mate, natu, soci, lect, ingl) as (select [Depto residencia Estd], AVG(punt_global) global,  AVG(punt_matematicas) mate,  AVG(punt_c_naturales) natu,  AVG(punt_sociales_ciudadanas) soci,  AVG(punt_lectura_critica) lect ,  AVG(punt_lectura_critica) ingl from bd.dbo.datos where   fami_tieneinternet = 'si' group by [Depto residencia Estd]),noInternet(depa,global, mate, natu, soci, lect, ingl) as ( select [Depto residencia Estd], AVG(punt_global) global,  AVG(punt_matematicas) mate,  AVG(punt_c_naturales) natu,  AVG(punt_sociales_ciudadanas) soci,  AVG(punt_lectura_critica) lect ,  AVG(punt_lectura_critica) ingl from datos where   fami_tieneinternet = 'no' group by [Depto residencia Estd] ) select internet.depa,internet.global as 'Con internetG', noInternet.global as 'Sin internetG',internet.mate as 'Con internetM', noInternet.mate as 'Sin internetM',internet.natu as 'Con internetN', noInternet.natu as 'Sin internetN',internet.soci as 'Con internetS', noInternet.soci as 'Sin internetS',internet.lect as 'Con internetL', noInternet.lect as 'Sin internetL',internet.ingl as 'Con internetI', noInternet.ingl as 'Sin internetI' from internet join noInternet on  noInternet.depa= internet.depa"

url = `http://localhost:3004/api/data?query=${encodeURIComponent(query)}`;



  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde internet")
    console.log(data);
    
    const dataGlobal = data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetG'],
        'Sin internet': item['Sin internetG']
      };
    });
    console.log(dataGlobal)
    const dataMate = data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetM'],
        'Sin internet': item['Sin internetM']
      };
    });
    
    const dataLectura= data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetL'],
        'Sin internet': item['Sin internetL']
      };
    });
    
    const dataNaturales = data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetN'],
        'Sin internet': item['Sin internetN']
      };
    });
    
    const dataSociales = data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetS'],
        'Sin internet': item['Sin internetS']
      };
    });
    
    const dataIngles = data.map(item => {
      return {
        depa: item.depa,
        'Con internet': item['Con internetI'],
        'Sin internet': item['Sin internetI']
      };
    });
    
     const svgWidth = 700;
     const svgHeight = 700;
     const margin = { top: 20, right: 40, bottom: 80, left: 60 };
     const width = svgWidth - margin.left - margin.right;
     const height = svgHeight - margin.top - margin.bottom;
    
     const svg = d3.select("#chart-internet").append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    
    const materiaSelector = document.getElementById("materiaSelector");
    
    
    
    function updateChart(selectedData) {
      const xScale = d3.scaleBand()
        .domain(selectedData.map(d => d.depa))
        .range([0, width])
        .padding(0.1);
    
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(selectedData, d => Math.max(d['Con internet'], d['Sin internet']))])
        .nice()
        .range([height, 0]);
    
      svg.selectAll("*").remove();
    
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
      g.selectAll(".bar-con-internet")
        .data(selectedData)
        .enter().append("rect")
        .attr("class", "bar-con-internet")
        .attr("x", d => xScale(d.depa))
        .attr("y", d => yScale(d['Con internet']))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", d => height - yScale(d['Con internet']))
        .attr("fill", "#D6f888");
    
      g.selectAll(".bar-sin-internet")
        .data(selectedData)
        .enter().append("rect")
        .attr("class", "bar-sin-internet")
        .attr("x", d => xScale(d.depa) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d['Sin internet']))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", d => height - yScale(d['Sin internet']))
        .attr("fill", "#74698c");
    
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");
    
      g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
    
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Promedio");
    
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + margin.right},${margin.top})`);
    
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#D6f888");
    
      legend.append("text")
        .attr("x", 30)
        .attr("y", 10)
        .text("Con");
    
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#74698c");
    
      legend.append("text")
        .attr("x", 30)
        .attr("y", 40)
        .text("Sin");
  
        
        g.selectAll('.tick text')
        .style('font-family', 'Comfortaa, sans-serif');
  
      g.selectAll('text')
        .style('font-family', 'Comfortaa, sans-serif');
    }
    
    // Inicializa el gráfico con la opción predeterminada
    
    updateChart(dataGlobal);
    materiaSelector.addEventListener("change", () => {
      const selectedOption = materiaSelector.value;
       let selectedData;
    
      switch (selectedOption) {
        case "dataGlobal":
          selectedData = dataGlobal;
          break;
        case "dataMate":
          selectedData = dataMate;
          break;
        case "dataLectura":
          selectedData = dataLectura;
          break;
        case "dataNaturales":
          selectedData = dataNaturales;
          break;
        case "dataSociales":
          selectedData = dataSociales;
          break;
        case "dataIngles":
          selectedData = dataIngles;
          break;
        default:
          selectedData = dataGlobal;
          break;
      }
    
      updateChart(selectedData);
    });
    





  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });


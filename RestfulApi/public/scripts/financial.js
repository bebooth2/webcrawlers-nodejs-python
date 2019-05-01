
var width = 700;
var height = 700;
var data = d3.select("h1").text();
var url = `/${data}`
var data = []

d3.request(url)
	.get(function(data){
		let stocks = (JSON.parse(data.responseText))
		logging(stocks)
		});
function logging(x){

	for(var i = 0; i< x.stocks.length; i++){
		console.log(x.stocks[i].time)
		let time = x.stocks[i].time;
		let str = x.stocks[i].price;
		let price = str;
	
		if(isNaN(price)){
		 price = parseFloat(price.replace(",", ""))
		
	    }
		data.push({time, price});
	
	}


	draw(data)
}

function draw(data){
	console.log("hi")
	var margin = {top: 10, right: 50 , bottom: 150 , left:130 };
	var width = window.innerWidth - margin.left - margin.right,
		height = window.innerHeight -margin.top- margin.bottom;



	var svg = d3.select("div.svg")
				.append("svg")
				.attr("width", width)
				.attr("height", height)

    var x = d3.scaleBand()
	    .domain(data.map(function(d){return d.time;}))
	    .range([margin.left, width ]);

	var y = d3.scaleLinear()
	        .domain([d3.min(data,d =>{return d.price;}), d3.max(data,d =>{return d.price;})])
	        .range([height - margin.bottom, margin.top]);
	
	var xAxis = d3.axisBottom()
				.scale(x)
  				.tickValues(x.domain()
  					.filter(function(d,i){ return !(i%10)}));

  	var yAxis = d3.axisLeft(y)
  				.ticks(10)

					

	var g = svg.append("g")
			
		
		
		
		g.append("g")
			.attr('transform', `translate(0,${height - margin.bottom})`)
				.call(xAxis)

		g.append("g")
		    .attr('transform', `translate(${margin.left}, 0)`)
			.call(yAxis)		

	var line = d3.line()
		.defined(d=>!isNaN(d.price))
		.x(d=>x(d.time))
		.y(d=>y(d.price))

	svg.append("path")
		.datum(data)
		.attr("fill","none")
		.attr("stroke", "steelblue")
		.attr("stroke-width",1.5)
		.attr("strock-linejoin", "round")
		.attr("stroke-.linecap", "round")
		.attr("d", line)
	}
	     

	


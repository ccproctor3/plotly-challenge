function init () {
	d3.json("samples.json").then((data) => {

			
		var names = data.names.map(name => name);
		// populate select box
		var select = document.getElementById("selDataset");
		for(index in names) {
		    select.options[select.options.length] = new Option(names[index]);
		   }
		let top10x = data.samples[0].otu_ids.slice(0,10)
		let top10y = data.samples[0].sample_values.slice(0,10)
		let top10label = data.samples[0].otu_labels.slice(0,10)

		var trace1 = { x: top10x, y: top10y, text: top10label, type: "bar"}; // fill the lists
		var data1 = [trace1]; // place trace(s) in data
		var layout1 = {title: 'Top 10 Bacteria Cultures Found', xaxis: {type: 'category'}};  //elements of plot
		Plotly.newPlot("bar", data1, layout1); //plotly command

		let id = data.samples[0].otu_ids
		let samplevalues = data.samples[0].sample_values
		let label = data.samples[0].otu_labels

		var trace2 = {x: id, y: samplevalues, mode: 'markers',  text: label, marker: {size: samplevalues, color: id}}
		var data2 = [trace2]
		var layout2 = {title: 'Bacteria Cultures Per Sample'};
		Plotly.newPlot("bubble", data2, layout2);

		let tbody = d3.select(".panel-body");
		Object.entries(data.metadata[0]).forEach(([key, value]) => {  //grab the key and the value for each element in weatherreport 
			tbody.append("p").text(key + ": " +value);//append the text of each of those values to p
		});
	});
};

function optionChanged() {

	var select = d3.select("#selDataset").property("value");
	var CHART = d3.selectAll("#bar").node();
	var CHART2 = d3.selectAll("#bubble").node();
	document.getElementById("sample-metadata").innerHTML = ""

	d3.json("samples.json").then((data) => {
		for(value in data.samples){
		    	var currentvalue = data.samples[value]
		    	if (currentvalue.id == select){
		    		console.log(currentvalue.id)
		    		let x = currentvalue.otu_ids.slice(0,10)
					let y = currentvalue.sample_values.slice(0,10)
					let text = currentvalue.otu_labels .slice(0,10)

					Plotly.restyle(CHART, "x", [x]);
  					Plotly.restyle(CHART, "y", [y]);
  					Plotly.restyle(CHART, "text", [text]);
  					let update = {xaxis: {type: 'category'}};
  					Plotly.relayout(CHART,update);

  					let id2 = currentvalue.otu_ids
					let samplevalues2 = currentvalue.sample_values
					let label2 = currentvalue.otu_labels

  					Plotly.restyle(CHART2, "x", [id2]);
  					Plotly.restyle(CHART2, "y", [samplevalues2]);
  					Plotly.restyle(CHART2, "text", [label2]);
  					Plotly.restyle(CHART2, "color", [id2]);
  					Plotly.restyle(CHART2, "size", [samplevalues2]);

		    	};
		    };

		for(value in data.metadata){
		    	var currentvalue2 = data.metadata[value]
		    	if (currentvalue2.id == select){
	

		    		let tbody = d3.select(".panel-body");
		    		Object.entries(currentvalue2).forEach(([key, value]) => {  //grab the key and the value for each element in weatherreport 
					tbody.append("p").text(key + ": " +value);//append the text of each of those values to p
						});


		    	}};


	});
	
};

init();
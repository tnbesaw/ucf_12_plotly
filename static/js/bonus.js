function buildGauge(sample) {
    console.log(sample);
    d3.json("/wfreq/" + sample).then((wfreq) => {

        // create hook to html element where guage chart goes
        var guage = d3.select("#gauge");
    
        // clear any prior html
        guage.html('')
  
        // WFEQ is a value from 0 to 9 
        var level = (wfreq.WFREQ * 20);
        console.log(wfreq.WFREQ)
        
        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [
            { type: 'scatter',
              x: [0], y:[0],
              marker: {size: 28, color:'850000'},
              showlegend: false,
              name: 'frequency',
              text: wfreq.WFREQ,
              hoverinfo: 'text+name'
            },
            { values: [90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90],
              rotation: 90,
              text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
              textinfo: 'text',
              textposition:'inside',
              marker: {colors:[ 'rgba( 24, 106,  59, .5)', 'rgba( 29, 131,  72, .5)',
                                'rgba( 35, 155,  86, .5)', 'rgba( 40, 180,  99, .5)',
                                'rgba( 46, 204, 113, .5)', 'rgba( 88, 214, 141, .5)',
                                'rgba(130, 224, 170, .5)', 'rgba(171, 235, 198, .5)',
                                'rgba(213, 245, 227, .5)', 'rgba(255, 255, 255, 0)']},
              labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
              hoverinfo: 'label',
              hole: .5,
              type: 'pie',
              showlegend: false
        }];

        var layout = {
            margin: {
                t: 100, //top margin
                l: 10, //left margin
                r: 10, //right margin
                b: 10 //bottom margin
                },            
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
                }],
            title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
            height: 500,
            width: 450,
            xaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);
    });
};
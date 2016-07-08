'use strict';

google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawTempChart);

function drawTempChart(response) {

  let formattedData = [['Date', 'Max Temp', 'Min Temp'],];

  response.results.forEach(function(day){
    let dayArray = [];
    day = JSON.parse(day);
    dayArray.push(new Date(Number(day.daily.data[0].time)*1000));
    dayArray.push(day.daily.data[0].temperatureMax);
    dayArray.push(day.daily.data[0].temperatureMin);
    formattedData.push(dayArray);
  });


  let data = google.visualization.arrayToDataTable(formattedData);

  let options = {
    title: 'Temperature Over Time',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  let chart = new google.visualization.LineChart(document.getElementById('chart-div'));

  chart.draw(data, options);
}

// google.charts.setOnLoadCallback(drawTempChart);

module.exports = {
  drawTempChart,
};

const options = {
    headers: {
      'x-access-token': 'coinranking7fd3f14c2391364c92ec4887a9f3120b502031737e1277f0',
    },
  };
  
  fetch('https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history?timePeriod=1y', options)
    .then((response) => response.json())
    .then((result) =>  {
    const res = result.data.history;
    renderLineChart(res)
    renderBarChart(res)
})

function getSeries(result){
  
  const sumForMonth = [];
  const numberOfDays = [];
  let final =[];



  result.forEach((entry) => {
      
    const {timestamp, price} = entry
    let date = new Date(timestamp*1000)
    const month =  date.getMonth();  
      
  if(sumForMonth[month] ) {
      sumForMonth[month] = sumForMonth[month] + Number(price);
      numberOfDays[month] = numberOfDays[month] + 1;
    } else {
      sumForMonth[month] =  Number(price); 
      numberOfDays[month] = 1;
    }  
    });



  for( let i= 0; i<sumForMonth.length; i++  ) {
    final.push(Math.floor(sumForMonth[i]/numberOfDays[i]))
  }

  return final
}
function renderLineChart(result){
  NamesOfMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']

  //строим график
  
    var options = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'price',
        data: getSeries(result)
      }],
      xaxis: {
        categories:   NamesOfMonths
      }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
}
function renderBarChart(result){
var options = {
  series: [{
  name: 'Inflation',
  data: getSeries(result)
}],
  chart: {
  height: 350,
  type: 'bar',
},
plotOptions: {
  bar: {
    borderRadius: 10,
    dataLabels: {
      position: 'top', // top, center, bottom
    },
  }
},
dataLabels: {
  enabled: true,
  formatter: function (val) {
    return val + "$";
  },
  offsetY: -20,
  style: {
    fontSize: '12px',
    colors: ["#304758"]
  }
},

xaxis: {
  categories: NamesOfMonths,
  position: 'top',
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  },
  crosshairs: {
    fill: {
      type: 'gradient',
      gradient: {
        colorFrom: '#D8E3F0',
        colorTo: '#BED1E6',
        stops: [0, 100],
        opacityFrom: 0.4,
        opacityTo: 0.5,
      }
    }
  },
  tooltip: {
    enabled: true,
  }
},
yaxis: {
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false,
  },
  labels: {
    show: false,
    formatter: function (val) {
      return val + "%";
    }
  }

},
title: {
  text: 'bitcoin exchange rate for the last year',
  floating: true,
  offsetY: 330,
  align: 'center',
  style: {
    color: '#444'
  }
}
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);
chart.render();
}


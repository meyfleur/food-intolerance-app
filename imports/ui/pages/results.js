import './results.html'

Template.results.onRendered(function(){

  var lineChart = new Chartist.Line('.ct-chart-food', {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat','Su'],
    series: [
      [null, 4, 2, 1, 2, 1, 1],
      [1, 3, 1, 0, 1, 0, 1],
      [0, 1, 2, 1, 0, 0, 0]
    ]
  },
  {
    height: '100%',
    fullWidth: true,
    chartPadding:{
      bottom: 0
    },
    axisX:{
      labelOffset: {
        x : -10
      }
    },
    axisY:{
      onlyInteger: true,
      labelInterpolationFnc: function(value) {
        switch(value){
          case 0:
              value = 'neither'
              return value
          case 1:
              value = 'low'
              return value
          case 2:
              value = 'light'
              return value
          case 3:
              value = 'middle'
              return value
          case 4:
              value = 'high'
              return value
        }
      }
    }
  },
  [
    ['screen and (max-width: 1000px)', {
      height: '70%'
    }],
    ['screen and (max-width: 900px)', {
      height: '80%'
    }],
    ['screen and (max-width: 700px)', {
      height: '90%'
    }],
    ['screen and (max-width: 600px)', {
      height: '100%'
    }]
  ]
  );

lineChart.on('draw', function(data) {
  if(data.type === 'line') {
    data.element.animate({
      opacity: {
        dur: 1000,
        from: 0,
        to: 1
      }
    });
  }
});

var barChart = new Chartist.Bar('.ct-chart-intolerance', {
    labels: ['Egg', 'Bananas', 'Bacon', 'Milk'],
    series: [
      [53, 4, 22, 64],
    ]
    }, {
    low: 1,
    high: 100,
    height: '60%',
    fullWidth: true,
    horizontalBars: true,
    axisX:{
      onlyInteger: true,
      labelOffset: {
        x: -15,
        y: 0
      },
      labelInterpolationFnc: function(value) {
        if(value == 0 || value % 2 == 1)
          return ''
        return value + ' %'
      }
    },
    axisY:{
      offset: 70
    }
  },
  [
    ['screen and (max-width: 600px)', {
      height: '100%'
    }]
  ]
)

barChart.on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.animate({
      opacity: {
        dur: 1000,
        from: 0,
        to: 1
      }
    })
  }
});

});

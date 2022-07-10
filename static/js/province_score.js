var province_score = echarts.init(document.getElementById('score'), "dark");

var province_score_Option = {
    title: {
      text: '四川省分数线',
      left : 'center',
      top : '0%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['理科', '文科'],
      top: '8%'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2019','2020','2021']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min:400,
      }
    ],
    series: [
      {
        name: '理科',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132]
      },
      {
        name: '文科',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182]
      }
    ]
  };

  province_score.setOption(province_score_Option);
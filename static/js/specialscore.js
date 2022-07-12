var specialscore = echarts.init(document.getElementById('specialscore'), "dark");

var specialscore_Option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['分数', '排名']
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '分数',
          min: 300,
          max: 800,
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '名次',
          min: 0,
          max: 20000,
          interval: 1000,
          axisLabel: {
            formatter: '{value}名'
          },
        }
      ],
      series: [
        {
          name: '分数',
          type: 'bar',
        //   tooltip: {
        //     valueFormatter: function (value) {
        //       return value + ' ml';
        //     }
        //   },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        // {
        //   name: 'Precipitation',
        //   type: 'bar',
        //   tooltip: {
        //     valueFormatter: function (value) {
        //       return value + ' ml';
        //     }
        //   },
        //   data: [
        //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        //   ]
        // },
        {
          name: '排名',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
};

specialscore.setOption(specialscore_Option);
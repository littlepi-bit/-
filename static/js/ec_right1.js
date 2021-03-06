var ec_right1 = echarts.init(document.getElementById('r1'),"dark");
const labelOption = {
    show: true,
    // rotate: 90,
    formatter: '{c}',
    fontSize: 16,
    color:'white',
    rich: {
      name: {}
    }
  };
var ec_right1_option = {
    //标题样式
    title : {
        text : "搜索热度排名",
        textStyle : {
            color : 'white',
        },
        left : 'left'
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        x: 65, //图表左上角到左边界的距离
        y: 38, //图表左上角到上边界的距离
        x2: 65, //图表右下角到右边界的距离
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            color: 'white',
            fontSize: 12,
            formatter: function(value) {
                if (value >= 10000) {
                    value = value / 10000 + 'w';
                }
                return value;
            }
        },
        //y轴线设置显示
        axisLine: {
            show: true
        },
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: [],
       
    },
    series: [{
        label: labelOption,
        emphasis: {
            focus: 'series'
        },
        data: [],
        type: 'bar',
        barMaxWidth:"60%",

    }]
};
ec_right1.setOption(ec_right1_option);
var level = echarts.init(document.getElementById('level'),"dark");
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
var level_Option = {
    //标题样式
    title : {
        text : "学术水平",
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
        data: ['重点'],
       
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
level.setOption(level_Option);
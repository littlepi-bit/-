var ec_left1 = echarts.init(document.getElementById('l1'), "dark");

var ec_left1_Option = {
    //标题样式
    title: {
        text: "近五年四川省理科分数线及变化",
        textStyle: {
            // color: 'white',
        },
        left: '30%',
    },
    tooltip: {
        trigger: 'axis',
        //指示器
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#7171C6'
            }
        },
       tooltip: {
           trigger: 'axis',
           axisPointer: {            // 坐标轴指示器，坐标轴触发有效
               type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
       },
    },
    legend: {
        data: ['2017', '2018', "2019", "2020","2021"],
        top: "8%",
        left: "20%"
    },

    //图形位置
    grid: {
        left: '8%',
        right: '6%',
        bottom: '8%',
        top: 50,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        //x轴坐标点开始与结束点位置都不在最边缘
        // boundaryGap : true,
        data: ['四川省']//['01.20', '01.21', '01.22']
    },
    yAxis: {
        type: 'value',
        min: 500,
        //y轴字体设置
        axisLabel: {
            show: true,
            color: 'white',
            fontSize: 12,
            formatter: function(value) {
                if (value >= 1000) {
                    value = value / 1000 + 'k';
                }
                return value;
            }
        },
        //y轴线设置显示
        axisLine: {
            show: true
        },
        //与x轴平行的线样式
        splitLine: {
            show: true,
            lineStyle: {
                color: '#17273B',
                width: 1,
                type: 'solid',
            }
        }
    },
    series: [{
        name: "2017",
        type: 'bar',
        smooth: true,
        data: []//[260, 406, 529]
    }, {
        name: "2018",
        type: 'bar',
        smooth: true,
        data: []//[54, 37, 3935]
    },
        {
        name: "2019",
        type: 'bar',
        smooth: true,
        data: []//[25, 25, 25]
    }, {
        name: "2020",
        type: 'bar',
        smooth: true,
        data: []//[6, 9, 17]
    }, {
        name: "2021",
        type: 'bar',
        smooth: true,
        data: []//[6, 9, 17]
    }],

};


ec_left1.setOption(ec_left1_Option);
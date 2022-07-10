var manrate = echarts.init(document.getElementById('manrate'), "dark");
 
var manrate_option = {
    title : {
        text : "高校男女比例",
        textStyle : {
            color : 'white',
        },
        left : 'center',
        top : '8%'
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ],
            itemStyle: {
                normal: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

manrate.setOption(manrate_option);
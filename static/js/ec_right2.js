var ec_right2 = echarts.init(document.getElementById('r2'), "dark");
 


var ec_right2_option = {
    title : {
        text : "各种类型高校占比",
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

ec_right2.on('click',function(param){
    alert(param.data.name+':'+param.data.value)
    top.location.href="/type?id="+param.data.name;
})

ec_right2.setOption(ec_right2_option);
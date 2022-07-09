var ec_center = echarts.init(document.getElementById('c2'), "dark");
 
var mydata = [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}];

GprovinceID = {'北京': 11, '天津': 12, '河北': 13, '山西': 14, '内蒙古': 15,
               '辽宁': 21, '吉林': 22, '黑龙江': 23,
               '上海': 31, '江苏': 32, '浙江': 33, '安徽': 34, '福建': 35, '江西': 36, '山东': 37,
               '河南': 41, '湖北': 42, '湖南': 43, '广东': 44, '广西': 45, '海南': 46,
               '重庆': 50, '四川': 51, '贵州': 52, '云南': 53, '西藏': 54,
               '陕西': 61, '甘肃': 62, '青海': 63, '宁夏': 64, '新疆': 65}

 
var ec_center_option = {
    title: {
        text: ' 全国高校数量分布图',
        subtext: '',
        x: 'center',
        top: '8%'
    },
    tooltip: {
        trigger: 'item'
    },
    //左侧小导航图标
    visualMap: {
        show: true,
        x: '20px',
        y: '380px',
        textStyle: {
            fontSize: 8,
        },
        splitList: [{ start: 1,end: 10 },
            {start: 10, end: 40 },
            { start: 40, end: 90 },
            {  start: 90, end: 130 },
            { start: 130 }],
        color: ['#4169E1', '#1E90FF', '#00BFFF', '#AFEEEE', '#E0FFFF']
    },
    //配置属性
    series: [{
        name: '高等院校数量',
        type: 'map',
        mapType: 'china',
        roam: false, //拖动和缩放
        itemStyle: {
            normal: {
                borderWidth: .5, //区域边框宽度
                borderColor: '#009fe8', //区域边框颜色
                areaColor: "#ffefd5", //区域颜色
            },
            emphasis: { //鼠标滑过地图高亮的相关设置
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#fff",
            }
        },
        label: {
            normal: {
                show: true, //省份名称
                fontSize: 8,
            },
            emphasis: {
                show: true,
                fontSize: 8,
            }
        },
        data: [] //mydata //数据
    }]
};

ec_center.on('click',function(param){
    alert(param.data.name+':'+param.data.value)
    top.location.href="/province?id="+GprovinceID[param.data.name];
})
ec_center.setOption(ec_center_option);
var round1 = echarts.init(document.getElementById('round1'),"dark",{
  width:120,
  height:120
});

round1.n = 4.2
var round1_option = {
    title: {
      text: round1.n.toString(),
      left: 'center',
      top: 'center',
      textStyle:{
        fontWeight:'bold',
        fontSize:30
      },
    },
    series: [
      {
        type: 'pie',
        itemStyle: {
          normal: {
            color: function (colors) {
               var colorList = [
                 '#fc8251',
                 '#ffffff',
                 '#91cd77',
                 '#ef6567',
                 '#f9c956',
                 '#75bedc'
               ];
               return colorList[colors.dataIndex];
             }
           },
         },
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: round1.n,
            name: 'A'
          },
          {
            value: 5-round1.n,
            name: 'B'
          }
        ],
        radius: ['60%', '70%'],
        
      }
    ]
  };

round1.setOption(round1_option);
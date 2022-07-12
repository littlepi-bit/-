var round3 = echarts.init(document.getElementById('round3'),null,{
    width:120,
    height:120
  });
  var round3_option = {
      title: {
        text: '4.7',
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
                   '#ef6567',
                   '#ffffff',
                   '#91cd77',
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
              value: 4.7,
              name: 'A'
            },
            {
              value: 0.3,
              name: 'B'
            }
          ],
          radius: ['60%', '70%'],
          
        }
      ]
    };
  
  round3.setOption(round3_option);
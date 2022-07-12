var round2 = echarts.init(document.getElementById('round2'),null,{
    width:120,
    height:120
  });
  var round2_option = {
      title: {
        text: '4.5',
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
                   '#91cd77',
                   '#ffffff',
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
              value: 4.5,
              name: 'A'
            },
            {
              value: 0.5,
              name: 'B'
            }
          ],
          radius: ['60%', '70%'],
          
        }
      ]
    };
  
  round2.setOption(round2_option);
var round4 = echarts.init(document.getElementById('round4'),"dark",{
    width:120,
    height:120
  });
  var round4_option = {
      title: {
        text: '4.9',
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
                   '#f9c956',
                   '#ffffff',
                   '#91cd77',
                   '#ef6567',
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
              value: 4.9,
              name: 'A'
            },
            {
              value: 0.1,
              name: 'B'
            }
          ],
          radius: ['60%', '70%'],
          
        }
      ]
    };
  
  round4.setOption(round4_option);
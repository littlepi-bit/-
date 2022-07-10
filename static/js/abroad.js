var abroad= echarts.init(document.getElementById('abroad'),"dark",{
    width:'300',
    height:'300'
  });

  abroad.n = 4.2
  var abroad_option = {
      title: {
        text: abroad.n.toString(),
        left: 'center',
        top: 'center',
        textStyle:{
          fontWeight:'bold',
          fontSize:10
        },
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}%',
            
          },
          data: [
            {
              value: 50,
              name: '出国率'
            }
          ]
        }
      ]
    };
  
  abroad.setOption(abroad_option);
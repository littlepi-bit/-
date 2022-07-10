var postgraduate = echarts.init(document.getElementById('postgraduate'),"dark",{
    width:'300',
    height:'300'
  });

  postgraduate.n = 4.2
  var postgraduate_option = {
      title: {
        text: postgraduate.n.toString(),
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
              name: '深造率'
            }
          ]
        }
      ]
    };
  
  postgraduate.setOption(postgraduate_option);
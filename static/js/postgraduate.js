var postgraduate = echarts.init(document.getElementById('postgraduate'),"dark",{
    width:'290',
    height:'290'
  });

  var postgraduate_option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}%',
            textStyle:{
              fontSize:20
            }
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
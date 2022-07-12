var abroad= echarts.init(document.getElementById('abroad'),null,{
    width:'290',
    height:'290'
  });

  var abroad_option = {
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
              name: '出国率'
            }
          ]
        }
      ]
    };
  
  abroad.setOption(abroad_option);
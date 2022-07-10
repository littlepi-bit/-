var jobrate = echarts.init(document.getElementById('jobrate'),"dark",{
    width:'290',
    height:'290'
  });

  jobrate.n = 4.2
  var jobrate_option = {
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
              name: '就业率'
            }
          ]
        }
      ]
    };
  
  jobrate.setOption(jobrate_option);
var jobrate = echarts.init(document.getElementById('jobrate'),"dark",{
    width:'300',
    height:'300'
  });

  jobrate.n = 4.2
  var jobrate_option = {
      title: {
        text: jobrate.n.toString(),
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
              name: '就业率'
            }
          ]
        }
      ]
    };
  
  jobrate.setOption(jobrate_option);
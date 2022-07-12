var special = echarts.init(document.getElementById('special'), "dark");
special.hideLoading();
var special_Option = {
    title: {
      text: '四川省招生专业',
      left : 'center',
      top : '0%'
    },
    tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
    },
    series: [
    {
        type: 'tree',
        data: [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计82"
                                    }
                                ],
                                "name": "低压关口表计1"
                            },
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计92"
                                    }
                                ],
                                "name": "低压关口表计2"
                            },
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计72"
                                    }
                                ],
                                "name": "低压关口表计3"
                            }
                        ]
                    },
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计82"
                                    }
                                ],
                                "name": "低压关口表计1"
                            },
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计92"
                                    }
                                ],
                                "name": "低压关口表计2"
                            },
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计72"
                                    }
                                ],
                                "name": "低压关口表计3"
                            }
                        ]
                    }
                ]
            }
        ],
        top: '4%',
        left: '14%',
        bottom: '1%',
        right: '70%',
        symbolSize: 7,
        label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 15
        },
        leaves: {
        label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
        }
        },
        emphasis: {
        focus: 'descendant'
        },
        expandAndCollapse: false,
        animationDuration: 550,
        animationDurationUpdate: 750
    }
    ]
};

special.on('click',function(param){
    if(param.data.value != undefined){
        alert(param.data.name+':'+param.data.value)
        top.location.href="/specialscore?school_id="+param.data.value.school+"&province_id="+param.data.value.province+"&special_id="+param.data.value.special; return
    }
})

special.setOption(special_Option);
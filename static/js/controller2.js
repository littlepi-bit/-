var getParam = function(name){
    var search = document.location.search;
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)","g");
    var matcher = pattern.exec(search);
    var items = null;
    if(null != matcher){
            try{
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }catch(e){
                    try{
                            items = decodeURIComponent(matcher[1]);
                    }catch(e){
                            items = matcher[1];
                    }
            }
    }
    return items;
};

//alert(getParam('id'));

// var get_school_id = function(){
//     $.ajax({
//         url:
//     })
// }

function get_round_data(){
    $.ajax({
        url:'/round',
        data:{
            "id":getParam("id")
        },
        timeout:'10000',
        success:function(data){
            round1_option.title.text = data.round1.toString();
            round1_option.series[0].data =[ {
                value: data.round1,
            },{
                value: 5-data.round1,
            }];
            round1.setOption(round1_option);
            round2_option.title.text = data.round2.toString();
            round2_option.series[0].data = [{
                value:data.round2
            },{
                value:5-data.round2
            }];
            round2.setOption(round2_option)
            round3_option.title.text = data.round3.toString();
            round3_option.series[0].data = [{
                value:data.round3
            },{
                value:5-data.round3
            }];
            round3.setOption(round3_option)
            round4_option.title.text = data.round4.toString();
            round4_option.series[0].data = [{
                value:data.round4
            },{
                value:5-data.round4
            }];
            round4.setOption(round4_option)
        }
    })
}

function get_school_data(){
    $.ajax({
        url:'/getSchool',
        data:{
            'id': getParam("id")
        },
        timeout: '10000',
        success: function(data){

        }
    })
}

function get_school_score(){
    $.ajax({
        url:'/getSchoolScore',
        data:{
            "id":getParam("id")
        },
        timeout:'10000',
        success:function(data){
            province_score_Option.xAxis = data.year;
            province_score_Option.series[0].data = data.li;
            province_score_Option.series[1].data = data.wen;
            province_score.setOption(province_score_Option);
        }
    })
}

function get_level(){
    $.ajax({
        url:'/getLevel',
        data:{
            "id":getParam("id")
        },
        timeout:'10000',
        success:function(data){
            level_Option.series[0].data = data.lab
            level_Option.series[1].data = data.subject
            level_Option.series[2].data = data.matcher
            level_Option.series[3].data = data.dotor
            // level_Option.series[4].data = data.gbh
            level.setOption(level_Option)
        }
    })
}

function get_r1_data(){
    $.ajax({
        url:'/r1',
        timeout:'10000',
        success:function(data){
            ec_right1_option.yAxis.data = data.city;
            ec_right1_option.xAxis.data = data.confirm
            ec_right1_option.series[0].data = data.confirm;
            ec_right1.setOption(ec_right1_option)
        },error:function(){

        }
    })
}

get_round_data()
get_school_data()
get_school_score()
get_level()

setInterval(get_round_data,10000)
setInterval(get_school_data,10000)
setInterval(get_school_score,10000)
setInterval(get_level,10000)
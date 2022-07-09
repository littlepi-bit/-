function showTime() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if(hour < 10){ hour = "0"+hour}
    if(minute < 10){ minute = "0"+minute}
    if(second < 10){ second = "0"+second}
    var time = year + "年"+ month + "月"+day + "日"+hour + ":"+minute + ":"+second
    $("#tim").html(time)
}

setInterval(showTime,1000) //1秒调用1次

function get_c1_data(){
    $.ajax({
        url:'/c1',
        timeout:'10000',
        success:function(data){
            $(".num h1").eq(0).text(data.confirm);
            $(".num h1").eq(1).text(data.suspect);
            $(".num h1").eq(2).text(data.heal);
            $(".num h1").eq(3).text(data.dead);
        },error(){
            
        }
    })
}

function get_c2_data(){
    $.ajax({
        url:'/c2',
        timeout:'10000',
        success:function(data){
            ec_center_option.series[0].data = data.data
            ec_center.setOption(ec_center_option)
        },error:function(){

        }
    })
}

function get_l1_data(){
    $.ajax({
        url:'/l1',
        timeout:'10000',
        success:function(data){
            console.log(data.province)
            //ec_left1_Option.xAxis[0].data = data.province;
            ec_left1_Option.series[0].data = data.score2017;
            ec_left1_Option.series[1].data = data.score2018;
            ec_left1_Option.series[2].data = data.score2019;
            ec_left1_Option.series[3].data = data.score2020;
            ec_left1_Option.series[4].data = data.score2021;
            ec_left1.setOption(ec_left1_Option)
        },error:function(){

        }
    })
}

function get_l2_data(){
    $.ajax({
        url:'/l2',
        timeout:'10000',
        success:function(data){
            ec_left2_Option.series[0].data = data.score2017;
            ec_left2_Option.series[1].data = data.score2018;
            ec_left2_Option.series[2].data = data.score2019;
            ec_left2_Option.series[3].data = data.score2020;
            ec_left2_Option.series[4].data = data.score2021;
            console.log(ec_left2_Option)
            ec_left2.setOption(ec_left2_Option)
        },error:function(){

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

function get_r2_data(){
    $.ajax({
        url:'/r2',
        timeout:'100000',
        success:function(data){
            //console.log(data.key)
            var rs = [];
            for(var k in data.name){
                console.log(data.name[k])
                rs.push({
                    name:data.name[k],
                    value:data.value[k]
                });
            }
            console.log("rs:"+rs)
            ec_right2_option.series[0].data = rs;
            ec_right2.setOption(ec_right2_option);
        }
    })
}

function get_province_data(){
    $.ajax({
        url:'province',
        timeout:'100000',
        success:function(data){
            
        }
    })
}

// get_time()
// setInterval(get_time(),1000)
get_r1_data()
get_r2_data()
get_c1_data()
get_c2_data()
get_l1_data()
get_l2_data()

setInterval(get_c1_data(),10000)
setInterval(get_c2_data(),10000)
setInterval(get_l1_data(),10000)
setInterval(get_l2_data(),10000)
setInterval(get_r1_data(),10000)
setInterval(get_l2_data(),10000)
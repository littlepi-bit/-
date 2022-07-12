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
            let minScore = 800;
            let maxScore = 0;
            for(s in data.li){
                num = Number(data.li[s])
                maxScore = Math.max(num, maxScore);
                minScore = Math.min(num, minScore);
            }
            for(s in data.wen){
                num = Number(data.li[s])
                maxScore = Math.max(num, maxScore);
                minScore = Math.min(num, minScore);
            }
            province_score_Option.yAxis[0].min = minScore-50-Math.round((minScore-50)%100)
            province_score_Option.yAxis[0].max = maxScore+50-Math.round((maxScore+50)%100)
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
            // tmp = [data.lab,data.subject,data.matcher,data.doctor];
            // console.log("tmp="+tmp);
            level_Option.series[0].data = data.schoolLevel
            // level_Option.series[1].data = data.subject
            // level_Option.series[2].data = data.matcher
            // level_Option.series[3].data = data.dotor
            // level_Option.series[4].data = data.gbh
            level.setOption(level_Option);
        }
    })
}


function get_manrate_data(){
    $.ajax({
        url:'/getManrate',
        timeout:'10000',
        data:{
            "id":getParam("id")
        },
        success:function(data){
            var rs = [];
            rs.push({
                name:"男生占比",
                value:data.manrate
            })
            rs.push({
                name:"女生占比",
                value:data.femalerate
            })
            manrate_option.series[0].data = rs;
            manrate.setOption(manrate_option)
        }
    })
}

function get_jobrate_date(){
    $.ajax({
        url:'/getJobrate',
        timeout:'10000',
        data:{
            'id':getParam("id")
        },
        success:function(data){
            jobrate_option.series[0].data =[{
                name:'就业率',
                value: data.jobrate,
            }];
            jobrate.setOption(jobrate_option);
            postgraduate_option.series[0].data = [{
                name:'深造率',
                value:data.postgraduate
            }];
            postgraduate.setOption(postgraduate_option);
            abroad_option.series[0].data = [{
                name:'出国率',
                value:data.abroad
            }];
            abroad.setOption(abroad_option)
        }
    })
}

function get_special_score(){
    $.ajax({
        url:"/getSchoolSpecial",
        timeout:'10000',
        data:{
            'id':getParam("id")
        },
        success:function(data){
            res = [{
                "children":[],
                "name":"专业"
            }];
            let allNode = 0;
            rs = [];
            index1 = 0;
            index2 = 0;
            // console.log("data");
            // console.log(data);
            for(var k in data){
                rs.push({
                    "children":[],
                    "name":k
                });
                children2 = [];
                for(m in data[k]){
                    // console.log("m="+m)
                    // console.log(data[k][m])
                    level2 = "大班";
                    if(m!=''){
                        level2 = m
                    };
                    children2.push({
                        "children":[],
                        "name":level2
                    });
                    children3 = [];
                    for(s in data[k][m]){
                        children3.push({
                            "value":{
                                "school":data[k][m][s].school_id,
                                "province":data[k][m][s].province_id,
                                "special":data[k][m][s].special_id,
                            },
                            "name":data[k][m][s].spname
                        })
                        allNode++;
                        // rs.push({
                        //     "children":[
                        //         {
                        //             "children":[
                        //                 {
                        //                     "children":[],
                        //                     "name":data[k][m][s].spname
                        //                 }
                        //             ],
                        //             "name":level2
                        //         }
                        //     ],
                        //     "name": k
                        // })
                    }
                    console.log("children2");
                    console.log(children2[index2]);
                    if(children2[index2] == undefined){
                        continue;
                    }
                    children2[index2]["children"] = children3;
                    index2++;
                }
                rs[index1++]["children"] = children2;
            }
            res[0]["children"] = rs;
            console.log("rs=");
            console.log(rs);
            special_Option.series[0].data = res;
            special.setOption(special_Option);
            const height = window.innerHeight;
            const currentHeight = 35 * allNode;
            const newWidth = Math.max(currentHeight, height);
            special.style.width = window.innerWidth + 'px';
            special.style.height = newWidth + 'px';
            special.resize({
                height: newHeight
            });
        }
    })
}

get_round_data()
get_school_data()
get_school_score()
get_level()
get_manrate_data()
get_jobrate_date()
get_special_score()

setInterval(get_round_data,10000)
setInterval(get_school_data,10000)
setInterval(get_school_score,10000)
setInterval(get_level,10000)
setInterval(get_manrate_data,10000)
setInterval(get_jobrate_date,10000)
setInterval(get_special_score,10000)
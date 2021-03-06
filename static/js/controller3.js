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

function get_special_score(){
    $.ajax({
        url:'/getSpecialscore',
        data:{
            'school_id': getParam("school_id"),
            'province_id':getParam("province_id"),
            "special_id":getParam("special_id")
        },
        timeout: '10000',
        success: function(data){
            let minSection = 1000000;
            let maxSection = 0;
            for(s in data.section){
                num = Number(data.section[s])
                if(num > maxSection){
                    maxSection = num
                }
                if (num < minSection){
                    minSection = num
                }
            }
            let minScore = 800;
            let maxScore = 0;
            for(s in data.score){
                num = Number(data.score[s])
                if (num > maxScore){
                    maxScore = num
                }
                if (num < minScore){
                    minScore = num
                }
            }
            year = []
            scoreli = []
            sectionli = []
            scorewen = []
            sectionwen = []
            for (y = 0; y < data.year.length; y+=data.num){
                year.push(data.year[y])
            }
            if (data.li == true){
                if (data.wen == true){
                    for (t in data.type){
                        if (data.type[t] == '1'){
                            scoreli.push(data.score[t])
                            sectionli.push(data.section[t])
                        }else if (data.type[t] == '2'){
                            scorewen.push(data.score[t])
                            sectionwen.push(data.section[t])
                        }
                    }
                }else{
                    for (t in data.type){
                        scoreli.push(data.score[t])
                        sectionli.push(data.section[t])
                    }
                }
            }else if(data.wen == true){
                for (t in data.type){
                    scorewen.push(data.score[t])
                    sectionwen.push(data.section[t])
                }
            }
            if (data.li == false){
                specialscore_Option.series[0].show = false;
                specialscore_Option.series[2].show = false;
            }else if (data.wen == false){
                specialscore_Option.series[1].show = false;
                specialscore_Option.series[3].show = false
            }
            console.log(data.num);
            specialscore_Option.xAxis[0].data = year;
            specialscore_Option.yAxis[1].min = minSection-1000-Math.round((minSection-1000)%1000);
            specialscore_Option.yAxis[1].max = maxSection+1000-Math.round((maxSection+3000)%1000);
            specialscore_Option.yAxis[0].min = minScore-100-Math.round((minScore-100)%100);
            specialscore_Option.yAxis[0].max = maxScore+100-Math.round((maxScore+100)%100);
            specialscore_Option.series[0].data = scoreli;
            specialscore_Option.series[1].data = scorewen;
            // specialscore_Option.series[1].data = data.type
            specialscore_Option.series[2].data = sectionli
            specialscore_Option.series[3].data = sectionwen
            specialscore.setOption(specialscore_Option)
        }
    })
}

get_special_score()

setInterval(get_special_score(),10000)
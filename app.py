from decimal import *
from flask import Flask, render_template
from flask import request
import utils
from flask import jsonify
import simplejson,json
from jieba.analyse import extract_tags

app = Flask(__name__)
# app.config['SECRET_KEY'] = '1456719640@qq.com'

@app.route("/")
def root():
    """
    主页
    :return: Index.html
    """
    return render_template("main.html")

# @app.route("/c1")
# def get_c1_data():
#     data = utils.get_cl_data()
#     return jsonify({"confirm":str(data[0]),"suspect":str(data[1]),"heal":str(data[2]),"dead":str(data[3])})

@app.route("/c2")
def get_c2_data():
    res = []
    for tup in utils.get_c2_data():
        #print(tup)
        res.append({"name":str(tup[0]),"value":int(tup[1])})
    return jsonify({"data":res})

@app.route("/l1")
def get_l1_data():
    data = utils.get_l1_data()
    score2017,score2018,score2019,score2020,score2021 = [data[0][1]],[data[1][1]],[data[2][1]],[data[3][1]],[data[4][1]]
    resl1 = jsonify({"score2017":score2017,"score2018":score2018,"score2019":score2019,"score2020":score2020,"score2021":score2021})
    return resl1

@app.route("/l2")
def get_l2_data():
    data = utils.get_l2_data()
    score2017, score2018, score2019, score2020, score2021 = [data[0][1]], [data[1][1]], [data[2][1]], [data[3][1]], [data[4][1]]
    return jsonify({"score2017": score2017, "score2018": score2018, "score2019": score2019,"score2020":score2020,"score2021":score2021})

@app.route('/r1')
def get_r1_data():
    data = utils.get_r1_data()
    city = []
    confirm = []
    for k, v in data:
        city.append(k)
        # v = int(v.quantize(Decimal('0')))
        confirm.append(v)
    #print(confirm)
    return jsonify({"city": city, "confirm": confirm})

@app.route("/r2")
def get_r2_data():
    datas = utils.get_r2_data()
    name, value = [], []
    for data in datas:
        name.append(data[0])
        v = data[1]
        v = int(v.quantize(Decimal('0')))
        value.append(v)
    # print(value)
    return jsonify({"name": name, "value": value})

@app.route("/province")
def getProvince():
    id = request.args.get("id")
    school = utils.get_school_by_province(id)
    kwargs = {
        "id": id,
        "school": school,
        "province": school[0][7]
    }
    return render_template("province.html", **kwargs)

@app.route("/getSchool")
def getSchoolByProvince():
    school_id = request.args.get("id")
    school = utils.get_school_by_province(school_id)
    # print(school)
    return {"school": school}

@app.route("/getSchoolScore")
def getSchoolScore():
    school_id = request.args.get("id")
    scores = utils.get_school_score_by_province('51', school_id)
    year, li, wen = [], [], []
    for score in scores:
        if score[0] == '1':
            li.append(score[1])
        elif score[0] == '2':
            wen.append(score[1])
        if score[2] not in year:
            year.append(score[2])
    return jsonify({"li": li, "wen": wen, "year": year})

@app.route("/school")
def getSchool():
    school_id = request.args.get("id")
    school = utils.get_school_by_id(school_id)
    kwargs = {
        "id": school_id,
        "school": school
    }
    return render_template("school.html", **kwargs)

@app.route("/getSpecialscore")
def getSpecialscoreById():
    school_id = request.args.get("school_id")
    province_id = request.args.get("province_id")
    special_id = request.args.get("special_id")
    scores = utils.get_special_score(school_id, province_id, special_id)
    year, type, score, section = [], [], [], []
    for s in scores:
        year.append(s[0])
        type.append(s[1])
        score.append(s[2])
        section.append(s[3])
    return jsonify({"year": year, "type": type, "score": score, "section": section})

@app.route("/specialscore")
def Specialscore():
    school_id = request.args.get("school_id")
    province_id = request.args.get("province_id")
    special_id = request.args.get("special_id")
    scores = utils.get_special_score(school_id, province_id, special_id)
    school = utils.get_school_by_id(school_id)
    kwargs = {
        "school_name": school[0][0],
        "spname": scores[0][4]
    }
    return render_template("special.html", **kwargs)

# @app.route("/getSpecialscore")
# def getSpecialscore():
#     school_id = request.args.get("id")
#     specialscoreLi = utils.get_special_score_li(school_id)
#     specialscoreWen = utils.get_special_score_wen(school_id)
#     return jsonify({"specialscoreLi":specialscoreLi,"specialscoreWen":specialscoreWen})

@app.route("/getSchoolSpecial")
def getSchoolSpecial():
    school_id = request.args.get("id")
    special = utils.get_special(school_id)
    return special

@app.route("/type")
def getSchoolByType():
    type_id = request.args.get("id")+'类'
    school = utils.get_school_by_type(type_id)
    print(school)
    kwargs = {
        "id": type_id,
        "school": school
    }
    return render_template("type.html",**kwargs)

@app.route("/round")
def getRound():
    id = request.args.get("id")
    judgeData = utils.get_round_data(id)
    if judgeData == '':
        return None
    round1 = float(judgeData[0][0])
    round2 = float(judgeData[0][1])
    round3 = float(judgeData[0][2])
    round4 = float(judgeData[0][3])
    #print(judgeData)
    return jsonify({"round1": round1, "round2": round2, "round3": round3, "round4": round4})

@app.route("/getLevel")
def getLevel():
    id = request.args.get("id")
    level = utils.get_level(id)
    if level == '':
        return None
    master = int(level[0][0]) + int(level[0][1])
    doctor = int(level[0][2]) + int(level[0][3])
    subject = [int(level[0][4])]
    lab = int(level[0][5])
    gbh = int(level[0][6])
    schoolLevel = [lab, subject, master, doctor]
    # return jsonify({"master":master,"doctor":doctor,"subject":subject,"lab":lab,"gbh":gbh})
    return jsonify({"schoolLevel": schoolLevel})

@app.route("/getManrate")
def getManrate():
    id = request.args.get("id")
    rate = utils.get_manrate(id)
    manRate,femaleRate = 0.0, 0.0
    if rate != '':
        if rate[0][0]!='':
            manRate = float(rate[0][0])
        if rate[0][1] != '':
            femaleRate = float(rate[0][1])
    return jsonify({"manrate":manRate,"femalerate":femaleRate})

@app.route("/getJobrate")
def getJobrate():
    id = request.args.get("id")
    rate = utils.get_jobrate(id)
    print(rate)
    jobrate,postgraduate,abroad = 0.0,0.0,0.0
    if rate != ():
        if rate[0][0] != '':
            jobrate = float(rate[0][0])
        if rate[0][1] != '':
            postgraduate = float(rate[0][1])
        if rate[0][2] != '':
            abroad = float(rate[0][2])
    print(jobrate)
    return jsonify({"jobrate":jobrate,"postgraduate":postgraduate,"abroad":abroad})

@app.route("/ajax", methods=["get","post"])
def hello_world3():
    name = request.values.get("name")
    score = request.values.get("score")
    print(f"name: {name}, score: {score}")
    return '10000'

@app.route('/time')
def get_time():
    return utils.get_time()

@app.route("/login")
def hello_world2():
    name = request.values.get('name')
    pwd = request.values.get('pwd')
    return f'name = {name}, pwd = {pwd}'

@app.route("/abc")
def hello_world():
    id = request.values.get("id")
    return f"""
    <form action="/login">
        账号：<input name="name" value='{id}'><br>
        密码：<input name="pwd">
        <input type="submit">
    </form>
    """


if __name__ == '__main__':  
    app.run(debug=True, host='127.0.0.1', port='5000')
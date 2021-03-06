import time
import pymysql

def get_time():
    time_str = time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年", "月", "日")

def get_conn():
    conn = pymysql.connect(user = "root",
                          password = "123456",
                          db = "school",
                           charset="utf8")
    if conn:
        print("连接数据库成功！")
    # 创建游标
    cursor = conn.cursor()     # 执行完毕返回的结果默认以元组表示
    return conn, cursor

def close_conn(conn, cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()

def query(sql,*args):
    """
    封装通用查询
    :param sql:
    :param args:
    :return: 返回查询到的结果，((),(),)的形式
    """
    conn, cursor = get_conn()
    cursor.execute(sql,args)
    res = cursor.fetchall()
    close_conn(conn, cursor)
    return res

def get_cl_data():
    """
    :return: 返回大屏div id=c1的数据
    """
    #因为会多次更新数据，取时间戳最新的那组数据
    sql = "select sum(confirm),(select suspect from history order by ds desc limit 1),sum(heal),sum(dead) from details where update_time=(select update_time from details order by update_time desc limit 1)"
    res = query(sql)
    return res[0]

def get_c2_data():
    """
    :return:返回各省的数据
    """
    #因为会多次更新，取时间戳最新的那组数据
    sql = 'select province, count(*) from detail group by province'
    #sql = "select pro_name, college_num from province"
    #sql = "select province,sum(confirm) from details where update_time=(select update_time from details order by update_time desc limit 1) group by province"
    res = query(sql)
    return res

def get_l1_data():
    """
    :return:
    """
    sql = 'select year, liA from provinceline where pro_id = 51 group by year order by year desc'
    #sql = 'select ds,confirm,suspect,heal,dead from history'
    res = query(sql)
    #print(res)
    return res

def get_l2_data():
    sql = 'select year, wenA from provinceline where pro_id = 51 group by year order by year desc'
    #sql  = "select ds,confirm_add,suspect_add,heal_add,dead_add from history"
    res = query(sql)
    #print(res)
    return res

def get_r1_data():
    """
    :return:返回搜索热度最高高校前5名
    """
    sql = 'select name,popularity from detail order by popularity desc limit 5'
    #sql = 'select province,count(*) from detail group by province order by count(*) desc limit 5'
    #sql = 'select city,confirm from (select city,confirm from details where city not in ("地区待确认","境外输入") and update_time=(select update_time from details order by update_time desc limit 1) and province not in ("湖北","北京","上海","天津","重庆") union all select province as city,sum(confirm) as confirm from details where update_time=(select update_time from details order by update_time desc limit 1) and province in ("北京","天津","上海","重庆") group by province) as a order by confirm desc limit 5'
    res = query(sql)
    #print("热度前5")
    #print(res)
    return res

def get_r2_data():
    """
    :return:返回各种类型高校数量
    """
    sql = "select name, sum(num) as num from typenum group by name"
    #sql = 'select content, hot from hotsearch order by id desc limit 20'
    res = query(sql)
    #print("类型")
    #print(res)
    return res

def get_round_data(school_id):
    '''
    :return:返回4个评价指数
    '''
    sql = 'select study,life,job,comprehensive from detail where id = %s'%school_id
    res = query(sql)
    # print(res)
    return res

def get_school_by_province(pro_id):
    '''
    :param pro_id:省份id
    :return: 该省的大学
    '''
    sql = 'select id, name,f985,f211,dual_class,level,type,province from detail where province = (select pro_name from province where pro_id = %s)'%pro_id
    res =query(sql)
    # print(res)
    return res

def get_school_by_id(school_id):
    '''
    :param school_id:学校id
    :return: 学校信息
    '''
    sql = 'select name,content from detail where id = %s'%school_id
    res= query(sql)
    # print(res)
    return res

def get_school_score_by_province(pro_id,school_id):
    '''
    :param pro_id:省份id
    :param school_id: 学校id
    :return: 查询到的该校四川省文理分数线
    '''
    sql = 'select type,score,year from minscore where school_id=%s and pro_id = %s'%(school_id,pro_id)
    res = query(sql)
    #print(res)
    return res

def get_level(school_id):
    '''
    :param school_id:学校id
    :return: 获取学校的学术水平
    '''
    sql = 'select num_master,num_master2,num_doctor,num_doctor2,num_subject,num_lab,gbh_num from detail where id=%s'%school_id
    res = query(sql)
    # print(res)
    return res

def get_manrate(school_id): 
    '''
    :param school_id:学校id
    :return: 获取男女比例
    '''
    sql = 'select men_rate,female_rate from detail where id = %s'%school_id
    res =query(sql)
    # print(res)
    return res

def get_jobrate(school_id):
    '''
    :param school_id:学校id
    :return: 就业率、深造率、出国率
    '''
    sql = 'select jobrate,postgraduate,abroad from detail where id = %s'%school_id
    res =query(sql)
    #print(res)
    return res

def get_school_by_type(type):
    '''
    :param type:类型名称
    :return:该类型的所有学校
    '''
    sql = "select id, name,f985,f211,dual_class,level,type from detail where type=%s"
    print(sql)
    res = query(sql,type)
    return res

def get_special(school_id):
    '''
    :param school_id:学校id
    :return: 该学校的所有专业
    '''
    pro_id = '51'
    sql = 'select level1,level2,spname,school_id,province_id,special_id from specialscore where school_id=%s and province_id=%s group by spname'%(school_id,pro_id)
    res = query(sql)
    level1 = {}
    for tmp in res:
        if tmp[0] not in level1:
            level1[tmp[0]] = {}
        if tmp[1] not in level1[tmp[0]]:
            level1[tmp[0]][tmp[1]] = []
        level1[tmp[0]][tmp[1]].append({"spname": tmp[2],"school_id":tmp[3],"province_id":tmp[4],"special_id":tmp[5]})
    return level1

def get_special_score_li(school_id):
    '''
    :param school_id:学校id
    :return: 返回该学校所有专业的历年分数
    '''
    pro_id = '51'
    sql = 'select year,spname,score,section from specialscore where school_id=%s and province_id=%s and type = 1'%(school_id,pro_id)
    res = query(sql)
    return res

def get_special_score_wen(school_id):
    '''
    :param school_id:学校id
    :return: 返回该学校所有专业的历年分数
    '''
    pro_id = '51'
    sql = 'select year,level1,level2,spname,score,section from specialscore where school_id=%s and province_id=%s and type = 2'%(school_id,pro_id)
    res = query(sql)
    level1 = {}
    print(res)
    for tmp in res:
        if tmp[1] not in level1:
            level1[tmp[1]] = {}
        if tmp[2] not in level1[tmp[1]]:
            level1[tmp[1]][tmp[2]] = []
        level1[tmp[1]][tmp[2]].append({"year":tmp[0],"spname":tmp[3],"section":tmp[4]})
    return level1

def get_special_score(school_id,province_id,special_id):
    '''
    :param school_id: 学校id
    :param province_id: 省份id
    :param special_id: 专业id
    :return: 获取该专业在该学校该省份3年的分数线
    '''
    sql = 'select year,type,score,section,spname from specialscore where school_id=%s and province_id=%s and special_id=%s'%(school_id,province_id,special_id)
    res = query(sql)
    return res


if __name__ == "__main__":
    print(get_special_score('31','51','572241'))
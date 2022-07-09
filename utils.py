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
    sql = 'select id, name from detail where province = (select pro_name from province where pro_id = %s)'%pro_id
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
    print(res)
    return res



if __name__ == "__main__":
    print(get_school_score_by_province('51','32'))
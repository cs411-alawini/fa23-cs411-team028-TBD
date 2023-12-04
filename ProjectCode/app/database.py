"""Defines all the functions related to the database"""
from app import db

def comapQuery(option, state, county):
    """do comap query

    Returns:
        A list of dictionaries
    """

    conn = db.connect()
    if option == "state":
        query = "SELECT DISTINCT ny.date, ((SELECT MAX(ny1.cases) FROM nytimes_r_state ny1 WHERE ny1.state= '" + state + "' AND ny1.date < ny.date AND ny1.cases>0)-(SELECT MAX(ny2.cases) FROM nytimes_r_state ny2 WHERE ny2.state= '" + state + "' AND ny2.date+14 < ny.date AND ny2.cases>0))AS netCases FROM nytimes_r_state ny WHERE ny.state= '" + state + "' AND ny.date > '2021-01-01' ORDER BY netCases DESC LIMIT 3;"
        query_results = conn.execute(query).fetchall()
    elif option == "county":
        if county == "Whole state":
            query = "CALL CountyCases('{}');".format(state)
        else:
            query = "SELECT DISTINCT ny.date, ((SELECT MAX(ny1.cases) FROM nytimes_r_county ny1 WHERE ny1.state='" + state + "' AND ny1.county='" + county + "' AND ny1.date < ny.date AND ny1.cases>0)-(SELECT MAX(ny2.cases) FROM nytimes_r_county ny2 WHERE ny2.state='" + state + "' AND ny2.county='" + county + "' AND ny2.date+14 < ny.date AND ny2.cases>0))AS netCases FROM nytimes_r_county ny WHERE ny.state='" + state + "' AND ny.county='" + county + "' AND ny.date > '2021-01-01' ORDER BY netCases DESC LIMIT 3;"
        query_results = conn.execute(query).fetchall()
    conn.close()
    return_value = []
    if option == "state":
        for result in query_results:
            item = {
                "date": result[0],
                "cases": result[1]
            }
            return_value.append(item)
    elif option == "county" and county == "Whole state":
        for result in query_results:
            item = {
                "county": result[0],
                "cases": result[2]
            }
            return_value.append(item)
    elif option == "county":
        for result in query_results:
            item = {
                "date": result[0],
                "cases": result[1]
            }
            return_value.append(item)
    return return_value

def askDataQuery(stateCounty, option):
    """do ask data query

    Returns:
        A list of dictionaries
    """

    conn = db.connect()
    if option == "case_rank":
        if stateCounty == "state":
            query = "SELECT DISTINCT ny.state,((SELECT ny1.cases FROM (SELECT state, MAX(date) AS date FROM nytimes_r_state GROUP BY state)AS md NATURAL JOIN nytimes_r_state ny1 WHERE ny1.state=ny.state) - (SELECT ny2.cases FROM nytimes_r_state ny2 WHERE ny2.state=ny.state AND ny2.date='2022-05-14'))AS netCases FROM nytimes_r_state ny ORDER BY netCases DESC LIMIT 15;"
            query_results = conn.execute(query).fetchall()
        elif stateCounty == "county":
            query = "SELECT DISTINCT ny.state, ny.county, (ny1.cases - ny2.cases) AS netCases FROM nytimes_r_county_curr ny LEFT JOIN nytimes_r_county_curr ny1 ON ny1.state = ny.state AND ny1.county = ny.county AND ny1.date = (SELECT MAX(date) FROM nytimes_r_county_curr) LEFT JOIN nytimes_r_county_curr ny2 ON ny2.state = ny.state AND ny2.county = ny.county AND ny2.date < (SELECT MAX(date) FROM nytimes_r_county_curr) ORDER BY netCases DESC LIMIT 15;"
            query_results = conn.execute(query).fetchall()
    if option == "death_rank":
        if stateCounty == "state":
            query = "SELECT DISTINCT ny.state,((SELECT ny1.deaths FROM (SELECT state, MAX(date) AS date FROM nytimes_r_state GROUP BY state)AS md NATURAL JOIN nytimes_r_state ny1 WHERE ny1.state=ny.state) - (SELECT ny2.deaths FROM nytimes_r_state ny2 WHERE ny2.state=ny.state AND ny2.date='2022-05-14'))AS netCases FROM nytimes_r_state ny ORDER BY netCases DESC LIMIT 15;"
            query_results = conn.execute(query).fetchall()
        elif stateCounty == "county":
            query = "SELECT DISTINCT ny.state, ny.county, (ny1.deaths - ny2.deaths) AS netCases FROM nytimes_r_county_curr ny LEFT JOIN nytimes_r_county_curr ny1 ON ny1.state = ny.state AND ny1.county = ny.county AND ny1.date = (SELECT MAX(date) FROM nytimes_r_county_curr) LEFT JOIN nytimes_r_county_curr ny2 ON ny2.state = ny.state AND ny2.county = ny.county AND ny2.date < (SELECT MAX(date) FROM nytimes_r_county_curr) ORDER BY netCases DESC LIMIT 15;"
            query_results = conn.execute(query).fetchall()
    if option == "vaccine":
        if stateCounty == "state":
            query = "SELECT DISTINCT m.jurisdiction, m.week_of_allocations, SUM(m._1st_dose_allocations + p._1st_dose_allocations + m._2nd_dose_allocations + p._2nd_dose_allocations) AS totalDose FROM vaccine_m_state m JOIN vaccine_p_state p ON (m.jurisdiction = p.jurisdiction AND m.week_of_allocations = p.week_of_allocations) WHERE (m._1st_dose_allocations + p._1st_dose_allocations + m._2nd_dose_allocations + p._2nd_dose_allocations) > 0 GROUP BY m.jurisdiction, m.week_of_allocations ORDER BY m.week_of_allocations DESC, totalDose DESC LIMIT 15;"
            query_results = conn.execute(query).fetchall()
    conn.close()
    return_value = []
    if option == "case_rank" or option == "death_rank":
        if stateCounty == "state":
            for result in query_results:
                item = {
                    "state": result[0],
                    "netcase": result[1]
                }
                return_value.append(item)
        elif stateCounty == "county":
            for result in query_results:
                item = {
                    "state": result[0],
                    "county": result[1],
                    "netcase": result[2]
                }
                return_value.append(item)
    elif option == "vaccine":
        for result in query_results:
            item = {
                "state": result[0],
                "netcase": float(result[2])
            }
            return_value.append(item)
    return return_value

def myTBDSignQuery(option, userId, userName, password):
    """do user sign in or sign up

    Returns:
        A list of dictionaries
    """
    return_value = []

    conn = db.connect()
    if option == "signIn":
        query_findUser = "SELECT ID, password FROM users WHERE ID=" + str(userId) + ";"
        query_findUser_results = conn.execute(query_findUser).fetchall()
        if len(query_findUser_results) == 0:
            item = {
                "status": -1
            }
            return_value.append(item)
            conn.close()
            return return_value
        else:
            for result in query_findUser_results:
                if str(password) == str(result[1]):
                    item = {
                        "status": 0
                    }
                    return_value.append(item)
                    query_findState = "SELECT state, COUNT(ID) FROM users NATURAL JOIN user_location NATURAL JOIN user_status WHERE status='Infected' AND state=(SELECT state FROM user_location WHERE ID={}) GROUP BY state;".format(userId)
                    query_findState_results = conn.execute(query_findState).fetchall()
                    conn.close()
                    if len(query_findState_results) != 0:
                        for result2 in query_findState_results:
                            item = {
                                "state": result2[0],
                                "cases": result2[1]
                            }
                            return_value.append(item)
                    if len(return_value)==1:
                        item = {"state": 0}
                        return_value.append(item)
                    return return_value
                else:
                    item = {
                        "status": -2
                    }
                    return_value.append(item)
                    return return_value
    elif option == "signUp":
        query_checkExist = "SELECT ID FROM users;"
        query_checkExist_results = conn.execute(query_checkExist).fetchall()
        for result in query_checkExist_results:
            if str(userId) == str(result[0]):
                conn.close()
                item = {
                    "status": -1
                }
                return_value.append(item)
                return return_value
        query_signup = "INSERT INTO users VALUES('{}', '{}', '{}');".format(userId, userName, password)
        conn.execute(query_signup)
        conn.close()
        item = {
            "status": 0
        }
        return_value.append(item)
    return return_value

def myTBDUpdateQuery(userId, userStatus, userState):
    """do user update

    Returns:
        A list of dictionaries
    """
    return_value = []
    userExist = 0
    stateExist = 0

    conn = db.connect()

    query_findUser = "SELECT ID FROM user_status;"
    query_findUser_results = conn.execute(query_findUser).fetchall()
    for result in query_findUser_results:
        if str(userId) == str(result[0]):
            userExist = 1

    query_findState = "SELECT DISTINCT state FROM nytimes_r_state;"
    query_findState_results = conn.execute(query_findState).fetchall()

    for result in query_findState_results:
        if str(userState) == str(result[0]):
            stateExist = 1
    
    if stateExist == 0:
        conn.close()
        item = {
            "status": -1
        }
        return_value.append(item)
        return return_value
    else:
        if userExist == 0:
            query_update1 = "INSERT INTO user_status VALUES({}, '{}')".format(userId, userStatus)
            conn.execute(query_update1)
            query_update2 = "INSERT INTO user_location VALUES({}, '{}')".format(userId, userState)
            conn.execute(query_update2)
            conn.close()
            item = {
                "status": 0
            }
            return_value.append(item)
        else:
            query_update1 = "UPDATE user_status SET status = '{}' WHERE ID = {}".format(userStatus, userId)
            conn.execute(query_update1)
            query_update2 = "UPDATE user_location SET state = '{}' WHERE ID = {}".format(userState, userId)
            conn.execute(query_update2)
            conn.close()
            item = {
                "status": 0
            }
            return_value.append(item)
    return return_value

def myTBDDeleteQuery(userId):
    """do user acount deletion

    Returns:
        A list of dictionaries
    """
    return_value = []

    conn = db.connect()
    query_delete = "DELETE FROM users where ID = {}".format(userId)
    conn.execute(query_delete)
    conn.close()

    item = {
        "status": 0
    }
    return_value.append(item)
    return return_value

def SOSQuery(option, userLatitude, userLongitude, userState):
    """hospital recommendation

    Returns:
        A list of dictionaries
    """
    return_value = []
    stateExist = 0

    conn = db.connect()

    query_findState = "SELECT DISTINCT State_name FROM hospital_beds_us;"
    query_findState_results = conn.execute(query_findState).fetchall()

    for result in query_findState_results:
        if str(userState) == str(result[0]):
            stateExist = 1
    
    if stateExist == 0:
        conn.close()
        item = {
            "hospital": -1
        }
        return_value.append(item)
        return return_value
    else:
        if option == "distance":
            query = "SELECT hospital_name, State_name, Num_staffed_beds, SQRT(POW( (Latitude- {} ), 2)+POW( (Longtitude- {} ),2))*69.1 AS distance FROM hospital_beds_us Hosp WHERE state_name<>'None' ORDER BY distance LIMIT 15;".format(userLatitude, userLongitude)
            query_results = conn.execute(query).fetchall()
        elif option == "resource":
            query = "SELECT hospital_name, State_name, County_name, ceiling((Num_staffed_beds*(1-Bed_utilization))) as Available_beds, SQRT(POW( (Latitude- {} ), 2)+POW( (Longtitude- {} ), 2))*69.1 as distance FROM hospital_beds_us Hosp WHERE State_name='{}' and Num_staffed_beds<>'None' and Bed_utilization<>'None' ORDER BY Available_beds DESC, distance LIMIT 15;".format(userLatitude, userLongitude, userState)
            query_results = conn.execute(query).fetchall()
    
    if option == "distance":
        for result in query_results:
            item = {
                "hospital": result[0],
                "state": result[1],
                "beds": result[2],
                "distance": result[3]
            }
            return_value.append(item)
    elif option == "resource":
        for result in query_results:
            item = {
                "hospital": result[0],
                "state": result[1],
                "county": result[2],
                "beds": result[3],
                "distance": result[4]
            }
            return_value.append(item)
    return return_value


    

    













    







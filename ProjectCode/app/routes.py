""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/")
def homepage():
    """ returns rendered homepage """
    return render_template("index.html")

@app.route("/comap", methods=['POST'])
def comapSearch():
    """receive user input and do query"""
    option = request.form.get('option')
    state = request.form.get('state')
    county = request.form.get('county')

    result = db_helper.comapQuery(option, state, county)
    return jsonify(result)

@app.route("/askData", methods=['POST'])
def askDataSearch():
    """receive user input and do query"""
    stateCounty = request.form.get('stateCounty')
    option = request.form.get('option')

    result = db_helper.askDataQuery(stateCounty, option)
    return jsonify(result)

@app.route("/myTBDSign", methods=['POST'])
def myTBDSign():
    """receive user input and do query"""
    option = request.form.get('option')
    userId = request.form.get('userId')
    userName = request.form.get('userName')
    password = request.form.get('password')

    result = db_helper.myTBDSignQuery(option, userId, userName, password)
    return jsonify(result)

@app.route("/myTBDUpdate", methods=['POST'])
def myTBDSUpdate():
    """receive user input and do query"""
    userId = request.form.get('userId')
    userStatus = request.form.get('userStatus')
    userState = request.form.get('userState')

    result = db_helper.myTBDUpdateQuery(userId, userStatus, userState)
    return jsonify(result)

@app.route("/myTBDDelete", methods=['POST'])
def myTBDSDelete():
    """receive user input and do query"""
    userId = request.form.get('userId')

    result = db_helper.myTBDDeleteQuery(userId)
    return jsonify(result)

@app.route("/SOS", methods=['POST'])
def SOS():
    """receive user input and do query"""
    option = request.form.get('option')
    userLatitude = request.form.get('latitude')
    userLongitude = request.form.get('longitude')
    userState = request.form.get('userState')

    result = db_helper.SOSQuery(option, userLatitude, userLongitude, userState)
    return jsonify(result)






from flask import Flask,redirect, request,url_for,render_template,flash
import json
import os
from os.path import join, dirname
from flask import jsonify

app = Flask(__name__)

def openFile():
    file = open('config.json')
    data = json.load(file)
    file.close()
    return data
@app.route("/api/titles",methods=['POST'])
def main():
    list = []
    data = openFile()
    for item in data:
        if(len(list)<=5):
            list.append(item)
    return jsonify(list)

    
@app.route("/",methods=['GET'])
def home():
    return render_template('home.html')

@app.route("/file",methods=['GET'])
def detail():
    return render_template('detail.html')



@app.route("/getPadding",methods=['POST'])
def padding():
    list= []
    data = openFile()
    for item in data:
        list.append(list)
    page =  int(len(list)/6)
    if(page*6 < len(list)):
        return jsonify({'total': page+1})
    else:
        return jsonify({'total': page})

@app.route("/getRecordPage",methods=['POST'])
def getRecordPage():
    list = []
    page = request.args.get('page', default = 1, type = int)
    data = openFile()
    countRecordEnd = page * 6
    countRecordStart = countRecordEnd - 6
    list = []
    data = openFile()
    for item in data:
        list.append(item)
    return jsonify({'page':page,'record':list[countRecordStart:countRecordEnd]})

@app.route("/getDetailFile",methods=['POST'])
def getDetailFile():
    name = request.args.get('name', default='mic', type = str)
    data = openFile()
    return jsonify(data[name])


@app.route("/getTypeMic",methods=["POST"])
def getTypeMic():
    data = openFile()
    list = []
    for item in data['mic']:
        list.append({'type':item['type'],'active': item['is_active']})
    return jsonify(list)
@app.route("/getOjectMicDetail",methods=['POST'])
def getOjectMicDetail():
    data = openFile()
    type = request.args.get('type', type = str)
    for item in data['mic']:
        if(item['type'] == type):
            return jsonify(item)


@app.route("/getOject_hotword_engine",methods=['POST'])
def getOject_hotword_engine():
    data = openFile()
    type = request.args.get('type', type = str)
    for item in data['hotword_engine']:
        if(item['name'] == type):
            return jsonify(item)


@app.route("/get_hotword_engine", methods = ["POST"])
def hotword_engine():
    data = openFile()
    list = []
    for item in data['hotword_engine']:
        list.append(item['name'])
    return jsonify(list)


@app.route("/get_hotword", methods=["POST"])
def get_hotword():
    return jsonify(['porcupine','snowboy'])

@app.route("/get_obj_hotword", methods=["POST"])
def get_obj_hotword():
    list = []
    data = openFile()
    type = request.args.get('type',default='porcupine', type = str)
    for item in data['hotword']:
        if(item['type']==type):
            list.append(item)
    return jsonify(list)

@app.route("/get_detail_object",methods=['POST'])
def get_detail_object():
    list = []
    detail = []
    data = openFile()
    name = request.args.get('name',default='', type = str)
    request_data = request.args.get('request',default='', type = str)
    request_detail = request.args.get('detail',default='', type = str)
    for item in data[name]:
        if(request_data !=''):
            list.append(item[request_data])
        if(request_detail !='' and item[request_data]==request_detail):
            detail.append(item)
        if(name==''):
            list=[]
            detail=[]
        
        
    return jsonify({'type':list,'detail':detail})
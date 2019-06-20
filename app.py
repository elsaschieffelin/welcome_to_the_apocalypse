# flask tools
import json
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


# Create app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///data/ap_db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
base = automap_base()
base.prepare(db.engine, reflect=True)
master = base.classes.master_map




# Home route
@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

#data route
@app.route('/data')
def read():
   data = db.session.query(master.ID, master.YEAR, master.COUNTRY, master.LATITUDE, master.LONGITUDE, master.DISASTER_TYPE, master.HOUSES_AFFECTED, master.TOTAL_DEATHS, master.TOTAL_INJURIES, master.TOTAL_DAMAGE_MILLIONS_DOLLARS).all()
   all_data = []
   for ID, year, country, lat, long, disaster, houses, deaths, injured, dollars in data:
      data_dict = {}
      #data_dict['ID']=ID
      data_dict['YEAR']=year
      data_dict['COUNTRY']=country
      data_dict['LATITUDE']=float(lat)
      data_dict['LONGITUDE']=float(long)
      data_dict['DISASTER_TYPE']=disaster
      data_dict['HOUSES_AFFECTED']=houses
      data_dict['TOTAL_DEATHS']=deaths
      data_dict['TOTAL_INJURIES']=injured
      data_dict['TOTAL_DAMAGE_MILLIONS_DOLLARS']=dollars
      data_dict['LOCATION']=([lat, long])
      all_data.append(data_dict)

   return jsonify(all_data)

#deaths csv route
@app.route('/data_deaths')
def die_data():
   data = pd.read_csv('static/data/death_by_disasters.csv')
   json_data = json.loads(data.to_json(orient='records'))
   return jsonify(json_data)

# economic costs csv
@app.route('/data_money')
def dollars(): 
   data = pd.read_csv('static/data/economic_damage.csv')
   jsoned = json.loads(data.to_json(orient='records'))
   return jsonify(jsoned)

#natural disaster csv
@app.route('/data-disaster')
def disasters():
   data=pd.read_csv('static/data/natural_disasters.csv')
   jsoned= json.loads(data.to_json(orient='records'))
   return jsonify(jsoned)

#homelessness csv
@app.route('/data-homelessness')
def homeless():
   data=pd.read_csv('static/data/homeless_disasters.csv')
   jsoned=json.loads(data.to_json(orient='records'))
   return jsonify(jsoned)

# Scripts execution
if __name__ == "__main__":
    app.run()


   
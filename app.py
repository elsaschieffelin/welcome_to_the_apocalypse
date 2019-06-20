# flask tools
import json
import os
import geojson
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

# Scripts execution
if __name__ == "__main__":
    app.run()

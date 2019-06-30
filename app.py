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
Base = automap_base()
Base.prepare(db.engine, reflect=True)

# Tables
Master = Base.classes.mapdata
Disaster = Base.classes.chartdata_reportedcase
Death = Base.classes.chartdata_death
Displaced = Base.classes.chartdata_displaced
Ecolost = Base.classes.chartdata_ecolost

# Home route
@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

#data route
@app.route('/data_map')
def read():

   # List for column names
   sel = []
   [sel.append(key) for key in Master.__table__.columns]

   # Unpack list
   data = db.session.query(*sel).all()

   all_data = []
   for ID, year, country, lat, long, disaster, houses, deaths, injured, dollars in data:
      data_dict = {}
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

#natural disaster csv
@app.route('/data_reportedcase')
def disasters():

   # List for column names
   sel = []
   [sel.append(key) for key in Disaster.__table__.columns]
   # Unpack list
   data = db.session.query(*sel).all()

   all_data = []
   for ID, disas_type, year, report in data:
      data_dict = {}
      data_dict['DisasterTypes'] = disas_type
      data_dict['Years'] = year
      data_dict['Reports'] = report
      all_data.append(data_dict)

   return jsonify(all_data)

#deaths csv route
@app.route('/data_death')
def die_data():

   # List for column names
   sel = []
   [sel.append(key) for key in Death.__table__.columns]

   # Unpack list
   data = db.session.query(*sel).all()

   all_data = []
   for ID, decade, drought, eq, extreme_t, flood, landslide, massmove, storm, volc, wildfire in data:
      data_dict = {}
      data_dict['Decades'] = decade
      data_dict['Drought'] = drought
      data_dict['Earthquake'] = eq
      data_dict['Extreme temperature'] = extreme_t
      data_dict['Flood'] = flood
      data_dict['Landslide'] = landslide
      data_dict['Mass movement (dry)'] = massmove
      data_dict['Storm'] = storm
      data_dict['Volcanic activity'] = volc      
      data_dict['Wildfire'] = wildfire
      all_data.append(data_dict) 

   return jsonify(all_data)

# Lostnomic costs csv
@app.route('/data_lost')
def dollars():

   # List for column names    
   sel = []
   [sel.append(key) for key in Ecolost.__table__.columns]

   # Unpack list
   data = db.session.query(*sel).all()

   all_data = []
   for ID, disas_type, year, dollars in data:
      data_dict = {}
      data_dict['DisasterTypes'] = disas_type
      data_dict['Years'] = year
      data_dict['TotalLostDollars'] = dollars
      all_data.append(data_dict)

   return jsonify(all_data)

#homelessness csv
@app.route('/data-displaced')
def homeless():

   # List for column names     
   sel = []
   [sel.append(key) for key in Displaced.__table__.columns]

   # Unpack list
   data = db.session.query(*sel).all()

   all_data = []
   for ID, disas_type, year, displaced in data:
      data_dict = {}
      data_dict['DisasterTypes'] = disas_type
      data_dict['Years'] = year
      data_dict['DisplacedPersons'] = displaced
      all_data.append(data_dict)

   return jsonify(all_data)

# Scripts execution
if __name__ == "__main__":
    app.run()   
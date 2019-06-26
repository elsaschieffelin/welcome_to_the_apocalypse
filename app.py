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

Master = Base.classes.master_map
Disaster = Base.classes.disaster_chart
Death = Base.classes.death_chart
Displaced = Base.classes.displaced_chart
Eco = Base.classes.cost_chart

# Home route
@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

#data route
@app.route('/data')
def read():
   data = db.session.query(Master.ID, Master.YEAR, Master.COUNTRY, Master.LATITUDE, Master.LONGITUDE, Master.DISASTER_TYPE, Master.HOUSES_AFFECTED, Master.TOTAL_DEATHS, Master.TOTAL_INJURIES, Master.TOTAL_DAMAGE_MILLIONS_DOLLARS).all()
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

#natural disaster csv
@app.route('/data_disaster')
def disasters():
   data = db.session.query(Disaster.Entity, Disaster.Year, Disaster.ReportedDisasters).all()
   all_data = []
   for entity, year, reported_disaster in data:
      data_dict = {}
      data_dict['Entity'] = entity
      data_dict['Year'] = year
      data_dict['ReportedDisasters'] = reported_disaster
      all_data.append(data_dict)

   return jsonify(all_data)

#deaths csv route
@app.route('/data_deaths')
def die_data():

   data = db.session.query(Death.Decades, Death.Drought, Death.Earthquake, Death.Extremetemperature, Death.Flood, Death.Landslide, Death.Massmovement, Death.Storm, Death.Volcanicactivity, Death.Wildfire).all()
   all_data = []
   for decade, drought, eq, ext_t, flood, landslide, massmove, storm, volc, wildfire in data:
      data_dict = {}
      data_dict['Decades'] = decade
      data_dict['Drought'] = drought
      data_dict['Earthquake'] = eq
      data_dict['Extreme temperature'] = ext_t
      data_dict['Flood'] = flood
      data_dict['Landslide'] = landslide
      data_dict['Mass movement (dry)'] = massmove
      data_dict['Storm'] = storm
      data_dict['Volcanic activity'] = volc      
      data_dict['Wildfire'] = wildfire
      all_data.append(data_dict) 

   return jsonify(all_data)

# economic costs csv
@app.route('/data_money')
def dollars():
    
   data = db.session.query(Eco.Entity, Eco.Year, Eco.TotalDollars).all()
   all_data = []
   for entity, year, dollars in data:
      data_dict = {}
      data_dict['Entity'] = entity
      data_dict['Year'] = year
      data_dict['TotalDollars'] = dollars
      all_data.append(data_dict)

   return jsonify(all_data)

#homelessness csv
@app.route('/data-homelessness')
def homeless():
    
   data = db.session.query(Displaced.Entity, Displaced.Year, Displaced.Displacedpersons).all()
   all_data = []
   for entity, year, displaced in data:
      data_dict = {}
      data_dict['Entity'] = entity
      data_dict['Year'] = year
      data_dict['Displacedpersons'] = displaced
      all_data.append(data_dict)

   return jsonify(all_data)

# Scripts execution
if __name__ == "__main__":
    app.run()


   
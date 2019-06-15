# flask tools
import json
import pandas as pd
from flask import jsonify
from flask import Flask, render_template

# Create app
app = Flask(__name__)


# Home route
@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

#data route
@app.route('/data')
def read():
   data = pd.read_csv('data/master_chart.csv')
   json_data = json.loads(data.to_json(orient='records'))
   return jsonify(json_data)


# Scripts execution
if __name__ == "__main__":
    app.run()
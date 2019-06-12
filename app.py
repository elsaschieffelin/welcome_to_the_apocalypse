# flask tools
from flask import Flask, render_template

# Create app
app = Flask(__name__)

# Home route
@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

# Scripts execution
if __name__ == "__main__":
    app.run()
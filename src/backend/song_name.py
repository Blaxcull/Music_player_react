from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) 

@app.route('/')
def get_files():
    folder_path = os.path.join(os.path.dirname(__file__), '..', 'assets')  
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    return jsonify(files)

if __name__ == '__main__':
    app.run(debug=True)

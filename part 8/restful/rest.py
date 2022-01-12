import json
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/rest', methods=['GET'])
def query_records():
    name = request.args.get('name')
    print (name)
    with open('tmp/data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        for record in records:
            print (record['name'], name);
            if record['name'] == name:
                return record['email']
        return jsonify({'error': 'data not found'})

@app.route('/rest', methods=['PUT'])
def create_record():
    print("data = " + str(request.data))
    record = json.loads(request.data)
    with open('tmp/data.txt', 'r') as f:
        data = f.read()
    print(data);
    if not data:
        records = [record]
    else:
        records = json.loads(data)
        records.append(record)
    with open('tmp/data.txt', 'w') as f:
        f.write(json.dumps(records, indent=2))
    return jsonify(record)

@app.route('/rest', methods=['POST'])
def update_record():
    record = json.loads(request.data)
    new_records = []
    with open('tmp/data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
    for r in records:
        if r['name'] == record['name']:
            r['email'] = record['email']
        new_records.append(r)
    with open('tmp/data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    return jsonify(record)
    
@app.route('/rest', methods=['DELETE'])
def delte_record():
    record = json.loads(request.data)
    new_records = []
    with open('tmp/data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        for r in records:
            if r['name'] == record['name']:
                continue
            new_records.append(r)
    with open('tmp/data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    return jsonify(record)

@app.route('/put')
def record_put():
    dt = {'name':'balajee', 'email':'balajee.rm@klu.in'};
    response = requests.put(url = 'http://127.0.0.1:5000/rest', data = json.dumps(dt));
    return "Values Inserted into .txt file";

@app.route('/get')
def record_get():
    response = requests.get(url = 'http://127.0.0.1:5000/rest?name=balajee');
    return (response.content);

app.run(debug=True)
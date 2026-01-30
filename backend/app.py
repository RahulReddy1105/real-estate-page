from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so your React frontend (port 5173) can talk to this Python backend (port 5000)
CORS(app) 

# Simple in-memory storage for leads
leads = []

@app.route('/api/submit', methods=['POST'])
def submit_lead():
    data = request.json
    
    # Validation: Ensure name and email are present
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Create a new lead record
    new_lead = {
        "id": len(leads) + 1,
        "name": data['name'],
        "email": data['email'],
        "phone": data.get('phone', 'N/A')
    }
    
    leads.append(new_lead)
    
    # Print to the terminal so you can see it working
    print(f"✅ NEW LEAD RECEIVED: {new_lead}")
    
    return jsonify({"message": "Lead submitted successfully!", "lead": new_lead}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
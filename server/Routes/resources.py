from flask import Blueprint, request, jsonify,make_response
import requests

resources = Blueprint('resources', __name__)

@resources.route('/resources', methods=['GET'])
#combine search
def combine_search():
    query = request.args.get('query')
    if not query:
        return make_response(jsonify({"error":"Search query is required"}), 400)

#--- 1. CourtListener Search ---
    court_url="https://www.courtlistener.com/api/rest/v4/search/"
    court_params = {"q": query, "type": "o"} #opinion

    court_results = []
    try:
        response = requests.get(court_url, params=court_params)
        data =  response.json()
        for item in data.get("results",[]):
            court_results.append({
                "case_name": item.get("caseName"),
                "data_filed":item.get("dataFiled"),
                "court": item.get("court",{}).get("name_abbreviation") if item.get("court") else None,
                "snippet": item.get("snippet"),
                "url": f"https://www.courtlistener.com{item.get('absolute_url')}"
    })
    except Exception as e:
        return make_response(jsonify({"error": f"Error fetching data from CourtListener: {str(e)}"}), 500)
        
    




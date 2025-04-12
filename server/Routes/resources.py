from flask import Blueprint, request, jsonify, make_response
import requests

resources_bp = Blueprint('resources', __name__)  # Changed from 'resources' to 'resources_bp'

@resources_bp.route('/resources', methods=['GET'])  # Update route decorator to use resources_bp
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
    
    #--- 2. Open Library Search (Books)--
    open_library_url = f"https://openlibrary.org/search.json?q={query}+law"

    books_results = []
    try:
        ol_response = requests.get(open_library_url)
        ol_data = ol_response.json()
        for doc in ol_data.get("docs", []):
            books_results.append({
                "title": doc.get("title"),
                "author": ','.join(doc.get("author_name", [])),
                "year": doc.get("first_publish_year"),
                "link": f"https://openlibrary.org{doc.get('key')}"
            })
    except Exception as e:
        books_results.append({"error": f"Could not fetch OpenLibrary data: {str(e)}"})

    return make_response(jsonify({
        "query": query,
        "cases": court_results,
        "books": books_results
    })), 200
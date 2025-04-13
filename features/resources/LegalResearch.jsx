import React, { useState } from "react";
import { searchLegalResources } from "../../utils/api";
import "../../index.css";

const LegalResources = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState("all");
  const [jurisdiction, setJurisdiction] = useState("all");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const params = {
        query,
        type: resourceType !== "all" ? resourceType : undefined,
        jurisdiction: jurisdiction !== "all" ? jurisdiction : undefined,
      };

      const res = await searchLegalResources(params);
      setResults(res);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch legal resources");
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "case":
        return "⚖️";
      case "statute":
        return "📜";
      default:
        return "📄";
    }
  };

  return (
    <div className="legal-resources-container max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Legal Resources
      </h2>

      <div className="search-card space-y-4">
        <div className="form-group">
          <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
            Enter Search Query
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="resourceType" className="block text-gray-700 font-medium mb-2">
              Resource Type
            </label>
            <select
              id="resourceType"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="case">Case Law</option>
              <option value="statute">Statutes</option>
              <option value="article">Articles</option>
            </select>
          </div>

          <div>
            <label htmlFor="jurisdiction" className="block text-gray-700 font-medium mb-2">
              Jurisdiction
            </label>
            <select
              id="jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Jurisdictions</option>
              <option value="federal">Federal</option>
              <option value="state">State</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <button
          className={`w-full py-2 px-4 rounded text-white font-bold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleSearch}
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {loading && <p className="text-gray-600 mt-4">Loading...</p>}

      {results.length > 0 && (
        <div className="results-container mt-6">
          <h3 className="text-xl font-semibold mb-4">Search Results ({results.length})</h3>
          <ul className="results-list space-y-4">
            {results.map((result) => (
              <li key={result.id} className="result-item p-4 border rounded shadow">
                <span className="result-icon text-2xl">{getResourceIcon(result.type)}</span>
                <div className="result-details ml-4">
                  <h4 className="text-lg font-bold">{result.title}</h4>
                  <p className="text-gray-600">{result.citation || "No citation available"}</p>
                  <p className="text-gray-500">{result.summary || "No summary available"}</p>
                </div>
                <a
                  href={result.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LegalResources;
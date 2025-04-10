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
    <div className="legal-resources-container">
      <h2 className="legal-resources-title">Legal Resources</h2>

      <div className="search-card">
        <div className="form-group">
          <label htmlFor="search">Search Legal Resources</label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="resourceType">Resource Type</label>
          <select
            id="resourceType"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="case">Case Law</option>
            <option value="statute">Statutes</option>
            <option value="article">Articles</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jurisdiction">Jurisdiction</label>
          <select
            id="jurisdiction"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
          >
            <option value="all">All Jurisdictions</option>
            <option value="federal">Federal</option>
            <option value="state">State</option>
            <option value="international">International</option>
          </select>
        </div>

        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading && <p className="loading-message">Loading...</p>}

      {results.length > 0 && (
        <div className="results-container">
          <h3>Search Results ({results.length})</h3>
          <ul className="results-list">
            {results.map((result) => (
              <li key={result.id} className="result-item">
                <span className="result-icon">{getResourceIcon(result.type)}</span>
                <div className="result-details">
                  <h4>{result.title}</h4>
                  <p>{result.citation || "No citation available"}</p>
                  <p className="result-summary">
                    {result.summary || "No summary available"}
                  </p>
                </div>
                <a
                  href={result.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-button"
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
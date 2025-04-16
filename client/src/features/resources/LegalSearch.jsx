import React, { useState } from "react";
import { searchLegalResources } from "../../utils/api";
import { BookOpen, Scale, Scroll, FileText, Search, ExternalLink } from "lucide-react";
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
        return <Scale size={20} className="text-indigo-600" />;
      case "statute":
        return <Scroll size={20} className="text-emerald-600" />;
      case "article":
        return <FileText size={20} className="text-amber-600" />;
      default:
        return <BookOpen size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-b-xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Legal Resources</h1>
              <p className="text-slate-300 mt-2">Search for cases, statutes, and legal articles</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center">
              <BookOpen size={16} className="mr-2" />
              Research Center
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 pb-8">
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                  Search Query
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter case name, statute reference, or keyword..."
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full border border-slate-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="resourceType" className="block text-sm font-medium text-slate-700 mb-2">
                  Resource Type
                </label>
                <select
                  id="resourceType"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="case">Case Law</option>
                  <option value="statute">Statutes</option>
                  <option value="article">Articles</option>
                </select>
              </div>

              <div>
                <label htmlFor="jurisdiction" className="block text-sm font-medium text-slate-700 mb-2">
                  Jurisdiction
                </label>
                <select
                  id="jurisdiction"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 bg-white"
                >
                  <option value="all">All Jurisdictions</option>
                  <option value="federal">Federal</option>
                  <option value="state">State</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className={`py-3 px-8 rounded-lg text-white font-medium transition-all flex items-center ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-200"
                }`}
                onClick={handleSearch}
                disabled={loading || !query.trim()}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    Search Resources
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
              <div className="mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{error}</p>
                <p className="text-sm mt-1">Please try again or modify your search parameters.</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Search Results</h3>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </span>
              </div>

              <ul className="space-y-4">
                {results.map((result) => (
                  <li 
                    key={result.id} 
                    className="p-4 rounded-lg border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="p-3 bg-slate-50 rounded-lg mr-4">
                        {getResourceIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold text-slate-800 mb-1">{result.title}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                            {result.type}
                          </span>
                        </div>
                        
                        {result.citation && (
                          <p className="text-sm font-medium text-slate-600 mb-2">{result.citation}</p>
                        )}
                        
                        {result.summary && (
                          <p className="text-slate-600 text-sm mb-3 line-clamp-2">{result.summary}</p>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-500">
                            {result.jurisdiction && (
                              <span className="inline-flex items-center mr-3 capitalize">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 mr-1"></span>
                                {result.jurisdiction}
                              </span>
                            )}
                            {result.date && (
                              <span className="inline-flex items-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span>
                                {result.date}
                              </span>
                            )}
                          </div>
                          
                          <a
                            href={result.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            View Resource
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && results.length === 0 && query.trim() && (
            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="p-4 bg-slate-50 rounded-full mb-4">
                  <BookOpen size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No results found</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  We couldn't find any legal resources matching your search criteria. Try broadening your search or using different keywords.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalResources;
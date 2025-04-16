import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClientDetails } from "../../utils/api";
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, IdentificationIcon, CalendarIcon, PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const data = await getClientDetails(id);
        setClient(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to load client details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-lg">
        <p className="font-medium">No client found with this ID.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
              <p className="text-slate-300 mt-1">Client #{client.id}</p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to={`/clients/${client.id}/edit`}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Edit Client
            </Link>
            <Link
              to="/clients"
              className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to List
            </Link>
          </div>
        </div>
      </div>

      {/* Client Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-500" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Email Address</p>
                <p className="text-slate-800 font-medium">{client.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg mr-3">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Phone Number</p>
                <p className="text-slate-800 font-medium">{client.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mr-3">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Address</p>
                <p className="text-slate-800 font-medium">{client.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Details */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <IdentificationIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Client Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                <IdentificationIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Client ID</p>
                <p className="text-slate-800 font-medium">{client.id}</p>
              </div>
            </div>
            
            {client.created_at && (
              <div className="flex items-start">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mr-3">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Created On</p>
                  <p className="text-slate-800 font-medium">
                    {new Date(client.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
            
            {/* Add any additional client fields here */}
          </div>
        </div>
      </div>
      
      {/* Future section for client cases, notes, or other related info */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Associated Cases</h3>
          <Link 
            to={`/cases/new?client=${client.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add New Case
          </Link>
        </div>
        
        {/* Placeholder for when there are no cases */}
        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
          <div className="p-4 bg-slate-50 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="font-medium text-slate-600">No cases associated with this client</p>
          <p className="text-sm text-slate-400 mt-1">Create a new case to get started</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
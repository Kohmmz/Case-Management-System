import { NavLink, Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BookOpenIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const Navigation = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white shadow-xl flex flex-col transition-all duration-300">
        {/* Logo Area */}
        <div className="px-6 py-8 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center">
            CaseFlow
          </h2>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">Main</p>
          
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
            }
          >
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
            }
          >
            <UserGroupIcon className="w-5 h-5 mr-3" />
            Clients
          </NavLink>
          
          <NavLink
            to="/cases"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
            }
          >
            <BriefcaseIcon className="w-5 h-5 mr-3" />
            Cases
          </NavLink>
          
          
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive
            ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
            : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
          }
          >
            <DocumentTextIcon className="w-5 h-5 mr-3" />
            Documents
          </NavLink>
          
          <NavLink
            to="/advocates"
            className={({ isActive }) =>
              isActive
            ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
            }
          >
            <AcademicCapIcon className="w-5 h-5 mr-3" />
            Advocates
          </NavLink>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mt-6 mb-2">Resources</p>
          
          <NavLink
            to="/resources/search"
            className={({ isActive }) =>
              isActive
            ? "flex items-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
            : "flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
          }
          >
            <BookOpenIcon className="w-5 h-5 mr-3" />
            Legal Resources
          </NavLink>
        </nav>
        
        {/* Bottom Settings Link */}
        <div className="px-4 py-4 border-t border-slate-700/50">
          <NavLink
            to="/settings"
            className="flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Navigation;
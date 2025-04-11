import { NavLink, Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"; // Import Heroicons

const Navigation = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-4">CaseFlow</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <UserGroupIcon className="w-5 h-5 mr-2" />
            Clients
          </NavLink>
          <NavLink
            to="/cases"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            Cases
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Documents
          </NavLink>
          <NavLink
            to="/advocates"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <AcademicCapIcon className="w-5 h-5 mr-2" />
            Advocates
          </NavLink>
          <NavLink
            to="/resources/search"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-3 bg-blue-700 rounded text-blue-200 font-bold"
                : "flex items-center py-2 px-3 hover:bg-blue-500 rounded"
            }
          >
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Legal Resources
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
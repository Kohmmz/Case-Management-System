import { NavLink, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-4">CaseFlow</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
            Clients
          </NavLink>
          <NavLink
            to="/cases"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
            Cases
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
            Documents
          </NavLink>
          <NavLink
            to="/advocates"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
            Advocates
          </NavLink>
          <NavLink
            to="/resources/search"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-200 font-bold" : "block py-1"
            }
          >
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
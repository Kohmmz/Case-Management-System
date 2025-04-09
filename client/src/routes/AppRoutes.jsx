import { Routes, Route } from "react-router-dom";
import ClientList from "../features/clients/ClientList";
// import other pages...

const AppRoutes = () => {
  return (
    <Routes>
      {/* ...other routes */}
      <Route path="/clients" element={<ClientList />} />
    </Routes>
  );
};

export default AppRoutes;

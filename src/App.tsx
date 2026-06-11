import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import GroupDetails from "./pages/GroupDetails";
import Groups from "./pages/Groups";
import History from "./pages/History";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#060d1b] min-h-screen text-slate-100 font-sans">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/group/:id" element={<GroupDetails />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;

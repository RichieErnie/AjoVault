import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, History, User } from "lucide-react";

const TABS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Groups", icon: Users, path: "/groups" },
  { label: "History", icon: History, path: "/history" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0d1829] border-t border-white/10 px-6 py-3 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 
                            ${
                              isActive
                                ? "bg-[#00e87a]/10 text-[#00e87a]"
                                : "text-slate-500 hover:text-slate-300"
                            } `}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

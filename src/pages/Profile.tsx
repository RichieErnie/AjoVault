import { useAjoStore } from "../store/useAjoStore";
import { formatDate } from "../utils/formatDate";
import {
  Mail,
  Bell,
  Moon,
  Info,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function Profile() {
  const currentUser = useAjoStore((state) => state.currentUser);

  if (!currentUser) return null;

  const MENU_ITEMS = [
    {
      icon: Bell,
      label: "Notification",
      action: () => {},
      chevron: true,
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      action: () => {},
      chevron: true,
    },
    {
      icon: Info,
      label: "About AjoVault",
      action: () => {},
      chevron: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060d1b] pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-white font-bold text-2xl">Profile</h1>
      </div>

      <div className="px-5 space-y-5">
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#00e87a]/20 border-2 border-[#00e87a]/30 flex items-center justify-center shrink-0">
              <span className="text-[#00e87a] text-2xl font-bold">
                {currentUser.name[0].toUpperCase()}
              </span>
            </div>

            {/* Name and email */}
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg truncate">
                {currentUser.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Mail size={12} className="text-slate-500 shrink-0" />
                <p className="text-slate-400 text-sm truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-[#00e87a] text-xl font-bold">
              ₦{currentUser.totalSaved.toLocaleString("en-NG")}
            </p>
            <p className="text-slate-500 text-xs mt-1">Total Saved</p>
          </div>
          <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-[#00e87a] text-xl font-bold">
              {currentUser.activeGroups}
            </p>
            <p className="text-slate-500 text-xs mt-1">Active Groups</p>
          </div>
          <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-4 text-center col-span-2">
            <p className="text-[#00e87a] text-xl font-bold">
              {formatDate(currentUser.nextPayoutDate)}
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Next Payout — Expected ₦
              {currentUser.nextPayoutAmount.toLocaleString("en-NG")}
            </p>
          </div>
        </div>

        {/* ── Dark mode toggle ── */}
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-[#00e87a]" />
              <span className="text-white text-sm font-medium">Dark Mode</span>
            </div>

            {/* Dark mode toggle */}
            <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon size={18} className="text-[#00e87a]" />
                  <div>
                    <span className="text-white text-sm font-medium">
                      Dark Mode
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Light mode coming soon
                    </p>
                  </div>
                </div>

                {/* Disabled toggle */}
                <div className="relative w-12 h-6 rounded-full bg-[#00e87a] opacity-60 cursor-not-allowed">
                  <span className="absolute top-0.5 left-6 w-5 h-5 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Menu items ── */}
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl overflow-hidden">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors ${
                index !== MENU_ITEMS.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-slate-400" />
                <span className="text-white text-sm">{item.label}</span>
              </div>
              {item.chevron && (
                <ChevronRight size={16} className="text-slate-600" />
              )}
            </button>
          ))}
        </div>

        {/* ── Sign out ── */}
        <button className="w-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold py-4 rounded-2xl hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} />
          Sign Out
        </button>

        <p className="text-slate-600 text-xs text-center pb-4">
          AjoVault v1.0.0 — Built with ❤️ in Nigeria
        </p>
      </div>
    </div>
  );
}

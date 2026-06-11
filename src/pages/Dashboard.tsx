import { useNavigate } from "react-router-dom";
import { useAjoStore } from "../store/useAjoStore";
import StatCard from "../components/StatCard";
import GroupCard from "../components/GroupCard";
import {
  Wallet,
  Users,
  Calendar,
  Bell,
  Rocket,
  Home
} from "lucide-react";
import { formatDate } from "../utils/formatDate";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = useAjoStore((state) => state.currentUser);
  const groups = useAjoStore((state) => state.groups);

  if (!currentUser) return null;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const STAT_CARDS = [
    {
      icon: Wallet,
      label: "Total Saved",
      value: `₦${currentUser.totalSaved.toLocaleString("en-NG")}`,
      subtext: "+12% this month",
    },
    {
      icon: Users,
      label: "Active Groups",
      value: String(currentUser.activeGroups),
      subtext: "Managing your ROSCAs",
    },
    {
      icon: Calendar,
      label: "Next Payout",
      value: formatDate(currentUser.nextPayoutDate),
      subtext: `Expected: ₦${currentUser.nextPayoutAmount.toLocaleString("en-NG")}`,
    },
  ];

  const GROUP_ICONS: Record<
    string,
    React.ComponentType<{ size: number; className?: string }>
  > = {
    "1": Rocket,
    "2": Home,
  };

  return (
    <div className="min-h-screen bg-[#060d1b] pb-24">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <div
          className="w-9 h-9 rounded-full bg-[#00e87a]/20 flex items-center justify-center"
          onClick={() => navigate("/profile")}
        >
          <span className="text-[#00e87a] font-bold text-sm">
            {currentUser.name[0].toUpperCase()}
          </span>
        </div>
        <h1 className="text-white font-bold text-lg">AjoVault</h1>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
      </div>

      <div className="px-5 space-y-6">
        {/* ── Greeting ── */}
        <div>
          <h2 className="text-white text-xl font-bold">
            {greeting}, {currentUser.name} 👋
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Your wealth is growing steadily.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="space-y-3">
          {STAT_CARDS.map((card) => (
            <StatCard
              key={card.label}
              icon={card.icon}
              label={card.label}
              value={card.value}
              subtext={card.subtext}
            />
          ))}
        </div>

        {/* ──Groups ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">My Groups</h3>
            <button
              className="text-[#00e87a] text-sm"
              onClick={() => navigate("groups")}
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => navigate(`/group/${group.id}`)}
                className="cursor-pointer"
              >
                <GroupCard
                  group={group}
                  icon={GROUP_ICONS[group.id] || Users}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Achieve more together banner ── */}
        <div className="bg-[#00e87a] rounded-2xl p-5 mb-6">
          <h3 className="text-[#060d1b] font-bold text-lg mb-1">
            Achieve more together.
          </h3>
          <p className="text-[#060d1b]/70 text-sm mb-4">
            Start a new Ajo group and invite your friends to reach your
            financial goals faster.
          </p>
          <button
            onClick={() => navigate("/create-group")}
            className="bg-[#060d1b] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#060d1b]/80 transition-colors"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

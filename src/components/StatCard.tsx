import React from "react";
// import { Users, Wallet, Calendar } from "lucide-react";

// const TABS = [
//     { icon: Wallet, label: "Total Saved", value: "₦450,000", subtext: "+12% this month" },
//     { icon: Users, label: "Active Groups", value: "3", subtext: "Managing ROSCAs" },
//     { icon: Calendar, label: "Next Payout", value: "Oct 15", subtext: "Expected: ₦400,000" }
// ];

interface StatCardProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
  subtext: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
}: StatCardProps) {
  return (
    <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-slate-400 text-sm">{label}</p>
        <div className="bg-[#00e87a]/10 p-2 rounded-lg">
          <Icon size={16} className="text-[#00e87a]" />
        </div>
      </div>
      <p className="text-white text-2xl font-bold mb-1">{value}</p>
      <p className="text-slate-500 text-xs">{subtext}</p>
    </div>
  );
}

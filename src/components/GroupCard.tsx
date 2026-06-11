import React from "react";
import { Users } from "lucide-react";
import type { Group } from "../types/index";
import { formatDate } from "../utils/formatDate";

type GroupCardProps = {
  group: Group;
  icon: React.ComponentType<{ size: number; className?: string }>;
};

export default function GroupCard({ group, icon: Icon }: GroupCardProps) {
  const roundsPercentage = (group.currentRound / group.totalRounds) * 100;

  const formattedAmount = group.contributionAmount.toLocaleString("en-NG");

  return (
    <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
      {/* ── Top row ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#00e87a]/10 p-2.5 rounded-xl">
            <Icon size={18} className="text-[#00e87a]" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{group.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Users size={11} className="text-slate-500" />
              <span className="text-slate-500 text-xs">
                {group.members.length} members
              </span>
            </div>
          </div>
        </div>

        {/* Contribution amount — top right */}
        <div className="text-right">
          <p className="text-[#00e87a] text-sm font-semibold">
            ₦{formattedAmount}
          </p>
          <p className="text-slate-500 text-xs">Contribution</p>
        </div>
      </div>

      {/* ── Progress row ── */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-400 text-xs">
          Round Progress: {group.currentRound} / {group.totalRounds}
        </p>
        <p className="text-slate-400 text-xs font-medium">
          {roundsPercentage}%
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-4">
        <div
          className="h-1.5 bg-[#00e87a] rounded-full transition-all duration-300"
          style={{ width: `${roundsPercentage}%` }}
        />
      </div>

      {/* ── Member avatars row ── */}
      <div className="flex items-center mb-3">
        {group.members.slice(0, 4).map((member, index) => (
          <div
            key={member.id}
            className="w-6 h-6 rounded-full border-2 border-[#0d1829] overflow-hidden flex items-center justify-center"
            style={{ marginLeft: index === 0 ? "0" : "-8px", zIndex: index }}
          >
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#00e87a]/20 flex items-center justify-center">
                <span className="text-[#00e87a] text-xs font-bold">
                  {member.name[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}

        {/*If there are more than 4 members */}
        {group.members.length > 4 && (
          <div
            className="w-6 h-6 rounded-full border-2 border-[#0d1829] bg-white/10 flex items-center justify-center"
            style={{ marginLeft: "-8px" }}
          >
            <span className="text-slate-400 text-xs">
              +{group.members.length - 4}
            </span>
          </div>
        )}
      </div>

      {/* ── Next contribution date ── */}
      <p className="text-slate-500 text-xs">
        Next contribution:{" "}
        <span className="text-[#00e87a]">
          {formatDate(group.nextCollectionDate)}
        </span>
      </p>
    </div>
  );
}

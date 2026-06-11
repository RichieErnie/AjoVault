import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { useAjoStore } from "../store/useAjoStore";
import { formatDate } from "../utils/formatDate";

export default function GroupDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const groups = useAjoStore((state) => state.groups);
  const currentUser = useAjoStore((state) => state.currentUser);
  const markAsPaid = useAjoStore((state) => state.markAsPaid);
  const advanceRound = useAjoStore((state) => state.advanceRound);

  const group = groups.find((g) => g.id === id);

  if (!group) return <div className="text-white p-5">Group not found</div>;
  if (!currentUser) return null;

  const isAdmin = currentUser.id === group.adminId;
  const roundsPercentage = (group.currentRound / group.totalRounds) * 100;
  const allMembersPaid = group.members.every((m) => m.hasPaid);

  const recentActivity = [
    ...group.members
      .filter((m) => m.hasPaid)
      .map((m) => ({
        id: m.id,
        message: `${m.name} contributed ₦${group.contributionAmount.toLocaleString("en-NG")}`,
        time: "Recently",
        type: "payment" as const,
      })),

    {
      id: "round",
      message: `Round ${group.currentRound} started successfully`,
      time: "This cycle",
      type: "round" as const,
    },
  ];
  return (
    <div className="min-h-screen bg-[#060d1b] pb-24">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-[#00e87a] font-bold text-lg">{group.name}</h1>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-slate-400" />
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* ── Current Status card ── */}
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
            Current Status
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-2xl font-bold">
                Round {group.currentRound} of {group.totalRounds}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Next collection:{" "}
                <span className="text-[#00e87a]">
                  {formatDate(group.nextCollectionDate)}
                </span>
              </p>
            </div>

            {/* Circular progress */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#00e87a"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - roundsPercentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                {Math.round(roundsPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* ── Group Contribution card ── */}
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">
            Group Contribution
          </p>
          <p className="text-[#00e87a] text-3xl font-bold mb-1">
            ₦{group.contributionAmount.toLocaleString("en-NG")}
            <span className="text-slate-400 text-base font-normal">
              {" "}
              / member
            </span>
          </p>

          {/* Members avatar*/}
          <div className="flex items-center mt-3">
            {group.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full border-2 border-[#0d1829] bg-[#00e87a]/20 flex items-center justify-center"
                style={{
                  marginLeft: index === 0 ? "0" : "-8px",
                  zIndex: index,
                }}
              >
                <span className="text-[#00e87a] text-xs font-bold">
                  {member.name[0].toUpperCase()}
                </span>
              </div>
            ))}

            {group.members.length > 4 && (
              <div
                className="w-8 h-8 rounded-full border-2 border-[#0d1829] bg-white/10 flex items-center justify-center"
                style={{ marginLeft: "-8px" }}
              >
                <span className="text-slate-400 text-xs">
                  +{group.members.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Members list ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-lg">
              Members ({group.members.length})
            </h3>
            <button className="text-[#00e87a] text-sm">View All</button>
          </div>

          <div className="space-y-3">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="bg-[#0d1829] border border-white/10 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00e87a]/20 flex items-center justify-center bg-[#00e87a]/20">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#00e87a] font-bold">
                        {member.name[0].toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Name and slot */}
                  <div>
                    <p className="text-white text-sm font-medium">
                      {member.name}
                      {member.id === group.adminId && (
                        <span className="text-slate-500 text-xs ml-2">
                          (Admin)
                        </span>
                      )}
                    </p>
                    <p className="text-slate-500 text-xs">
                      Slot #{member.slot}
                    </p>
                  </div>
                </div>

                <div className="flex items-end gap-1">
                  {member.hasPaid ? (
                    <span className="bg-[#00e87a]/10 text-[#00e87a] text-xs px-3 py-1 rounded-full">
                      PAID
                    </span>
                  ) : isAdmin ? (
                    <button
                      onClick={() => markAsPaid(group.id, member.id)}
                      className="bg-red-500/10 text-red-400 text-xs px-3 py-1 rounded-full border border-red-500/20 hover:bg-[#00e87a]/10 hover:text-[#00e87a] hover:border-[#00e87a]/20 transition-all duration-200"
                    >
                      UNPAID
                    </button>
                  ) : (
                    <span className="bg-red-500/10 text-red-400 text-xs px-3 py-1 rounded-full">
                      UNPAID
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Advance round button — shows when all paid ── */}
        {isAdmin && allMembersPaid && (
          <button
            onClick={() => advanceRound(group.id)}
            className="w-full bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-colors"
          >
            Advance to Round {group.currentRound + 1}
          </button>
        )}

        {/* ── Recent Activity ── */}
        <div className="mt-2">
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1 ${
                      activity.type === "payment"
                        ? "bg-[#00e87a]"
                        : "bg-slate-600"
                    }`}
                  />
                  <div className="w-px flex-1 bg-white/10 mt-1" />
                </div>

                {/* Activity content */}
                <div className="pb-4">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

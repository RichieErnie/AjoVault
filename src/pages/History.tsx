import { useAjoStore } from "../store/useAjoStore";
import { formatDate } from "../utils/formatDate";
import { CheckCircle, Clock } from "lucide-react";

const FILTER_TABS = ["all", "completed", "upcoming"] as const;

export default function History() {
  const payouts = useAjoStore((state) => state.payouts);
  const activeFilter = useAjoStore((state) => state.activeFilter);
  const setFilter = useAjoStore((state) => state.setFilter);

  const filteredPayouts =
    activeFilter === "all"
      ? payouts
      : payouts.filter((p) => p.status === activeFilter);

  return (
    <div className="min-h-screen bg-[#060d1b] pb-24">
      {/* ── Header ── */}
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-white font-bold text-2xl">Payout History</h1>
      </div>

      <div className="px-5 space-y-6">
        {/* ── Total Disbursed card ── */}
        <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
            Total Disbursed
          </p>
          <p className="text-white text-3xl font-bold">
            ₦
            {payouts
              .filter((p) => p.status === "completed")
              .reduce((sum, p) => sum + p.amount, 0)
              .toLocaleString("en-NG")}
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeFilter === tab
                  ? "bg-[#00e87a] text-[#060d1b]"
                  : "bg-[#0d1829] text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Payouts timeline ── */}
        <div className="space-y-3">
          {filteredPayouts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">No payouts found</p>
            </div>
          ) : (
            filteredPayouts.map((payout) => (
              <div key={payout.id} className="flex gap-3">
                {/* Timeline icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${payout.status === "completed" ? "bg-[#00e87a]/20" : "bg-white/10"}`}
                  >
                    {payout.status === "completed" ? (
                      <CheckCircle size={16} className="text-[#00e87a]" />
                    ) : (
                      <Clock size={16} className="text-slate-400" />
                    )}
                  </div>
                  <div className="w-px flex-1 bg-white/10 mt-1" />
                </div>

                {/* Payout card */}
                <div className="bg-[#0d1829] border border-white/10 rounded-xl p-4 flex-1 mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white text-sm font-semibold">
                      {payout.collectorName} collected ₦
                      {payout.amount.toLocaleString("en-NG")}
                    </p>
                    <span className="text-slate-500 text-xs shrink-0 ml-2">
                      {formatDate(payout.date)}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs mb-3">
                    Round {payout.round} payout
                  </p>

                  <div className="flex items-center gap-2">
                    {" "}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${payout.status === "completed" ? "bg-[#00e87a]/10 text-[#00e87a]" : "bg-amber-500/10 text-amber-400"}`}
                    >
                      {payout.status.toUpperCase()}
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-slate-500 text-xs">
                      Vault: {payout.groupName}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

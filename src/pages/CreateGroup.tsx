import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAjoStore } from "../store/useAjoStore";
import { formatDate } from "../utils/formatDate";

const groupShema = z
  .object({
    name: z
      .string()
      .min(3, "Group name must be at least 3 characters")
      .max(30, "Group name is too long"),

    contributionAmount: z.number().min(1000, "Minimum contribution is ₦1,000"),

    frequency: z.enum(["weekly", "biweekly", "monthly"]),

    startDate: z.string().min(1, "Please select a start date"),

    maxMembers: z
      .number()
      .min(3, "Minimum 3 members")
      .max(10, "Maximum 10 members"),
  })
  .refine(
    (data) => {
      if (data.frequency === "weekly" && data.contributionAmount < 1000)
        return false;
      if (data.frequency === "biweekly" && data.contributionAmount < 2000)
        return false;
      if (data.frequency === "monthly" && data.contributionAmount < 3000)
        return false;

      return true;
    },
    {
      message: "Contribution amount is too low for the selected frequency",
      path: ["contributionAmount"],
    },
  );

type GroupFormData = z.infer<typeof groupShema>;

export default function CreateGroup() {
  const navigate = useNavigate();
  const currentUser = useAjoStore((state) => state.currentUser);
  const addGroups = useAjoStore((state) => state.addGroup);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupShema),
    defaultValues: { frequency: "monthly", maxMembers: 5 },
  });

  if (!currentUser) return null;

  const watchedName = watch("name");
  const watchedAmount = watch("contributionAmount");
  const watchedFrequency = watch("frequency");
  const watchedMembers = watch("maxMembers");
  const watchedDate = watch("startDate");

  const onSubmit = (data: GroupFormData) => {
    const newGroup = {
      id: String(Date.now()),
      name: data.name,
      contributionAmount: data.contributionAmount,
      frequency: data.frequency,
      startDate: data.startDate,
      currentRound: 1,
      totalRounds: data.maxMembers,
      nextCollectionDate: data.startDate,
      createdAt: new Date().toISOString(),
      adminId: currentUser.id,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          slot: 1,
          hasPaid: false,
        },
      ],
    };

    addGroups(newGroup);
    navigate("/groups");
  };

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
        <h1 className="text-[#00e87a] font-bold text-lg">Create New Group</h1>
        <div className="w-9 h-9 rounded-full bg-[#00e87a]/20 flex items-center justify-center">
          <span className="text-[#00e87a] font-bold text-sm">
            {currentUser.name[0].toUpperCase()}
          </span>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Group Name */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest mb-2 block">
              Group Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Lagos Tech Collective"
              className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00e87a]/50 transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Contribution + Frequency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest mb-2 block">
                Contribution (₦)
              </label>
              <input
                {...register("contributionAmount", { valueAsNumber: true })}
                type="number"
                placeholder="50,000"
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00e87a]/50 transition-colors"
              />
              {errors.contributionAmount && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.contributionAmount.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest mb-2 block">
                Frequency
              </label>
              <select
                {...register("frequency")}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e87a]/50 transition-colors appearance-none"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Start Date + Max Members */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest mb-2 block">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e87a]/50 transition-colors"
              />
              {errors.startDate && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest mb-2 block">
                Max Members
              </label>
              <input
                type="number"
                {...register("maxMembers", { valueAsNumber: true })}
                placeholder="10"
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00e87a]/50 transition-colors"
              />
              {errors.maxMembers && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.maxMembers.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
              Group Preview
            </p>
            <div className="bg-[#0d1829] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {watchedName || "New Ajo Group"}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Starts {watchedDate ? formatDate(watchedDate) : "TBD"}
                  </p>
                </div>
                <span className="bg-[#00e87a]/10 text-[#00e87a] text-xs px-3 py-1 rounded-full">
                  ACTIVE
                </span>
              </div>

              <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">
                    Contribution
                  </p>
                  <p className="text-[#00e87a] font-bold text-lg">
                    ₦
                    {watchedAmount
                      ? watchedAmount.toLocaleString("en-NG")
                      : "0.00"}
                  </p>
                  <p className="text-slate-500 text-xs capitalize">
                    {watchedFrequency || "Monthly"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">
                    Potential Payout
                  </p>
                  <p className="text-[#00e87a] font-bold text-lg">
                    ₦
                    {watchedAmount && watchedMembers
                      ? (watchedAmount * watchedMembers).toLocaleString("en-NG")
                      : "0.00"}
                  </p>
                  <p className="text-slate-500 text-xs">Total Cycle</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full bg-[#00e87a]/20 flex items-center justify-center">
                    <span className="text-[#00e87a] text-xs font-bold">
                      {currentUser.name[0].toUpperCase()}
                    </span>
                  </div>
                  {watchedMembers > 1 && (
                    <div
                      style={{ marginLeft: "-8px" }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <span className="text-slate-400 text-xs">
                        +{watchedMembers - 1}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-slate-500 text-xs">Member Cap</p>
                  <p className="text-white font-semibold text-sm">
                    {watchedMembers || 5} Members
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Submit button ── */}
          <button
            type="submit"
            className="w-full bg-[#00e87a] text-[#060d1b] font-bold py-4 rounded-2xl hover:bg-[#00e87a]/90 transition-colors"
          >
            Create Group
          </button>

          <p className="text-slate-600 text-xs text-center pb-4">
            By creating a group, you agree to the AjoVault terms and cycle
            automation rules.
          </p>
        </form>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useAjoStore } from "../store/useAjoStore";
import GroupCard from "../components/GroupCard";
import { Plus, Rocket, Home } from "lucide-react";

const GROUP_ICONS = {
  "1": Rocket,
  "2": Home,
};

export default function Groups() {
  const navigate = useNavigate();
  const groups = useAjoStore((state) => state.groups);

  return (
    <div className="min-h-screen bg-[#060d1b] pb-24">
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <h1 className="text-white font-bold text-2xl">My Groups</h1>
        <button
          onClick={() => navigate("/create-group")}
          className="w-9 h-9 rounded-full bg-[#00e87a]/20 flex items-center justify-center"
        >
          <Plus size={18} className="text-[#00e87a]" />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="cursor-pointer"
            onClick={() => navigate(`/group/${group.id}`)}
          >
            <GroupCard 
            group={group}
            icon={GROUP_ICONS[group.id as keyof typeof GROUP_ICONS] || Rocket}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

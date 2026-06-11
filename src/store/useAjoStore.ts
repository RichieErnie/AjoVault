import { create } from "zustand";
import type { User, Group, PayoutRecord } from "../types";
import { mockUser, mockGroups, mockPayoutRecords } from "../data/mockData";

interface AjoStore {
  // ---State ---------
  currentUser: User | null;
  groups: Group[];
  payouts: PayoutRecord[];
  activeFilter: "all" | "completed" | "upcoming";

  // ---Actions ---------
  addGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
  markAsPaid: (groupId: string, memberId: string) => void;
  advanceRound: (groupId: string) => void;
  setFilter: (filter: "all" | "completed" | "upcoming") => void;
}

export const useAjoStore = create<AjoStore>()((set) => ({
  // ---Initial State ---------
  currentUser: mockUser,
  groups: mockGroups,
  payouts: mockPayoutRecords,
  activeFilter: "all",

  // ── Actions ────────────────────────

  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),

  deleteGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== groupId),
    })),

  setFilter: (filter) => set({ activeFilter: filter }),

  markAsPaid: (groupId, memberId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          members: group.members.map((member) => {
            if (member.id !== memberId) return member;
            return { ...member, hasPaid: true };
          }),
        };
      }),
    })),

  advanceRound: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          currentRound: group.currentRound + 1,
          members: group.members.map((member) => ({
            ...member,
            hasPaid: false,
          })),
        };
      }),
    })),
}));
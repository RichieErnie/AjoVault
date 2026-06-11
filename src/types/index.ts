export interface Member {
  id: string;
  name: string;
  slot: number;
  hasPaid: boolean;
  avatarUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: "weekly" | "biweekly" | "monthly";
  currentRound: number;
  totalRounds: number;
  nextCollectionDate: string;
  members: Member[];
  createdAt: string;
  adminId: string;
}

export interface PayoutRecord {
  id: string;
  groupId: string;
  groupName: string;
  collectorName: string;
  amount: number;
  round: number;
  date: string;
  status: "completed" | "upcoming";
}

export interface User {
  id: string;
  name: string;
  email: string;
  totalSaved: number;
  activeGroups: number;
  nextPayoutDate: string;
  nextPayoutAmount: number;
}


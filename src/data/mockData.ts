import type { User, Group, PayoutRecord } from "../types";

export const mockUser: User = {
  id: "1",
  name: "Richard",
  email: "richiernie04@gmail.com",
  totalSaved: 450000,
  activeGroups: 2,
  nextPayoutDate: "2025-10-15",
  nextPayoutAmount: 400000,
};

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Lagos Techies",
    contributionAmount: 50000,
    frequency: "monthly",
    currentRound: 4,
    totalRounds: 8,
    nextCollectionDate: "2025-10-15",
    createdAt: "2025-01-01",
    adminId: "1",
    members: [
      { id: "1", name: "Richard", slot: 1, hasPaid: true },
      { id: "2", name: "Tunde", slot: 2, hasPaid: true },
      { id: "3", name: "Chioma", slot: 3, hasPaid: false },
      { id: "4", name: "Amaka", slot: 4, hasPaid: false },
      { id: "5", name: "Kemi", slot: 5, hasPaid: false },
      { id: "6", name: "Emeka", slot: 6, hasPaid: false },
      { id: "7", name: "Sola", slot: 7, hasPaid: false },
      { id: "8", name: "Bola", slot: 8, hasPaid: false },
    ],
  },
  {
    id: "2",
    name: "Family Savings",
    contributionAmount: 20000,
    frequency: "monthly",
    currentRound: 2,
    totalRounds: 5,
    nextCollectionDate: "2025-10-20",
    createdAt: "2025-03-01",
    adminId: "1",
    members: [
      { id: "1", name: "Richard", slot: 1, hasPaid: true },
      { id: "5", name: "Kemi", slot: 2, hasPaid: false },
      { id: "8", name: "Bola", slot: 3, hasPaid: false },
      { id: "9", name: "Dare", slot: 4, hasPaid: false },
      { id: "10", name: "Ngozi", slot: 5, hasPaid: false },
    ],
  },
];

export const mockPayoutRecords: PayoutRecord[] = [
  {
    id: "1",
    groupId: "1",
    groupName: "Lagos Techies",
    collectorName: "Tunde",
    amount: 400000,
    round: 3,
    date: "2025-10-01",
    status: "completed",
  },
  {
     id: '2',
    groupId: '1',
    groupName: 'Lagos Techies',
    collectorName: 'Richard',
    amount: 400000,
    round: 2,
    date: '2025-09-01',
    status: 'completed',
  }, 
    {
    id: '3',
    groupId: '1',
    groupName: 'Lagos Techies',
    collectorName: 'Sarah',
    amount: 400000,
    round: 5,
    date: '2025-11-01',
    status: 'upcoming',
  }
];

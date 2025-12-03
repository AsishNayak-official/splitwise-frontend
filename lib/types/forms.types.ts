export type SplitNewExpenseFormValues = {
  groupName: string;
  description: string;
  totalAmount: number;
  paidBy: string;
  participants: { userId: string; share: number }[];
};
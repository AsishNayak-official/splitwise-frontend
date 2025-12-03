
export type IGroup = {
  _id: string;
  name: string;
  createdBy: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};

export type GroupShort = {
  groupId: string;
  groupName: string;
}

export type IGroupActivity = {
  _id: string;
  createdAt: Date;
  description: string;
  totalAmount: number;
  paidBy: {_id: string; name: string};
  participants?: {
    user: string;
    share: number;
  }[];
}
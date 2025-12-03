export type IOwe ={
  friendId: string;
  friendName: string;
  netAmount: number;
  groups?:string[];
  date?:Date;
}

export type IRecentActivity ={
  _id: string;
  type: "expense" | "settlement";
  group: {_id: string; name: string};
  actor: {_id: string; name: string};
  description?: string;
  amount: number;
  createdAt: Date;
}
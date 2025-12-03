export type IFriendDetails = {
  id: string;
  youOwe: number;
  youAreOwed: number;
  name: string;
  lastActivityAt: string;
};

export type FriendShort = {
  friendId: string;
  friendName: string;
}
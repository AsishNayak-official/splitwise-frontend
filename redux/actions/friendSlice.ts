import { FriendShort, IFriendDetails } from "@/lib/types/friend.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FriendState = {
  friends: IFriendDetails[];
  friendList: FriendShort[];
};

const initialState: FriendState = {
  friends: [],
  friendList: [],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<IFriendDetails[]>) => {
      const friendsData = action.payload;
      state.friends = friendsData;

      friendsData.forEach((friend) => {
        const exists = state.friendList.some((f) => f.friendId === friend.id);
        if (!exists) {
          state.friendList.push({
            friendId: friend.id,
            friendName: friend.name,
          });
        }
      });
    },
    addCurrentUser: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const friend = action.payload;
      state.friendList.push({
        friendId: friend.id,
        friendName: friend.name,
      });
    },

    addFriend: (state, action: PayloadAction<IFriendDetails>) => {
      const friend = action.payload;
      state.friends.push(friend);

      state.friendList.push({
        friendId: friend.id,
        friendName: friend.name,
      });
    },
  },
});
export const { setFriends, addFriend, addCurrentUser } = friendSlice.actions;
export default friendSlice.reducer;

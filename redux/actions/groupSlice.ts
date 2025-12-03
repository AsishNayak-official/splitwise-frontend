import { GroupShort, IGroup } from "@/lib/types/group.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GroupState = {
  groups: IGroup[];
  groupList: GroupShort[];
};

const initialState: GroupState = {
  groups: [],
  groupList: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
      state.groupList = action.payload.map((group) => ({
        groupId: group._id,
        groupName: group.name,
      }));
    },
    addGroup: (state, action: PayloadAction<IGroup>) => {
      const group = action.payload;
      state.groups.push(group);
      state.groupList.push({
        groupId: group._id,
        groupName: group.name,
      });
    },
  },
});
export const { setGroups, addGroup } = groupSlice.actions;
export default groupSlice.reducer;

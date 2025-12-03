import axios from "./axiosInterceptor";
import { Participants } from "./dashboardApi";

export const fetchGroups = async () => {
  const res = await axios.get("/groups");
  return res.data;
};
export const getGroupDetails = async (groupId:string) => {
  const res = await axios.get(`/groups/${groupId}`);
  return res.data;
};
export const payFriendInGroup = async (groupId:string,friendId:string) => {
  const res = await axios.post(`/settlements/group/${groupId}/friend/${friendId}/pay`,{});
  return res.data;
};
export const markFriendReceivedInGroup = async (groupId:string,friendId:string) => {
  const res = await axios.post(`/settlements/group/${groupId}/friend/${friendId}/receive`,{});
  return res.data;
};
export const recentActivityInGroup = async (groupId:string) => {
  const res = await axios.get(`/activity/${groupId}`);
  return res.data;
};

export const addExpenseToGroup = async (
    groupId:string,
    description:string,
    totalAmount:number,
    paidBy:string,
    participants:Participants[]
) => {
  const res = await axios.post("/expenses/group",{groupId,description,totalAmount,paidBy,participants});
  return res.data;
};
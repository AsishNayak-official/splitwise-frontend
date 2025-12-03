import axios from "./axiosInterceptor";

export const dashboardStatus = async () => {
  const res = await axios.get("/dashboard");
  return res.data;
};

export const recentActivity = async () => {
  const res = await axios.get("/activity");
  return res.data;
};
export const getAllGroups = async () => {
  const res = await axios.get("/groups");
  return res.data;
};

export interface Participants{
    userId:string,
    share:number
}


export const createExpenseWithNewGroup = async (
    groupName:string,
    description:string,
    totalAmount:number,
    paidBy:string,
    participants:Participants[]
) => {
  const res = await axios.post("/expenses/new-group",{groupName,description,totalAmount,paidBy,participants});
  return res.data;
};


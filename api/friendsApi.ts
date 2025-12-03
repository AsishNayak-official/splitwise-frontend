import axios from "./axiosInterceptor";

export const fetchFriends = async () => {
  const res = await axios.get("/friends");
  return res.data;
};
export const addFriend = async (name:string,email:string,upiId:string) => {
  const res = await axios.post("/friends",{
    name,email,upiId
  });
  return res.data;
};
export const payFriend = async (friendId:string) => {
  const res = await axios.post(`/settlements/friend/${friendId}/pay-all`,{});
  return res.data;
};
export const markFriendReceived = async (friendId:string) => {
  const res = await axios.post(`/settlements/friend/${friendId}/receive-all`,{});
  return res.data;
};
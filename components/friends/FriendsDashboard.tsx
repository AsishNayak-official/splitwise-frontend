"use client";
import { Badge } from "../ui/badge";
import { AddFriendForm } from "./AddFriendForm";
import FriendsDataTable from "./FriendsDataTable";

const FriendsDashboard = () => {
  return (
    <div className="flex flex-row-reverse w-full justify-between gap-10">
      <div className="w-1/3">
        <AddFriendForm />
      </div>
      <div className="flex flex-col w-2/3">
        <div className="flex flex-row justify-between items-center mb-2">
          <span>Friends</span>
          <Badge>Net: +3</Badge>
        </div>
        <span>See how much you owe and are owed by friends</span>
        <FriendsDataTable/>
      </div>
    </div>
  );
};

export default FriendsDashboard;

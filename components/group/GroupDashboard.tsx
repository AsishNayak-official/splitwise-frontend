"use client";
import { getGroupDetails } from "@/api/groupApi";
import Credit from "@/components/common/Credit";
import Debt from "@/components/common/Debt";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SplitHistory from "./SplitHistory";
import { IGroupActivity } from "@/lib/types/group.types";
import { IOwe } from "@/lib/types/user.types";
import AddGroupExpense from "./AddGroupExpense";

interface GroupDashboardProps {
  groupId: string;
}

const GroupDashboard = ({ groupId }: GroupDashboardProps) => {
  const [transactionHistory, setTransactionHistory] = useState<
    IGroupActivity[]
  >([]);
  const [youOwe, setYouOwe] = useState<IOwe[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [youAreOwed, setYouAreOwed] = useState<IOwe[]>([]);
  const [groupTotal, setGroupTotal] = useState<number>(0);
  useEffect(() => {
    getGroupDetails(groupId)
      .then((res) => {
        setYouOwe(res?.youOwe ?? []);
        setGroupName(res?.group?.name ?? "");
        setYouAreOwed(res?.youAreOwed ?? []);
        setTransactionHistory(res?.history ?? []);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const totalOwe = youOwe.reduce((sum, item) => sum + item.netAmount, 0);
    const totalOwed = youAreOwed.reduce((sum, item) => sum + item.netAmount, 0);

    const fetchTtotal = () => {
      setGroupTotal(totalOwed - totalOwe);
    };
    fetchTtotal();
  }, [youOwe, youAreOwed]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <span>{groupName}</span>
          <AddGroupExpense groupId={groupId} groupName={groupName}/>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <Debt youOwe={youOwe} groupId={groupId} />
          <Credit youAreOwed={youAreOwed} groupId={groupId} />
        </div>
        <div>
          <SplitHistory
            transactionHistory={transactionHistory}
            groupTotal={groupTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;

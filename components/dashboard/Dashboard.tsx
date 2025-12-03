"use client"
import { useEffect, useState } from "react";
import Credit from "../common/Credit";
import Debt from "../common/Debt";
import RecentActivity from "./RecentActivity";
import { Button } from "../ui/button";
import { dashboardStatus, recentActivity } from "@/api/dashboardApi";
import SplitNewExpense from "./SplitNewExpense";
import { IOwe, IRecentActivity } from "@/lib/types/user.types";
import { useAppSelector } from "@/redux/hooks/redux.hooks";



const Dashboard = () => {
  const [activity, setActivity] = useState<IRecentActivity[]>([]);
  const [youOwe, setYouOwe] = useState<IOwe[]>([]);
  const [youAreOwed, setYouAreOwed] = useState<IOwe[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dashboardStatus()
      .then((res) => {
        setYouOwe(res?.youOwe ?? []);
        setYouAreOwed(res?.youAreOwed ?? []);
      })
      .catch((err) => {});

    recentActivity()
      .then((res) => {
        setActivity(res ?? []);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <span>Dashboard {user?.name}</span>
        <SplitNewExpense/>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        <Debt youOwe={youOwe} />
        <Credit youAreOwed={youAreOwed} />
      </div>
      <div>
        <RecentActivity activity={activity}/>
      </div>
    </div>
  );
};

export default Dashboard;

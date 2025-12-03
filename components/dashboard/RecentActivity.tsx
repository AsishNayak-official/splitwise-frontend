import React, { act } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { formatDate } from "@/lib/constants/utility";
import { IRecentActivity } from "@/lib/types/user.types";

interface RecentActivityProps {
  activity: IRecentActivity[];
}

const RecentActivity = ({ activity }: RecentActivityProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
       <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-[25vh] overflow-y-auto">
        {activity.length === 0 ? (
          <div className="text-xs text-muted-foreground col-span-full">
            No recent activity yet.
          </div>
        ) : (
          activity.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row gap-1 border rounded-2xl px-3 py-2 items-center h-fit"
            >
              <div className="text-white bg-gray-400 rounded-full p-1.5">
                <Users className="w-4 h-4" />
              </div>

              <div className="w-full">
                <div className="flex flex-row justify-between font-semibold">
                  <span>{item.actor.name??"unknown user"}</span>
                  <span>₹{item.amount.toFixed(2)}</span>
                </div>

                <div className="flex flex-row justify-between text-xs">
                  {item?.group?.name ?<CardDescription>
                    in {item.group.name ?? ""}
                    {item.type === "settlement" && " (settled)"}
                  </CardDescription> : <span>Settlement</span>}

                  <CardDescription>
                    {formatDate(item.createdAt)}
                  </CardDescription>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

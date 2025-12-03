"use client";

import dayjs from "dayjs";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAppSelector } from "@/redux/hooks/redux.hooks";
import { IGroupActivity } from "@/lib/types/group.types";

interface SplitHistoryProps {
  transactionHistory: IGroupActivity[];
  groupTotal: number;
}

const SplitHistory = ({
  transactionHistory,
  groupTotal,
}: SplitHistoryProps) => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id || "");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Split History</CardTitle>
        <CardAction className="font-semibold">
          {groupTotal >= 0 ? (
            <span className="text-green-600">₹{groupTotal.toFixed(2)}</span>
          ) : (
            <span className="text-red-600">
              -₹{Math.abs(groupTotal).toFixed(2)}
            </span>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-[25vh] overflow-y-auto  auto-rows-max">
        {transactionHistory.length === 0 && (
          <div className="text-xs text-muted-foreground">No activity yet.</div>
        )}
  
        {transactionHistory.map((item) => {
          const dateObj = dayjs(item.createdAt);
          const formattedDay = dateObj.format("DD");
          const formattedMonth = dateObj.format("MMM");
          const iAmPayer = (item?.paidBy?._id ?? "") === currentUserId;
          const participant = item.participants?.find(
            (p) => p.user === currentUserId
          );
          const userShare = participant?.share ?? 0;

          const statusLabel = iAmPayer ? "You get back" : "You owe";

          return (
            <div
              key={item._id}
              className="flex flex-row gap-2 border rounded-2xl px-3 py-2 items-center h-fit overflow-hidden"
            >
              {/* Date */}
              <div className="border rounded-sm bg-gray-300 p-1.5 flex flex-col items-center justify-center text-xs">
                <span>{formattedDay}</span>
                <span>{formattedMonth}</span>
              </div>

              {/* Details */}
              <div className="w-full">
                <div className="flex flex-row justify-between">
                  <span className="text-xs font-medium truncate max-w-[60%]">
                    {item.description}
                  </span>
                  <span
                    className={`text-xs ${
                      iAmPayer ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>

                <div className="flex flex-row justify-between">
                  <CardDescription className="text-xs">
                    {iAmPayer
                      ? `You paid ₹${item.totalAmount}`
                      : `${item?.paidBy?.name} paid ₹${item?.totalAmount}`}
                  </CardDescription>

                  <span
                    className={`text-sm font-semibold ${
                      iAmPayer ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{userShare}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SplitHistory;

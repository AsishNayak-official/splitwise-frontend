"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";
import { IOwe } from "@/lib/types/user.types";
import { usePathname, useRouter } from "next/navigation";
import { markFriendReceivedInGroup } from "@/api/groupApi";
import { markFriendReceived } from "@/api/friendsApi";

interface CreditProps {
  youAreOwed: IOwe[];
  groupId?: string;
}

const Credit = ({ youAreOwed,groupId }: CreditProps) => {
  const totalOwed = youAreOwed.reduce((sum, item) => sum + item.netAmount, 0);
    const handleSettlement = async (friendId:string) => {
      try {
        if (groupId) {
          await markFriendReceivedInGroup(groupId, friendId);
        } else {
          await markFriendReceived(friendId);
        }
  
         window.location.reload();
  
      } catch (err) {
        console.error("Payment failed:", err);
      }
  
    }
  return (
    <Card className="w-full bg-green-200">
      <CardHeader>
        <CardTitle>You are owed</CardTitle>
        <CardAction className="font-semibold">
          ₹{totalOwed.toFixed(2)}
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm h-[20vh] overflow-y-auto">
        {youAreOwed.length === 0 ? (
          <div className="text-xs text-gray-700">You are owed nothing 🎉</div>
        ) : (
          youAreOwed.map((item, idx) => (
            <div key={item.friendId}>
              <div className="flex flex-row justify-between font-semibold group">
                <span>{item.friendName}</span>
                <div className="flex flex-row items-center gap-2 group">
                  <span>₹{item.netAmount}</span>
                  <Badge onClick={()=>{handleSettlement(item.friendId)}}  className="ml-2 hidden group-hover:flex cursor-pointer">
                    Mark as recieved
                  </Badge>
                </div>
              </div>

              <div className="flex flex-row justify-between">
                  <CardDescription
                    className="text-xs max-w-[50%] truncate"
                    title={item.groups?.join(", ")}
                  >
                    {item.groups?.join(", ")}
                  </CardDescription>

                <CardDescription className="text-xs">
                  {/* TODO: Use actual date from API */}
                  {dayjs(item.date).format("MMM D")}
                </CardDescription>
              </div>

              {idx < youAreOwed.length - 1 && (
                <Separator className="my-3 w-[70%]" />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Credit;

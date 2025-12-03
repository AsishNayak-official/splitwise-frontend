"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOwe } from "@/lib/types/user.types";
import dayjs from "dayjs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { payFriend } from "@/api/friendsApi";
import { payFriendInGroup } from "@/api/groupApi";
import { usePathname, useRouter } from "next/navigation";

interface DebtProps {
  youOwe: IOwe[];
  groupId?: string;
}

const Debt = ({ youOwe,groupId }: DebtProps) => {
  const totalOwe = youOwe.reduce((sum, item) => sum + item.netAmount, 0);
  const router = useRouter();
  const pathname = usePathname();

  const handlePay = async (friendId:string) => {
    try {
      if (groupId) {
        await payFriendInGroup(groupId, friendId);
      } else {
        await payFriend(friendId);
      }

      window.location.reload();

    } catch (err) {
      console.error("Payment failed:", err);
    }

  }

  return (
    <Card className="w-full bg-red-200">
      <CardHeader>
        <CardTitle>You owe</CardTitle>
        <CardAction className="font-semibold">
          ₹{totalOwe.toFixed(2)}
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm h-[20vh] overflow-y-auto">
        {youOwe.length === 0 ? (
          <div className="text-xs text-gray-700">You owe nothing 🎉</div>
        ) : (
          youOwe.map((item, idx) => (
            <div key={item.friendId}>
              <div className="flex flex-row justify-between font-semibold group">
                <span>{item.friendName}</span>
                <div className="flex flex-row items-center gap-2 group">
                  <span>₹{item.netAmount}</span>
                  <Badge  onClick={()=>{handlePay(item.friendId)}} className="ml-2 hidden group-hover:flex cursor-pointer">
                    Pay now
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

              {idx < youOwe.length - 1 && (
                <Separator className="my-3 w-[70%]" />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Debt;

import React from "react";
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

const RecentActivity = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-[25vh] overflow-y-auto">
          <div className="flex flex-row gap-1 border rounded-2xl px-3 py-2 items-center h-fit">
            <div className="border rounded-full bg-gray-300 p-1.5">
              <Users />
            </div>
            <div className="w-full">
              <div className="flex flex-row justify-between font-semibold">
                <span>Brian</span>
                <span>$16.75</span>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription className="text-xs">
                  in Family Group
                </CardDescription>
                <CardDescription className="text-xs">Apr 20</CardDescription>
              </div>
            </div>
          </div>                 
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

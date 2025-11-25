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

const Debt = () => {
  const [isGroup, setIsGroup] = useState(true);
  return (
    <Card className="w-full bg-red-200">
      <CardHeader>
        <CardTitle>You owe</CardTitle>
        <CardAction className="font-semibold">$20.53</CardAction>
      </CardHeader>
      <CardContent className="text-sm h-[20vh] overflow-y-auto">
        <div className="flex flex-row justify-between font-semibold">
          <span>Brian</span>
          <div className="flex flex-row items-center gap-2 group">
            <span>$16.75</span>
            <Badge className="ml-2 hidden group-hover:flex">Pay now</Badge>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          {isGroup ? (
            <></>
          ) : (
            <CardDescription className="text-xs">
              in Family Group, and 2 more
            </CardDescription>
          )}
          <CardDescription className="text-xs">Apr 20</CardDescription>
        </div>
        <Separator className="my-3 w-[70%]" />
      </CardContent>
    </Card>
  );
};

export default Debt;

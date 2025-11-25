import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

const Credit = () => {
  return (
   <Card className="w-full bg-green-200">
      <CardHeader>
        <CardTitle>You are owed</CardTitle>
        <CardAction className="font-semibold">$20.53</CardAction>
      </CardHeader>
      <CardContent className="text-sm h-[20vh] overflow-y-auto">
        <div className="flex flex-row justify-between font-semibold">
            <span>Brian</span>
            <span>$16.75</span>
        </div>
        <div className="flex flex-row justify-between">
            <CardDescription className="text-xs">in Family Group</CardDescription>
            <CardDescription className="text-xs">Apr 20</CardDescription>
        </div>
        <Separator className="my-3 w-[70%]"/>
      </CardContent>
    </Card>
  );
};

export default Credit;

import Credit from "@/components/common/Credit";
import Debt from "@/components/common/Debt";
import RecentActivity from "@/components/common/RecentActivity";
import { Button } from "@/components/ui/button";

const GroupDashboard = () => {
  return (
    <div>
      <span>Group X</span>
      <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        <Debt />
        <Credit />
      </div>
      <div className="flex flex-col gap-y-4 w-[70%] sm:gap-y-0 sm:w-auto sm:flex-row mx-auto gap-x-4">
        <Button variant="outline" className="rounded-full">7064151157@ybl</Button>
        <Button variant="outline" className="rounded-full">Add friends</Button>
        <Button variant="outline" className="rounded-full">Create new group</Button>
        <Button variant="outline" className="rounded-full">Split new expense</Button>
      </div>
      <div>
        <RecentActivity />
      </div>
    </div>
    </div>
  );
}

export default GroupDashboard;

import Credit from "@/components/common/Credit";
import Debt from "@/components/common/Debt";
import RecentActivity from "@/components/common/RecentActivity";
import { Button } from "@/components/ui/button";

const GroupDashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <span>Group X</span>
          <Button variant="outline" className="rounded-full">
            New expense
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <Debt />
          <Credit />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;

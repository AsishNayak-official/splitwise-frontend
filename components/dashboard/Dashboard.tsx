import Credit from "../common/Credit";
import Debt from "../common/Debt";
import RecentActivity from "../common/RecentActivity";
import { Button } from "../ui/button";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <span>Dashboard</span>
        <Button variant="outline" className="rounded-full">
          Split new expense
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
  );
};

export default Dashboard;

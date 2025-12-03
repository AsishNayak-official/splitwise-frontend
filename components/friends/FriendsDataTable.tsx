import { payFriend } from "@/api/friendsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks/redux.hooks";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

const FriendsDataTable = () => {
  const friendDetails = useAppSelector((state) => state.friend.friends);
  const router = useRouter();
  const pathname = usePathname();
  const handlePay = async (friendId: string) => {
    try {
      await payFriend(friendId);

       window.location.reload();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Friend</TableHead>
          <TableHead>You owe</TableHead>
          <TableHead>Owes you</TableHead>
          <TableHead className="text-right">Net</TableHead>
          <TableHead className="text-right">Last activity</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {friendDetails.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-sm text-muted-foreground"
            >
              No friends yet.
            </TableCell>
          </TableRow>
        ) : (
          friendDetails.map((friend) => {
            const net = friend.youAreOwed - friend.youOwe;

            return (
              <TableRow key={friend.id}>
                <TableCell className="font-medium">{friend.name}</TableCell>

                <TableCell className={friend.youOwe > 0 ? "text-red-600" : ""}>
                  {friend.youOwe ? `₹${friend.youOwe.toFixed(2)}` : "-"}
                </TableCell>

                <TableCell
                  className={friend.youAreOwed > 0 ? "text-green-600" : ""}
                >
                  {friend.youAreOwed ? `₹${friend.youAreOwed.toFixed(2)}` : "-"}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  {net === 0 ? (
                    "-"
                  ) : net > 0 ? (
                    <span className="text-green-600">₹{net.toFixed(2)}</span>
                  ) : (
                    <span className="text-red-600">
                      -₹{Math.abs(net).toFixed(2)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right text-xs">
                  {friend.lastActivityAt
                    ? dayjs(friend.lastActivityAt).format("DD MMM YYYY")
                    : "—"}
                </TableCell>

                <TableCell className="text-right text-xs font-medium">
                  {net > 0 ? (
                    <button className="text-green-600 hover:underline">
                      Mark as received
                    </button>
                  ) : net < 0 ? (
                    <button
                      onClick={() => {
                        handlePay(friend.id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Pay
                    </button>
                  ) : (
                    <span className="text-gray-400">Settled</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default FriendsDataTable;

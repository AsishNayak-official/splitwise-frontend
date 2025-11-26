import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FriendsDataTable = () => {
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
        <TableRow>
          <TableCell className="font-medium">Aman</TableCell>
          <TableCell>10</TableCell>
          <TableCell>20</TableCell>
          <TableCell className="text-right">+10</TableCell>
          <TableCell className="text-right">yesterday</TableCell>
          <TableCell className="text-right">pay/mark as received</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default FriendsDataTable;

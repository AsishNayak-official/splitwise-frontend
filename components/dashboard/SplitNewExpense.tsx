import { createExpenseWithNewGroup } from "@/api/dashboardApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExpenseFormValues,
  expenseSchema,
} from "@/lib/validations/newExpense.validation";
import { useAppSelector } from "@/redux/hooks/redux.hooks";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";

const SplitNewExpense = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const friendList = useAppSelector((state) => state.friend.friendList);
  const router = useRouter();
  const pathname = usePathname();
  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      groupName: "",
      description: "",
      totalAmount: 0,
      paidBy: "",
      participants: [
        { userId: "", share: 0 }, // at least one row
      ],
    },
    validate: (values) => {
      const result = expenseSchema.safeParse(values);
      if (result.success) return {};
      const errors: FormikErrors<ExpenseFormValues> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ExpenseFormValues;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitError(null);
      try {
        // TODO: call your API here, e.g.
        await createExpenseWithNewGroup(
          values.groupName,
          values.description,
          values.totalAmount,
          values.paidBy,
          values.participants
        );
        resetForm();
         window.location.reload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setSubmitError(err.message || "Failed to create expense");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAddParticipant = () => {
    formik.setFieldValue("participants", [
      ...formik.values.participants,
      { userId: "", share: 0 },
    ]);
  };

  const handleRemoveParticipant = (index: number) => {
    const updated = [...formik.values.participants];
    updated.splice(index, 1);
    formik.setFieldValue("participants", updated);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Split New Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Split New Expense</DialogTitle>
            <DialogDescription>
              Add a new expense, set who paid and the total amount.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            {/* Group Name */}
            <div className="grid gap-2">
              <Label htmlFor="groupName">Group name</Label>
              <Input
                id="groupName"
                name="groupName"
                placeholder="Goa Trip"
                value={formik.values.groupName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.groupName && formik.errors.groupName && (
                <p className="text-xs text-red-600">
                  {formik.errors.groupName}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="club, dinner, tickets..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Total Amount */}
            <div className="grid gap-2">
              <Label htmlFor="totalAmount">Total amount (₹)</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                min={0}
                value={formik.values.totalAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalAmount && formik.errors.totalAmount && (
                <p className="text-xs text-red-600">
                  {formik.errors.totalAmount}
                </p>
              )}
            </div>

            {/* Paid By - dropdown using friendList */}
            <div className="grid gap-2">
              <Label htmlFor="paidBy">Paid by</Label>
              <Select
                value={formik.values.paidBy}
                onValueChange={(val) => formik.setFieldValue("paidBy", val)}
              >
                <SelectTrigger id="paidBy">
                  <SelectValue placeholder="Select who paid" />
                </SelectTrigger>
                <SelectContent>
                  {friendList.map((f) => (
                    <SelectItem key={f.friendId} value={f.friendId}>
                      {f.friendName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.paidBy && formik.errors.paidBy && (
                <p className="text-xs text-red-600">{formik.errors.paidBy}</p>
              )}
            </div>

            {/* Participants - dynamic rows */}
            <div className="grid gap-2">
              <Label>Participants</Label>
              <div className="space-y-2">
                {formik.values.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1fr_auto] gap-2 items-center"
                  >
                    <Select
                      value={participant.userId}
                      onValueChange={(val) =>
                        formik.setFieldValue(
                          `participants[${index}].userId`,
                          val
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select friend" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectContent>
                          {friendList
                            .filter(
                              (f) =>
                                !formik.values.participants.some(
                                  (p, i) =>
                                    p.userId === f.friendId && i !== index
                                )
                            )
                            .map((f) => (
                              <SelectItem key={f.friendId} value={f.friendId}>
                                {f.friendName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      min={0}
                      value={participant.share}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `participants[${index}].share`,
                          Number(e.target.value)
                        )
                      }
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveParticipant(index)}
                      disabled={formik.values.participants.length === 1}
                    >
                      ✕
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddParticipant}
                  className="mt-1"
                >
                  + Add friend
                </Button>

                {formik.errors.participants && (
                  <p className="text-xs text-red-600">
                    {typeof formik.errors.participants === "string"
                      ? formik.errors.participants
                      : "Please check participants and their shares."}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Sum of all shares must equal the total amount.
                </p>
              </div>
            </div>

            {submitError && (
              <p className="text-xs text-red-600">{submitError}</p>
            )}

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={formik.isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Saving..." : "Save expense"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SplitNewExpense;

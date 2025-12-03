import { z } from "zod";

export const expenseSchema = z
  .object({
    groupName: z.string().min(1, "Group name is required"),
    description: z.string().min(1, "Description is required"),
    totalAmount: z.coerce
      .number({
        error: "Total amount must be a number",
      })
      .positive("Total amount must be greater than 0"),
    paidBy: z.string().min(1, "Paid by is required"),

    participants: z
      .array(
        z.object({
          userId: z.string().min(1, "Select a friend"),
          share: z.coerce
            .number({
              error: "Share must be a number",
            })
            .positive("Share must be greater than 0"),
        })
      )
      .min(1, "Add at least one participant"),
  })
  .superRefine((data, ctx) => {
    const totalShares = data.participants.reduce(
      (sum, p) => sum + (Number.isNaN(p.share) ? 0 : p.share),
      0
    );

    if (data.totalAmount > 0 && totalShares !== data.totalAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Sum of shares (₹${totalShares}) must equal total amount (₹${data.totalAmount}).`,
        path: ["participants"], // general error for participants section
      });
    }
  });

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

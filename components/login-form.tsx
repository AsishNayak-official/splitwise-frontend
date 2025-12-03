"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/api/authApi";
import { z } from "zod";
import { useFormik, FormikErrors } from "formik";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof LoginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const result = LoginSchema.safeParse(values);
      if (result.success) return {};
      const errors: FormikErrors<FormValues> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormValues;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await LoginUser(values.email, values.password);
        if (data.token) {
          localStorage.setItem("AccessToken", data.token);
        }
        router.replace("/dashboard");
      } catch (err) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <FieldDescription className="text-red-600 text-xs">
                    {formik.errors.email}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                />
                {formik.touched.password && formik.errors.password && (
                  <FieldDescription className="text-red-600 text-xs">
                    {formik.errors.password}
                  </FieldDescription>
                )}{" "}
              </Field>
              <Field>
                <Button type="submit" disabled={formik.isSubmitting}>
                  {" "}
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

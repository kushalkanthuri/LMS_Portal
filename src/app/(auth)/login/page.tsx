"use client";

import { loginUser } from "@/actions/auth";
import { Button } from "@/elements/button";
import { Input } from "@/elements/input";
import { Label } from "@/elements/label";
import { type LoginSchema, loginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: LoginSchema) => {
    const result = await loginUser(data);
    if (result.success) {
      toast.success("Logged in successfully!");
      router.replace(result.redirect)
    } else {
      toast.error(result.error, { duration: 5000 });
    }
  };

  return (
    <section className="flex flex-col gap-10 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <h1 className="font-poppins text-2xl font-semibold">Login</h1>
        <p className="font-roboto text-sm opacity-90">
          Fill in your credentials to access your account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <Label htmlFor="email" className="pl-1 pb-2">
            Email
          </Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm pl-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="password" className="pl-1 pb-2">
            Password
          </Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="must be at least 8 characters"
          />
          {errors.password && (
            <p className="text-red-500 text-sm pl-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" isLoading={isSubmitting} className="mt-4">
          Login
        </Button>
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
      </form>
    </section>
  );
}

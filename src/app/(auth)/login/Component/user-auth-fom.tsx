"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const UserAuthForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (values: z.infer<typeof schema>) => {
    setLoading(true);

    const { email, password } = values;

    const response = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/pos-coordinator",
    });

    if (response?.status === 200) {
      reset();
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <form
          className="flex flex-col  gap-3 "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs">{errors?.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          {errors?.password && (
            <p className="text-red-500 text-xs">{errors?.password.message}</p>
          )}

          <button className="uppercase  bg-gradient-to-tr from-green-600 to bg-green-400 py-2 px-3 md:px-6 md:py-4 text-black font-bold rounded-3xl">
            {loading ? <span>Loading</span> : <span>SignIn</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAuthForm;

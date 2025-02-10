"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email({ message: "Invalid email!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const UserAuthForm = () => {
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
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.password.message}
              </p>
            )}
          </div>
          <Button
            className="flex justify-center items-center gap-2 bg-green-600  transition text-white font-bold py-6 px-6 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserAuthForm;

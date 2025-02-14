"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Invalid email!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const UserAuthForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
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
    try {
      const { email, password } = values;

      const response = await signIn("credentials", {
        redirect: false,

        email,
        password,
      });

      if (response?.error) {
        setError("Email or Password is incorrect");
      } else {
        reset();
        console.log("Sign-in successful");
        router.push("/pos-coordinator");
      }
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src={"/et-logo-text.png"}
            width={150}
            height={150}
            alt="logo"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          VTS
        </h2>

        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <Label className="text-gray-400">Email</Label>
            <Input {...register("email")} placeholder="Email" className="p-5" />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.email.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-5"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.password.message}
              </p>
            )}
          </div>
          <Button disabled={loading} className="p-5">
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <p className="text-sm text-red-500 mt-4">{error && error}</p>
      </div>
    </div>
  );
};

export default UserAuthForm;

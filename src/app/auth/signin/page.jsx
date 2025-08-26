"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      // This will redirect to Google OAuth
      await signIn("google", {
        callbackUrl: "/", // Redirect after successful login
        email: values.email, // Pass email as parameter (though Google OAuth may ignore this)
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <Card className="p-2 md:p-4 pb-3 md:pb-6 shadow-xl rounded-sm border-0">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              SignIn
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to continue to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-3 md:px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="h-12"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Redirecting..." : "Continue with Email"}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-12 flex cursor-pointer overflow-hidden items-center justify-center gap-3 group"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5 lg:translate-y-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </Button>

            <div className="text-center text-sm text-gray-600 mt-2">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-center items-center">
            <div className="text-center text-sm text-gray-600">
              Don't want to create account?{" "}
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="/"
              >
                Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

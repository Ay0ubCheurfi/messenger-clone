"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/users");
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      await axios
        .post("/api/register", data)
        .then(
          async () => {
            toast.success("Registration successful");
            await signIn("credentials", data);
          },
          (error) => toast.error(`${error}`)
        )
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      setIsLoading(true);
      const user = await signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok && !callback?.error) {
            toast.success(`Logged in as ${data.email}`);
            router.push("/users");
          }
          if (callback?.error) toast.error(`${callback?.error}`);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.ok && !callback?.error) toast.success(`Logged in`);
        if (callback?.error) toast.error(`${callback?.error}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
      mt-8
      px-4
      sm:px-0
      sm:mx-auto
      sm:w-full
      sm:max-w-md
      sm:mt-10
    "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          duration-300
          rounded-md
          sm:rounded-lg
          sm:px-8  
          shadow-2xl
          shadow-blue-200
          border-[1px]
          border-blue-100
          "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="name"
              register={register}
              errors={errors}
              required
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            type="email"
            label="Email address"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="Password"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {variant === "REGISTER" ? "Register" : "Sign-in"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
            absolute
            inset-0
            flex
            items-center
            "
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white text-xs text-gray-400 px-2">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              disabled={isLoading}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              disabled={isLoading}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
        flex
        gap-2
        justify-center
        text-xs
        mt-6
        px-2
        text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account ?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "register" : "sign-in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

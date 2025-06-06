"use client";
import { UserProps } from "@/types/types";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUser } from "@/actions/users";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../FormInputs/PasswordInput";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";
import Logo from "../global/Logo";
import { Button } from "../ui/button";


export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserProps>();
  const router = useRouter();
  async function onSubmit(data: UserProps) {
    setLoading(true);
    data.name = `${data.firstName} ${data.lastName}`;
    data.image =
      "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png";
    try {
      const res = await createUser(data);
      if (res.status === 409) {
        setLoading(false);
        setEmailErr(res.error);
      } else if (res.status === 200) {
        setLoading(false);
        toast.success("Account Created successfully");
        router.push("/login");
      } else {
        setLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong, try again");
    }
  }
  return (
    <div className="w-full py-5 lg:px-8 px-6">
      <div className="">
        <Logo />
        <div className="py-4 text-gray-900">
          <h2 className="text-xl lg:text-2xl font-bold leading-9 tracking-tight  ">
            Create an account
          </h2>
          <p className="text-xs">Join Us, fill in details to login</p>
        </div>
      </div>
      <div className="">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <TextInput
              register={register}
              errors={errors}
              label="First Name"
              name="firstName"
              icon={User}
              placeholder="first Name"
            />
          </div>
          <div className="w-full">
            <TextInput
              register={register}
              errors={errors}
              label="Last Name"
              name="lastName"
              icon={User}
              placeholder="last Name"
            />
          </div>
          <div className="w-full">
            <div className="">
              <TextInput
                type="email"
                register={register}
                errors={errors}
                label="Email Address"
                name="email"
                icon={Mail}
                placeholder="email"
              />
              {emailErr && (
                <p className="text-red-500 text-xs mt-2">{emailErr}</p>
              )}
            </div>
          </div>

          <PasswordInput
            register={register}
            errors={errors}
            label="Password"
            name="password"
            icon={Lock}
            placeholder="password"
            type="password"
          />
          <div>
            <SubmitButton
              title="Sign Up"
              loadingTitle="Creating Please wait.."
              loading={loading}
              className="w-full"
              loaderIcon={Loader2}
              showIcon={false}
            />
          </div>
        </form>

        <div className="flex items-center py-4 justify-center space-x-1 text-slate-900">
          <div className="h-[1px] w-full bg-slate-200"></div>
          <div className="uppercase">Or</div>
          <div className="h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="w-full">
          <Button
            onClick={() => signIn("google")}
            variant={"outline"}
            className="w-full"
          >
            <FaGoogle className="mr-2 w-6 h-6 text-red-500" />
            Signup with Google
          </Button>
        </div>

        <p className="mt-6 text-left text-sm text-gray-500">
          Alrealy Registered ?{" "}
          <Link href="/login" className="font-semibold leading-6 text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

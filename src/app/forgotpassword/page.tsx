"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [forgotPass, setForgotPass] = useState({ newpassword: "", email: "" });

  const onPass = async () => {
    try {
      await axios.post("/api/users/forgotpassword", forgotPass);
      toast.success("Password changed successfully");
      alert("password Changed...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen flex-col gap-2 justify-center items-center">
      <h1>FORGOT PASSWORD</h1>
      <label htmlFor="forgotpassword">
        Email you want to change the password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="password"
        onChange={(e) =>
          setForgotPass({ ...forgotPass, email: e.target.value })
        }
        value={forgotPass.email}
        type="email"
        placeholder="Email"
      />
      <label htmlFor="forgotpassword">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="password"
        onChange={(e) =>
          setForgotPass({ ...forgotPass, newpassword: e.target.value })
        }
        value={forgotPass.newpassword}
        type="text"
        placeholder="New Password"
      />
      <button
        onClick={onPass}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white cursor-pointer"
      >
        Change Password
      </button>
      <Link href={"/login"}>Back to Login</Link>
    </div>
  );
}

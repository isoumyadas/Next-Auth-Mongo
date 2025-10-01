"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    const res = await axios.post("api/users/me");
    console.log("res::: ", res);
    setData(res.data.user._id);
  };

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-screen justify-center items-center">
      <h1>Profile Page</h1>
      <hr />
      <h2 className="bg-white text-black font-bold p-4">
        {data === "" ? (
          "No user data"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="border border-white p-3 hover:bg-amber-950"
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        className="border border-white p-3 hover:bg-blue-500"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}

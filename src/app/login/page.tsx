"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  // Creating state for user form details
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Creating state for button disable after user clicked on it
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Creating a loading state
  const [loading, setLoading] = useState(false);

  //
  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("login successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error onSignup: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for button : It should only be visible when user put all the fields.

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>{loading ? "Proccessing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
        type="email"
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
        type="password"
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white cursor-pointer"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <div className="flex gap-5">
        <Link className="hover:text-blue-400" href={"/signup"}>
          Visit signup page
        </Link>
        <Link className="hover:text-red-400" href={"/forgotpassword"}>
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

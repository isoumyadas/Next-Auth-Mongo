"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  // Creating state for user form details
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Creating state for button disable after user clicked on it
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Creating a loading state
  const [loading, setLoading] = useState(false);

  //
  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("SingedIn successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error onSignup: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for button : It should only be visible when user put all the fields.

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>{loading ? "Proccessing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
        type="text"
        placeholder="username"
      />
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
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white cursor-pointer"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href={"/login"}>Visit login page</Link>
    </div>
  );
}

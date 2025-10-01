"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState<string | null>("");
  const [verified, setVerified] = useState<boolean | null>(false);
  const [error, setError] = useState<boolean | null>(false);

  const searchParams = useSearchParams();

  const verifyUserEmail = async () => {
    try {
      setError(false);
      const res = await axios.post("/api/users/verifyemail", { token });
      console.log("res", res);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // The JS approach
    // const urlToken = window.location.search.split("=")[1]
    // setToken(urlToken || "")

    // The Next JS approach
    const urlToken = searchParams.get("token");
    setToken(urlToken);
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <button className="border border-white p-3" onClick={verifyUserEmail}>
        Verify Email
      </button>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div>
          <h2>{`You're Verified!`}</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error to hai</h2>
        </div>
      )}
    </div>
  );
}

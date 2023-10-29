"use client";

import { useRouter } from "next/navigation";
import { logoutApi } from "@/domain/auth/api/client";

export const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    logoutApi().then(() => {
      router.push("/");
      router.refresh();
    });
  };

  return (
    <div>
      <button className="underline text-blue-500" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

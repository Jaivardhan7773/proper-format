"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";

export default function GuestGuard({ children, loadingUI = null }) {
  const router = useRouter();
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) return loadingUI || <div style={{ padding: 24 }}>Checking auth…</div>;

  if (user) {
    router.replace("/"); // already logged in → go home
    return null;
  }

  return <>{children}</>;
}

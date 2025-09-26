"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";

export default function AuthGuard({ children, loadingUI = null }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // fires once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) return loadingUI || <div style={{ padding: 24 }}>Checking auth…</div>;

  if (!user) {
    router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
    return null; // prevent flash
  }

  return <>{children}</>;
}

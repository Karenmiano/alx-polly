"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { AuthService } from "@/lib/auth/auth-utils";
import type { AuthFormData } from "@/types";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: AuthFormData) => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.login(data.email, data.password);
      router.push("/polls"); // Redirect to polls page after successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
            {error}
          </div>
        )}
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
}

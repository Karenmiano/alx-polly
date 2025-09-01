"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthService } from "@/lib/auth/auth-utils";
import type { AuthFormData } from "@/types";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (data: AuthFormData) => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.register({
        email: data.email,
        password: data.password,
        username: data.username!,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      router.push("/polls"); // Redirect to polls page after successful registration
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
        <RegisterForm onSubmit={handleRegister} loading={loading} />
      </div>
    </div>
  );
}

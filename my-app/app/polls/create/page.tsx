"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreatePollForm } from "@/components/polls/create-poll-form";
import { PollService } from "@/lib/polls/poll-utils";
import { AuthService } from "@/lib/auth/auth-utils";
import type { CreatePollData } from "@/types";

export default function CreatePollPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleCreatePoll = async (data: CreatePollData) => {
    setLoading(true);
    setError(null);

    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const newPoll = await PollService.createPoll(data, user.id);
      router.push(`/polls/${newPoll.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Poll</h1>
        <p className="text-muted-foreground mt-2">
          Create a poll to gather opinions from the community
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <CreatePollForm onSubmit={handleCreatePoll} loading={loading} />
    </div>
  );
}

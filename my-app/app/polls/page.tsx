"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PollList } from "@/components/polls/poll-list";
import { Button } from "@/components/ui/button";
import { PollService } from "@/lib/polls/poll-utils";
import { AuthService } from "@/lib/auth/auth-utils";
import type { Poll } from "@/types";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      setLoading(true);
      const pollsData = await PollService.getAllPolls();
      setPolls(pollsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load polls");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: string, optionIds: string[]) => {
    try {
      const user = AuthService.getCurrentUser();
      await PollService.vote(pollId, optionIds, user?.id);

      // Refresh polls to get updated vote counts
      await loadPolls();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to vote");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadPolls}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Polls</h1>
          <p className="text-muted-foreground mt-2">
            Discover and participate in community polls
          </p>
        </div>
        <Link href="/polls/create">
          <Button>Create Poll</Button>
        </Link>
      </div>

      <PollList
        polls={polls}
        loading={loading}
        onVote={handleVote}
        showSearch={true}
        showFilters={true}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PollCard } from "@/components/polls/poll-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PollService,
  generatePollUrl,
  canUserVote,
} from "@/lib/polls/poll-utils";
import { AuthService } from "@/lib/auth/auth-utils";
import type { Poll } from "@/types";

export default function PollDetailPage() {
  const params = useParams();
  const pollId = params.id as string;

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (pollId) {
      loadPoll();
    }
  }, [pollId]);

  const loadPoll = async () => {
    try {
      setLoading(true);
      const pollData = await PollService.getPollById(pollId);
      if (!pollData) {
        setError("Poll not found");
        return;
      }
      setPoll(pollData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load poll");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: string, optionIds: string[]) => {
    if (!poll) return;

    setVoting(true);
    try {
      const user = AuthService.getCurrentUser();
      await PollService.vote(pollId, optionIds, user?.id);

      // Refresh poll to get updated vote counts
      await loadPoll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to vote");
    } finally {
      setVoting(false);
    }
  };

  const handleShare = async () => {
    const url = generatePollUrl(pollId);

    if (navigator.share) {
      try {
        await navigator.share({
          title: poll?.title,
          text: poll?.description,
          url,
        });
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could show a toast notification here
      console.log("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "Poll not found"}</p>
          <Link href="/polls">
            <Button>Back to Polls</Button>
          </Link>
        </div>
      </div>
    );
  }

  const user = AuthService.getCurrentUser();
  const voteCheck = canUserVote(poll, !!user);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/polls">
          <Button variant="outline">← Back to Polls</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            Share Poll
          </Button>
          {poll.creatorId === user?.id && (
            <Link href={`/polls/${poll.id}/edit`}>
              <Button variant="outline">Edit Poll</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <PollCard
          poll={poll}
          showResults={true}
          onVote={voteCheck.canVote ? handleVote : undefined}
          isVoting={voting}
        />

        {!voteCheck.canVote && voteCheck.reason && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              {voteCheck.reason}
              {voteCheck.reason === "Authentication required" && (
                <>
                  {" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline"
                  >
                    Sign in to vote
                  </Link>
                </>
              )}
            </p>
          </div>
        )}

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-4">Poll Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Votes:</span>
              <p className="font-medium">{poll.totalVotes}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium">
                {new Date(poll.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Creator:</span>
              <p className="font-medium">
                {poll.creator?.username || "Anonymous"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant={poll.isActive ? "success" : "secondary"}
                className="ml-2"
              >
                {poll.isActive ? "Active" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

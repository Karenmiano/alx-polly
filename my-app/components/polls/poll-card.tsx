"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { timeAgo, calculatePercentage } from "@/lib/utils";
import type { Poll } from "@/types";

interface PollCardProps {
  poll: Poll;
  showResults?: boolean;
  onVote?: (pollId: string, optionIds: string[]) => void;
  isVoting?: boolean;
}

export function PollCard({
  poll,
  showResults = false,
  onVote,
  isVoting = false,
}: PollCardProps) {
  const hasVoted = poll.userVote && poll.userVote.optionIds.length > 0;
  const shouldShowResults = showResults || hasVoted;

  const handleVote = (optionId: string) => {
    if (onVote && !hasVoted && !isVoting) {
      onVote(poll.id, [optionId]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              <Link
                href={`/polls/${poll.id}`}
                className="hover:text-primary transition-colors"
              >
                {poll.title}
              </Link>
            </CardTitle>
            {poll.description && (
              <CardDescription>{poll.description}</CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant={poll.isActive ? "success" : "secondary"}>
              {poll.isActive ? "Active" : "Closed"}
            </Badge>
            {poll.requireAuth && <Badge variant="outline">Auth Required</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {poll.options.map((option) => {
            const percentage = calculatePercentage(
              option.voteCount,
              poll.totalVotes
            );
            const isSelected =
              hasVoted && poll.userVote?.optionIds.includes(option.id);

            return (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${isSelected ? "font-medium" : ""}`}
                  >
                    {option.text}
                  </span>
                  {shouldShowResults && (
                    <span className="text-sm text-muted-foreground">
                      {option.voteCount} votes ({percentage}%)
                    </span>
                  )}
                </div>

                {shouldShowResults ? (
                  <Progress
                    value={percentage}
                    className={`h-2 ${isSelected ? "ring-2 ring-primary" : ""}`}
                  />
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleVote(option.id)}
                    disabled={!poll.isActive || isVoting}
                  >
                    {isVoting ? "Voting..." : "Vote"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{poll.totalVotes} total votes</span>
            {poll.creator && <span>by {poll.creator.username}</span>}
          </div>
          <span>{timeAgo(poll.createdAt)}</span>
        </div>

        {poll.expiresAt && new Date(poll.expiresAt) > new Date() && (
          <div className="text-sm text-muted-foreground">
            Expires {timeAgo(poll.expiresAt)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

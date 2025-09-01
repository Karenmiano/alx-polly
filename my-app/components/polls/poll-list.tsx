"use client";

import { useState } from "react";
import { PollCard } from "./poll-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Poll } from "@/types";

interface PollListProps {
  polls: Poll[];
  loading?: boolean;
  onVote?: (pollId: string, optionIds: string[]) => void;
  showSearch?: boolean;
  showFilters?: boolean;
}

export function PollList({
  polls,
  loading = false,
  onVote,
  showSearch = true,
  showFilters = true,
}: PollListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");
  const [votingPollId, setVotingPollId] = useState<string | null>(null);

  const handleVote = async (pollId: string, optionIds: string[]) => {
    if (onVote) {
      setVotingPollId(pollId);
      try {
        await onVote(pollId, optionIds);
      } finally {
        setVotingPollId(null);
      }
    }
  };

  // Filter and search polls
  const filteredPolls = polls.filter((poll) => {
    const matchesSearch =
      poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poll.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && poll.isActive) ||
      (filter === "closed" && !poll.isActive);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(showSearch || showFilters) && (
        <div className="space-y-4">
          {showSearch && (
            <Input
              placeholder="Search polls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          )}

          {showFilters && (
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Polls
                <Badge variant="secondary" className="ml-2">
                  {polls.length}
                </Badge>
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active
                <Badge variant="secondary" className="ml-2">
                  {polls.filter((p) => p.isActive).length}
                </Badge>
              </Button>
              <Button
                variant={filter === "closed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("closed")}
              >
                Closed
                <Badge variant="secondary" className="ml-2">
                  {polls.filter((p) => !p.isActive).length}
                </Badge>
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {filteredPolls.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm || filter !== "all"
                ? "No polls match your criteria."
                : "No polls found."}
            </p>
          </div>
        ) : (
          filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onVote={handleVote}
              isVoting={votingPollId === poll.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

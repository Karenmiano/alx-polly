import { useState, useEffect } from "react";
import { PollService } from "@/lib/polls/poll-utils";
import type { Poll, CreatePollData } from "@/types";

export function usePolls() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const pollsData = await PollService.getAllPolls();
      setPolls(pollsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch polls");
    } finally {
      setLoading(false);
    }
  };

  const createPoll = async (pollData: CreatePollData, creatorId: string) => {
    const newPoll = await PollService.createPoll(pollData, creatorId);
    setPolls((prev) => [newPoll, ...prev]);
    return newPoll;
  };

  const vote = async (pollId: string, optionIds: string[], userId?: string) => {
    await PollService.vote(pollId, optionIds, userId);
    // Refresh polls to get updated vote counts
    await fetchPolls();
  };

  return {
    polls,
    loading,
    error,
    fetchPolls,
    createPoll,
    vote,
  };
}

export function usePoll(pollId: string) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pollId) {
      fetchPoll();
    }
  }, [pollId]);

  const fetchPoll = async () => {
    setLoading(true);
    setError(null);
    try {
      const pollData = await PollService.getPollById(pollId);
      setPoll(pollData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch poll");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (optionIds: string[], userId?: string) => {
    if (!poll) return;

    await PollService.vote(poll.id, optionIds, userId);
    // Refresh poll to get updated vote counts
    await fetchPoll();
  };

  return {
    poll,
    loading,
    error,
    fetchPoll,
    vote,
  };
}

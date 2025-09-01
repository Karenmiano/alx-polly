// Poll utility functions
import type { Poll, PollOption, Vote, CreatePollData } from "@/types";

// Mock data and functions - replace with actual API calls
export class PollService {
  private static polls: Poll[] = [
    {
      id: "1",
      title: "What's your favorite programming language?",
      description: "Help us understand the community's preferences",
      creatorId: "1",
      creator: {
        id: "1",
        email: "demo@example.com",
        username: "demo_user",
        firstName: "Demo",
        lastName: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      options: [
        {
          id: "1",
          pollId: "1",
          text: "JavaScript",
          votes: [],
          voteCount: 25,
          order: 1,
        },
        {
          id: "2",
          pollId: "1",
          text: "Python",
          votes: [],
          voteCount: 30,
          order: 2,
        },
        {
          id: "3",
          pollId: "1",
          text: "TypeScript",
          votes: [],
          voteCount: 20,
          order: 3,
        },
        {
          id: "4",
          pollId: "1",
          text: "Go",
          votes: [],
          voteCount: 15,
          order: 4,
        },
      ],
      isActive: true,
      allowMultipleVotes: false,
      requireAuth: false,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(),
      totalVotes: 90,
    },
    {
      id: "2",
      title: "Best time for team meetings?",
      description: "Let's find a time that works for everyone",
      creatorId: "1",
      creator: {
        id: "1",
        email: "demo@example.com",
        username: "demo_user",
        firstName: "Demo",
        lastName: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      options: [
        {
          id: "5",
          pollId: "2",
          text: "9:00 AM",
          votes: [],
          voteCount: 12,
          order: 1,
        },
        {
          id: "6",
          pollId: "2",
          text: "2:00 PM",
          votes: [],
          voteCount: 18,
          order: 2,
        },
        {
          id: "7",
          pollId: "2",
          text: "4:00 PM",
          votes: [],
          voteCount: 8,
          order: 3,
        },
      ],
      isActive: true,
      allowMultipleVotes: true,
      requireAuth: true,
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      updatedAt: new Date(),
      totalVotes: 38,
    },
  ];

  static async getAllPolls(): Promise<Poll[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.polls];
  }

  static async getPollById(id: string): Promise<Poll | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.polls.find((poll) => poll.id === id) || null;
  }

  static async createPoll(
    pollData: CreatePollData,
    creatorId: string
  ): Promise<Poll> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newPoll: Poll = {
      id: Math.random().toString(36).substr(2, 9),
      title: pollData.title,
      description: pollData.description,
      creatorId,
      creator: {
        id: creatorId,
        email: "demo@example.com",
        username: "demo_user",
        firstName: "Demo",
        lastName: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      options: pollData.options.map((text, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        pollId: "",
        text,
        votes: [],
        voteCount: 0,
        order: index + 1,
      })),
      isActive: true,
      allowMultipleVotes: pollData.allowMultipleVotes,
      requireAuth: pollData.requireAuth,
      expiresAt: pollData.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalVotes: 0,
    };

    // Update option pollId
    newPoll.options = newPoll.options.map((option) => ({
      ...option,
      pollId: newPoll.id,
    }));

    this.polls.unshift(newPoll);
    return newPoll;
  }

  static async vote(
    pollId: string,
    optionIds: string[],
    userId?: string
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const poll = this.polls.find((p) => p.id === pollId);
    if (!poll) throw new Error("Poll not found");

    if (!poll.isActive) throw new Error("Poll is closed");

    // Remove previous votes by this user (for simplicity)
    poll.options.forEach((option) => {
      option.votes = option.votes.filter((vote) => vote.userId !== userId);
    });

    // Add new votes
    optionIds.forEach((optionId) => {
      const option = poll.options.find((o) => o.id === optionId);
      if (option) {
        const vote: Vote = {
          id: Math.random().toString(36).substr(2, 9),
          pollId,
          optionId,
          userId,
          createdAt: new Date(),
        };
        option.votes.push(vote);
      }
    });

    // Update vote counts
    poll.options.forEach((option) => {
      option.voteCount = option.votes.length;
    });
    poll.totalVotes = poll.options.reduce(
      (sum, option) => sum + option.voteCount,
      0
    );

    // Update user vote
    poll.userVote = {
      optionIds,
      votedAt: new Date(),
    };
  }

  static async getUserPolls(userId: string): Promise<Poll[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return this.polls.filter((poll) => poll.creatorId === userId);
  }

  static async closePoll(pollId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const poll = this.polls.find((p) => p.id === pollId);
    if (poll) {
      poll.isActive = false;
      poll.updatedAt = new Date();
    }
  }
}

export function generatePollUrl(pollId: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/polls/${pollId}`;
  }
  return `/polls/${pollId}`;
}

export function isPollExpired(poll: Poll): boolean {
  if (!poll.expiresAt) return false;
  return new Date(poll.expiresAt) <= new Date();
}

export function canUserVote(
  poll: Poll,
  isAuthenticated: boolean
): {
  canVote: boolean;
  reason?: string;
} {
  if (!poll.isActive) {
    return { canVote: false, reason: "Poll is closed" };
  }

  if (isPollExpired(poll)) {
    return { canVote: false, reason: "Poll has expired" };
  }

  if (poll.requireAuth && !isAuthenticated) {
    return { canVote: false, reason: "Authentication required" };
  }

  if (poll.userVote && poll.userVote.optionIds.length > 0) {
    return { canVote: false, reason: "You have already voted" };
  }

  return { canVote: true };
}

// Core type definitions for the polling app

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  creatorId: string;
  creator?: User;
  options: PollOption[];
  isActive: boolean;
  allowMultipleVotes: boolean;
  requireAuth: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  totalVotes: number;
  userVote?: UserVote;
}

export interface PollOption {
  id: string;
  pollId: string;
  text: string;
  votes: Vote[];
  voteCount: number;
  order: number;
}

export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId?: string;
  voterIp?: string;
  createdAt: Date;
}

export interface UserVote {
  optionIds: string[];
  votedAt: Date;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  allowMultipleVotes: boolean;
  requireAuth: boolean;
  expiresAt?: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI Component Props
export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

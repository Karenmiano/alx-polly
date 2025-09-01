// Authentication utility functions
import type { User } from "@/types";

// Mock authentication - replace with your actual auth implementation
export class AuthService {
  private static currentUser: User | null = null;

  static async login(email: string, password: string): Promise<User> {
    // TODO: Implement actual authentication logic
    // This is a mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    if (email === "demo@example.com" && password === "password") {
      const user: User = {
        id: "1",
        email,
        username: "demo_user",
        firstName: "Demo",
        lastName: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }

    throw new Error("Invalid credentials");
  }

  static async register(userData: {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    // TODO: Implement actual registration logic
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  static logout(): void {
    this.currentUser = null;
    localStorage.removeItem("user");
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored);
          return this.currentUser;
        } catch {
          localStorage.removeItem("user");
        }
      }
    }

    return null;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth/auth-utils";
import type { ApiResponse } from "@/types";

// POST /api/auth/register - User registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      username,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      username: string;
      firstName?: string;
      lastName?: string;
    } = body;

    if (!email || !password || !username) {
      const response: ApiResponse = {
        success: false,
        error: "Email, password, and username are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = await AuthService.register({
      email,
      password,
      username,
      firstName,
      lastName,
    });

    const response: ApiResponse = {
      success: true,
      data: user,
      message: "Registration successful",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };

    return NextResponse.json(response, { status: 400 });
  }
}

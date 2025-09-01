import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth/auth-utils";
import type { ApiResponse } from "@/types";

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password }: { email: string; password: string } = body;

    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: "Email and password are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = await AuthService.login(email, password);

    const response: ApiResponse = {
      success: true,
      data: user,
      message: "Login successful",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };

    return NextResponse.json(response, { status: 401 });
  }
}

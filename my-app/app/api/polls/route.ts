import { NextRequest, NextResponse } from "next/server";
import { PollService } from "@/lib/polls/poll-utils";
import type { CreatePollData, ApiResponse } from "@/types";

// GET /api/polls - Get all polls
export async function GET() {
  try {
    const polls = await PollService.getAllPolls();

    const response: ApiResponse = {
      success: true,
      data: polls,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch polls",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      pollData,
      creatorId,
    }: { pollData: CreatePollData; creatorId: string } = body;

    if (!pollData || !creatorId) {
      const response: ApiResponse = {
        success: false,
        error: "Missing required fields",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newPoll = await PollService.createPoll(pollData, creatorId);

    const response: ApiResponse = {
      success: true,
      data: newPoll,
      message: "Poll created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create poll",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PollService } from "@/lib/polls/poll-utils";
import type { ApiResponse } from "@/types";

// GET /api/polls/[id] - Get a specific poll
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    const poll = await PollService.getPollById(pollId);

    if (!poll) {
      const response: ApiResponse = {
        success: false,
        error: "Poll not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      success: true,
      data: poll,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch poll",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

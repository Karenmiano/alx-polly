import { NextRequest, NextResponse } from "next/server";
import { PollService } from "@/lib/polls/poll-utils";
import type { ApiResponse } from "@/types";

// POST /api/polls/[id]/vote - Vote on a poll
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    const body = await request.json();
    const { optionIds, userId }: { optionIds: string[]; userId?: string } =
      body;

    if (!optionIds || !Array.isArray(optionIds) || optionIds.length === 0) {
      const response: ApiResponse = {
        success: false,
        error: "Option IDs are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    await PollService.vote(pollId, optionIds, userId);

    const response: ApiResponse = {
      success: true,
      message: "Vote recorded successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to record vote",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

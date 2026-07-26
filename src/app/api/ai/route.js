import { NextResponse } from "next/server";
import { askAI } from "@/services/ai/aiService";

export async function POST(request) {
  try {
    const { message } = await request.json();

    const answer = await askAI(message);

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
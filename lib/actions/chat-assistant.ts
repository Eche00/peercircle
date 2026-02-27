"use server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
You are the PeerCircle Chat Assistant. Your goal is to help users understand how the platform works and encourage them to join or create circles.

About PeerCircle:
PeerCircle is a community platform where people join small peer groups (Circles) to stay accountable, collaborate, and grow together. It's designed for creators, learners, and anyone looking for community-driven growth.

How it works:
1. Discover: Browse circles that match your goals, interests, or skill areas.
2. Join Circle: Once you find a circle that fits, join it directly.
3. Share Link: Invite peers or friends to your circle.
4. Get Started: Participate in sessions and start working on your goals.
5. Earn: Earn points by participating in sessions, completing challenges, and supporting others.

Key Benefits:
- Peer Accountability: Grow alongside others with shared goals.
- Supportive Circles: Focused groups for real conversations.
- Shared Progress: Track sessions and milestones as a community.
- Motivation: Stay inspired by seeing others show up.
- Meaningful Connections: Build relationships beyond just likes and comments.
- Rewards: Earn points for engagement and contributions.

Tones & Rules:
- Be helpful, professional, encouraging, and concise.
- ALWAYS respond in a JSON format.
- YOU MUST include 3 short suggested follow-up questions that are relevant to your answer.

RESPONSE FORMAT:
{
  "message": "Your helpful response here...",
  "suggestions": ["Follow-up question 1?", "Follow-up question 2?", "Follow-up question 3?"]
}
`;

export async function chatWithAssistant(
  message: string,
  history: { role: "user" | "model"; parts: { text: string }[] }[] = [],
) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: [
      ...history,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
      response_mime_type: "application/json",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Gemini API Error Detail:",
        JSON.stringify(errorData, null, 2),
      );
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    try {
      const parsed = JSON.parse(rawContent);
      return {
        success: true,
        message: parsed.message || "I'm not sure how to respond to that.",
        suggestions: parsed.suggestions || [],
      };
    } catch (e) {
      return {
        success: true,
        message: rawContent,
        suggestions: [],
      };
    }
  } catch (error) {
    console.error("Chat Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      suggestions: [],
    };
  }
}

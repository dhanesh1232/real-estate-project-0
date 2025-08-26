import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {
  const { credential } = await req.json();

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // payload.email, payload.name, payload.picture

    // TODO: create/find user in DB + create session (JWT/cookie)
    return NextResponse.json({ success: true, user: payload });
  } catch (err) {
    console.error("Google verify error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

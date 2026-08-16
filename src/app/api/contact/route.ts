import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_URL || 'https://api.ehealthwares.com/ehealthwares';

/**
 * Client-side contact submissions are POSTed here (same-origin) and proxied
 * to the eHealthwares backend. Keeps dynamic routes such as /products/[slug]
 * free of a catch-all rewrite.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend error: ${res.status} ${res.statusText}` },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

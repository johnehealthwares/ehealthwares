import { NextRequest, NextResponse } from 'next/server';

const IDENTITY_URL = process.env.IDENTITY_URL || 'http://api.ehealthwares.com/identity';

/**
 * Server-side proxy for identity auth/login. Keeps credentials off the
 * browser-to-CORS path and the identity host configurable via env.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.username !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'username and password are required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${IDENTITY_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: body.username, password: body.password }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || `Login failed: ${res.status} ${res.statusText}` },
        { status: res.status },
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unable to reach the identity service' }, { status: 502 });
  }
}
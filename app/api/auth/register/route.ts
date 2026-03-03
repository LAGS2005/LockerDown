import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Mock registration - in a real app, you'd:
    // 1. Check if user already exists
    // 2. Hash the password with bcrypt
    // 3. Store in database
    const user = {
      id: 'user_' + Math.random().toString(36).substring(7),
      email,
      name,
    }

    return NextResponse.json(
      { user },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

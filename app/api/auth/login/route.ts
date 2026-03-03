import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Mock authentication - in a real app, you'd query your database
    // and verify the password with bcrypt
    const user = {
      id: 'user_' + Math.random().toString(36).substring(7),
      email,
      name: email.split('@')[0],
    }

    return NextResponse.json(
      { user },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

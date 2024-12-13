import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("Userid")?.value;
  // console.log(session);
  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json(
    { isLogged: true, userId: session },
    { status: 200 },
  );
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const { userId } = body;

  //Generate session cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const options = {
    name: "Userid",
    value: userId,
    maxAge: expiresIn,
    // httpOnly: true,
    // secure: true,
  };

  //Add the cookie to the browser
  cookies().set(options);

  return NextResponse.json("User authenticated", { status: 200 });
}

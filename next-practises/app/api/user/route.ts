import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import client from "@/db";

export async function GET() {
  const data = await client.user.findFirst({});
  return Response.json({ username: data?.username, password: data?.password });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  return Response.json({
    msg: "logged in",
  });
}

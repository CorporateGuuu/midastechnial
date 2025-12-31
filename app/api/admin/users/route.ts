import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as ExtendedUser)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const user = await db.user.findUnique({ where: { id } });
    return Response.json(user);
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return Response.json(users);
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as ExtendedUser)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, ...data } = await request.json();

  // Only allow updating role for now
  const allowedFields = ['role'];
  const updateData: any = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  const user = await db.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return Response.json(user);
}

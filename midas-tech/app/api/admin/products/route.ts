import { db } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if ((session?.user as any)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const product = await db.product.findUnique({ where: { id } });
    if (product?.images) {
      product.images = JSON.parse(product.images);
    }
    return Response.json(product);
  }

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Parse images for all products
  const formattedProducts = products.map(product => ({
    ...product,
    images: product.images ? JSON.parse(product.images) : [],
  }));

  return Response.json(formattedProducts);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if ((session?.user as any)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();
  // Handle images array to JSON string
  if (data.images) {
    data.images = JSON.stringify(data.images);
  }
  const product = await db.product.create({ data });
  // Parse back for response
  const responseProduct = { ...product };
  if (responseProduct.images) {
    responseProduct.images = JSON.parse(responseProduct.images);
  }
  return Response.json(responseProduct);
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession();
  if ((session?.user as any)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, ...data } = await request.json();
  // Handle images array to JSON string
  if (data.images) {
    data.images = JSON.stringify(data.images);
  }
  const product = await db.product.update({ where: { id }, data });
  // Parse back for response
  const responseProduct = { ...product };
  if (responseProduct.images) {
    responseProduct.images = JSON.parse(responseProduct.images);
  }
  return Response.json(responseProduct);
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession();
  if ((session?.user as any)?.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return new Response("ID required", { status: 400 });

  await db.product.delete({ where: { id } });
  return new Response(null, { status: 204 });
}

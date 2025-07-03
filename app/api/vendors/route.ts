import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const vendors = await prisma.vendor.findMany({ include: { reviews: true } });
  return NextResponse.json(vendors);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newVendor = await prisma.vendor.create({ data: body });
  return NextResponse.json(newVendor);
}

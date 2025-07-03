import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Fetch all reviews or reviews for a specific vendor
export async function GET(req: NextRequest) {
  const vendorId = req.nextUrl.searchParams.get('vendorId');

  const reviews = await prisma.review.findMany({
    where: vendorId ? { vendorId } : {},
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}

// Add a new review
export async function POST(req: NextRequest) {
  const { vendorId, content, rating } = await req.json();

  if (!vendorId || !content || typeof rating !== 'number') {
    return NextResponse.json(
      { error: 'Missing or invalid fields' },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      vendorId,
      content,
      rating,
    },
  });

  // Update vendor rating and review count
  const vendorReviews = await prisma.review.findMany({ where: { vendorId } });
  const totalReviews = vendorReviews.length;
  interface VendorReview {
    rating: number;
  }

  const averageRating: number =
    (vendorReviews as VendorReview[]).reduce(
      (sum: number, r: VendorReview) => sum + r.rating,
      0
    ) / totalReviews;

  await prisma.vendor.update({
    where: { id: vendorId },
    data: {
      totalReviews,
      rating: parseFloat(averageRating.toFixed(1)),
    },
  });

  return NextResponse.json(review);
}

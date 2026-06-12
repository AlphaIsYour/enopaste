import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug, getExpiryDate } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      language,
      visibility,
      password,
      burnAfterRead,
      expiresIn,
    } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (content.length > 1000000) {
      return NextResponse.json(
        { error: "Content exceeds maximum size of 1MB" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.paste.findUnique({ where: { slug } });
      if (!existing) break;
      slug = generateSlug();
      attempts++;
    }

    // Hash password if provided
    let hashedPassword: string | null = null;
    if (password && password.trim().length > 0) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Calculate expiry date
    const expiresAt = getExpiryDate(expiresIn);

    const paste = await prisma.paste.create({
      data: {
        slug,
        title: title?.trim() || null,
        content,
        language: language || "text",
        visibility: visibility || "public",
        password: hashedPassword,
        burnAfterRead: burnAfterRead || false,
        expiresAt,
      },
    });

    return NextResponse.json({
      slug: paste.slug,
      url: `/paste/${paste.slug}`,
    });
  } catch (error) {
    console.error("Error creating paste:", error);
    return NextResponse.json(
      { error: "Failed to create paste" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pastes = await prisma.paste.findMany({
      where: {
        visibility: "public",
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        slug: true,
        title: true,
        language: true,
        views: true,
        createdAt: true,
      },
    });

    return NextResponse.json(pastes);
  } catch (error) {
    console.error("Error fetching pastes:", error);
    return NextResponse.json(
      { error: "Failed to fetch pastes" },
      { status: 500 }
    );
  }
}

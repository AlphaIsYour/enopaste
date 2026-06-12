import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isExpired } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    const paste = await prisma.paste.findUnique({
      where: { slug: id },
    });

    if (!paste) {
      return NextResponse.json(
        { error: "Paste not found" },
        { status: 404 }
      );
    }

    // Check if expired
    if (isExpired(paste.expiresAt)) {
      // Delete expired paste
      await prisma.paste.delete({ where: { slug: id } });
      return NextResponse.json(
        { error: "Paste has expired" },
        { status: 410 }
      );
    }

    // Check password
    if (paste.password) {
      if (!password) {
        return NextResponse.json(
          { error: "Password required", requiresPassword: true },
          { status: 401 }
        );
      }

      const isValid = await bcrypt.compare(password, paste.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
    }

    // Increment views
    await prisma.paste.update({
      where: { slug: id },
      data: {
        views: { increment: 1 },
        lastViewedAt: new Date(),
      },
    });

    // If burn after read, delete after returning
    if (paste.burnAfterRead) {
      // Return the paste data first, then delete
      const response = NextResponse.json({
        id: paste.id,
        slug: paste.slug,
        title: paste.title,
        content: paste.content,
        language: paste.language,
        visibility: paste.visibility,
        burnAfterRead: paste.burnAfterRead,
        hasPassword: !!paste.password,
        views: paste.views + 1,
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
      });

      // Delete after response is sent
      setImmediate(async () => {
        try {
          await prisma.paste.delete({ where: { slug: id } });
        } catch (e) {
          console.error("Error deleting burn-after-read paste:", e);
        }
      });

      return response;
    }

    return NextResponse.json({
      id: paste.id,
      slug: paste.slug,
      title: paste.title,
      content: paste.content,
      language: paste.language,
      visibility: paste.visibility,
      burnAfterRead: paste.burnAfterRead,
      hasPassword: !!paste.password,
      views: paste.views + 1,
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
    });
  } catch (error) {
    console.error("Error fetching paste:", error);
    return NextResponse.json(
      { error: "Failed to fetch paste" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paste = await prisma.paste.findUnique({
      where: { slug: id },
    });

    if (!paste) {
      return NextResponse.json(
        { error: "Paste not found" },
        { status: 404 }
      );
    }

    await prisma.paste.delete({ where: { slug: id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting paste:", error);
    return NextResponse.json(
      { error: "Failed to delete paste" },
      { status: 500 }
    );
  }
}

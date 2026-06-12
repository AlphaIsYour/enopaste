import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isExpired } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paste = await prisma.paste.findUnique({
      where: { slug: id },
    });

    if (!paste) {
      return new NextResponse("Paste not found", { status: 404 });
    }

    // Check if expired
    if (isExpired(paste.expiresAt)) {
      await prisma.paste.delete({ where: { slug: id } });
      return new NextResponse("Paste has expired", { status: 410 });
    }

    // Check if password protected
    if (paste.password) {
      return new NextResponse("This paste is password protected", {
        status: 401,
      });
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
      setImmediate(async () => {
        try {
          await prisma.paste.delete({ where: { slug: id } });
        } catch (e) {
          console.error("Error deleting burn-after-read paste:", e);
        }
      });
    }

    return new NextResponse(paste.content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching raw paste:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

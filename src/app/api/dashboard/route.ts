import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get recent public pastes
    const recentPastes = await prisma.paste.findMany({
      where: {
        visibility: "public",
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        language: true,
        views: true,
        createdAt: true,
      },
    });

    // Get top viewed public pastes
    const topPastes = await prisma.paste.findMany({
      where: {
        visibility: "public",
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { views: "desc" },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        language: true,
        views: true,
        createdAt: true,
      },
    });

    // Get stats
    const totalPastes = await prisma.paste.count({
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });

    const totalViews = await prisma.paste.aggregate({
      _sum: { views: true },
    });

    return NextResponse.json({
      recentPastes,
      topPastes,
      stats: {
        totalPastes,
        totalViews: totalViews._sum.views || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

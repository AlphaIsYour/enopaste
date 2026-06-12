"use client";

/* eslint-disable react-hooks/set-state-in-effect -- async fetch callbacks are the standard data-fetching pattern */
import { useState, useEffect } from "react";
import { PasteCard } from "@/components/PasteCard";
import { StatsCard } from "@/components/StatsCard";
import {
  FileText,
  Eye,
  TrendingUp,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Paste {
  id: string;
  slug: string;
  title: string | null;
  language: string;
  views: number;
  createdAt: string;
}

interface DashboardData {
  recentPastes: Paste[];
  topPastes: Paste[];
  stats: {
    totalPastes: number;
    totalViews: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch dashboard");
      }

      setData(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={fetchDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Recent activity and popular pastes
          </p>
        </div>
        <button
          onClick={fetchDashboard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Pastes"
          value={data.stats.totalPastes.toLocaleString()}
          icon={FileText}
          description="All active pastes"
        />
        <StatsCard
          title="Total Views"
          value={data.stats.totalViews.toLocaleString()}
          icon={Eye}
          description="Across all pastes"
        />
        <StatsCard
          title="Most Viewed"
          value={
            data.topPastes.length > 0
              ? data.topPastes[0].views.toLocaleString()
              : "0"
          }
          icon={TrendingUp}
          description={
            data.topPastes.length > 0
              ? data.topPastes[0].title || "Untitled"
              : "No pastes yet"
          }
        />
        <StatsCard
          title="Latest Paste"
          value={
            data.recentPastes.length > 0
              ? data.recentPastes[0].title || "Untitled"
              : "None"
          }
          icon={Clock}
          description={
            data.recentPastes.length > 0
              ? new Date(data.recentPastes[0].createdAt).toLocaleDateString()
              : ""
          }
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Pastes */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Recent Pastes
            </h2>
          </div>
          <div className="space-y-3">
            {data.recentPastes.length === 0 ? (
              <div className="p-8 text-center bg-card border border-border rounded-xl">
                <p className="text-sm text-muted-foreground">
                  No pastes yet. Create your first one!
                </p>
              </div>
            ) : (
              data.recentPastes.map((paste) => (
                <PasteCard
                  key={paste.id}
                  slug={paste.slug}
                  title={paste.title}
                  language={paste.language}
                  views={paste.views}
                  createdAt={paste.createdAt}
                />
              ))
            )}
          </div>
        </div>

        {/* Top Viewed */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Most Viewed
            </h2>
          </div>
          <div className="space-y-3">
            {data.topPastes.length === 0 ? (
              <div className="p-8 text-center bg-card border border-border rounded-xl">
                <p className="text-sm text-muted-foreground">
                  No views yet. Share your pastes!
                </p>
              </div>
            ) : (
              data.topPastes.map((paste, index) => (
                <div key={paste.id} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <PasteCard
                      slug={paste.slug}
                      title={paste.title}
                      language={paste.language}
                      views={paste.views}
                      createdAt={paste.createdAt}
                      variant="compact"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

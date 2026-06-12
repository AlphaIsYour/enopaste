"use client";

/* eslint-disable react-hooks/set-state-in-effect -- async fetch callback is the standard data-fetching pattern */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function RawPastePage() {
  const params = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchRaw = useCallback(async () => {
    try {
      const response = await fetch(`/api/paste/${params.id}/raw`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch paste");
      }

      const text = await response.text();
      setContent(text);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchRaw();
  }, [fetchRaw]);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10">
            <Loader2 className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/paste/${params.id}`}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm text-muted-foreground">Raw View</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              copied
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
          {content}
        </pre>
      </div>
    </div>
  );
}

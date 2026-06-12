"use client";

/* eslint-disable react-hooks/set-state-in-effect -- async fetch callbacks are the standard data-fetching pattern */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { PasteViewer } from "@/components/PasteViewer";
import { PasswordPrompt } from "@/components/PasswordPrompt";
import {
  Loader2,
  AlertCircle,
  Flame,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Paste {
  id: string;
  slug: string;
  title: string | null;
  content: string;
  language: string;
  visibility: string;
  burnAfterRead: boolean;
  hasPassword: boolean;
  views: number;
  createdAt: string;
  expiresAt: string | null;
}

export default function PastePage() {
  const params = useParams();
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fetchPaste = useCallback(async (password?: string) => {
    try {
      const url = password
        ? `/api/paste/${params.id}?password=${encodeURIComponent(password)}`
        : `/api/paste/${params.id}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        if (data.requiresPassword) {
          setRequiresPassword(true);
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Failed to fetch paste");
      }

      setPaste(data);
      setRequiresPassword(false);
      setPasswordError("");
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPaste();
  }, [fetchPaste]);

  const handlePasswordSubmit = async (password: string) => {
    setPasswordError("");
    await fetchPaste(password);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading paste...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Paste Not Found
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Create New Paste
          </Link>
        </div>
      </div>
    );
  }

  if (requiresPassword) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <PasswordPrompt
          onSubmit={handlePasswordSubmit}
          error={passwordError}
        />
      </div>
    );
  }

  if (!paste) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {paste.burnAfterRead && (
        <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          <Flame className="h-5 w-5 flex-shrink-0" />
          <p>
            <strong>Warning:</strong> This paste has been deleted and can no
            longer be accessed.
          </p>
        </div>
      )}
      <PasteViewer paste={paste} />
    </div>
  );
}

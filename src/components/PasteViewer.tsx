"use client";

import { useState, useEffect, useRef } from "react";
import { highlightCode } from "@/lib/highlighter";
import { cn, formatDate, formatViews, LANGUAGES } from "@/lib/utils";
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  Flame,
  Clock,
  Eye,
  Lock,
  Globe,
  LockKeyhole,
  ArrowLeft,
  WrapText,
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

interface PasteViewerProps {
  paste: Paste;
}

export function PasteViewer({ paste }: PasteViewerProps) {
  const [copied, setCopied] = useState(false);
  const [rawCopied, setRawCopied] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  // Restore line-wrap preference from localStorage
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("enopaste:line-wrap");
        if (saved !== null) {
          setIsWrapped(saved === "true");
        }
      } catch {
        // Ignore errors in environments where localStorage is restricted
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const handleToggleWrap = () => {
    setIsWrapped((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("enopaste:line-wrap", String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const languageLabel =
    LANGUAGES.find((l) => l.value === paste.language)?.label || "Text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paste.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyRawLink = async () => {
    const url = `${window.location.origin}/paste/${paste.slug}/raw`;
    try {
      await navigator.clipboard.writeText(url);
      setRawCopied(true);
      setTimeout(() => setRawCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([paste.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = paste.title || `paste-${paste.slug}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const highlighted = highlightCode(paste.content, paste.language);
  const lineCount = paste.content.split("\n").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {paste.title || "Untitled Paste"}
              </h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(paste.createdAt)}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  {formatViews(paste.views)} views
                </span>
                {paste.burnAfterRead && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1.5 text-red-500">
                      <Flame className="h-3.5 w-3.5" />
                      Burn after read
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              copied
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
            )}
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

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 border border-border transition-all"
          >
            <Download className="h-4 w-4" />
            Download
          </button>

          <button
            onClick={handleCopyRawLink}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              rawCopied
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
            )}
          >
            {rawCopied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4" />
                Raw
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
          {languageLabel}
        </span>

        <span
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
            paste.visibility === "public" &&
              "bg-green-500/10 text-green-500",
            paste.visibility === "unlisted" &&
              "bg-yellow-500/10 text-yellow-500",
            paste.visibility === "private" && "bg-red-500/10 text-red-500"
          )}
        >
          {paste.visibility === "public" && <Globe className="h-3 w-3" />}
          {paste.visibility === "unlisted" && <Eye className="h-3 w-3" />}
          {paste.visibility === "private" && <Lock className="h-3 w-3" />}
          {paste.visibility.charAt(0).toUpperCase() +
            paste.visibility.slice(1)}
        </span>

        {paste.hasPassword && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-500 text-xs font-medium">
            <LockKeyhole className="h-3 w-3" />
            Password Protected
          </span>
        )}

        {paste.expiresAt && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Expires {formatDate(paste.expiresAt)}
          </span>
        )}

        <span className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-medium">
          {lineCount} lines · {paste.content.length.toLocaleString()} chars
        </span>
      </div>

      {/* Code Display */}
      <div className="relative group">
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-card border border-border rounded-t-xl border-b-0 z-10">
          <span className="text-xs text-muted-foreground font-mono">
            {languageLabel.toLowerCase()}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleWrap}
              aria-label={isWrapped ? "Disable line wrapping" : "Enable line wrapping"}
              title={
                isWrapped
                  ? "Disable line wrapping (switch to horizontal scroll)"
                  : "Enable line wrapping"
              }
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                isWrapped
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
              )}
            >
              <WrapText className="h-3.5 w-3.5" />
              <span>{isWrapped ? "Wrapped" : "Wrap"}</span>
            </button>

            <button
              onClick={handleCopy}
              aria-label="Copy code content"
              title="Copy code content"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "bg-card border border-border rounded-xl transition-all",
            isWrapped ? "overflow-x-hidden" : "overflow-x-auto"
          )}
        >
          <pre
            ref={codeRef}
            className={cn(
              "p-4 pt-12 font-mono text-sm leading-relaxed",
              isWrapped ? "whitespace-pre-wrap break-words" : "whitespace-pre"
            )}
          >
            <code
              className="line-numbers"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </div>

      {/* Raw Link */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Link
          href={`/paste/${paste.slug}/raw`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
        >
          View raw
        </Link>
      </div>
    </div>
  );
}

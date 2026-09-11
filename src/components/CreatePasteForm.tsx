"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LANGUAGES,
  EXPIRY_OPTIONS,
  VISIBILITY_OPTIONS,
  cn,
} from "@/lib/utils";
import {
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  Flame,
  Globe,
  Lock,
  Shield,
  Copy,
  Loader2,
  Settings2,
  Zap,
} from "lucide-react";

export function CreatePasteForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("text");
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [burnAfterRead, setBurnAfterRead] = useState(false);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || undefined,
          content,
          language,
          visibility,
          password: password.trim() || undefined,
          burnAfterRead,
          expiresIn,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create paste");
      }

      router.push(`/paste/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isSubmitting && content.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
      return;
    }

    // Tab key indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 2 spaces
      const newContent =
        content.substring(0, start) + "  " + content.substring(end);
      setContent(newContent);

      // Restore cursor position after state update
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  const lineCount = content.split("\n").length;
  const charCount = content.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled paste (optional)"
          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      {/* Editor */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-card border border-border rounded-t-xl border-b-0 z-10">
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>{lineCount} lines</span>
              <span>·</span>
              <span>{charCount.toLocaleString()} chars</span>
              <span>·</span>
              <span className="text-[11px] opacity-75">Tab indents · Ctrl+↵ submits</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {content && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(content);
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Copy content"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your code here..."
          rows={20}
          className="code-editor w-full px-4 pt-14 pb-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          spellCheck={false}
        />
      </div>

      {/* Advanced Options Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Settings2 className="h-4 w-4" />
        <span>Advanced Options</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            showAdvanced && "rotate-180"
          )}
        />
      </button>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-card border border-border rounded-xl">
          {/* Visibility */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Visibility
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VISIBILITY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setVisibility(option.value)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                    visibility === option.value
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expiry */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Expires In
            </label>
            <select
              value={expiresIn === null ? "null" : expiresIn.toString()}
              onChange={(e) =>
                setExpiresIn(
                  e.target.value === "null" ? null : parseInt(e.target.value)
                )
              }
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              {EXPIRY_OPTIONS.map((option) => (
                <option
                  key={option.value === null ? "null" : option.value}
                  value={option.value === null ? "null" : option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Password Protection
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Optional password"
                className="w-full px-3 py-2 pr-10 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Burn After Read */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Flame className="h-4 w-4 text-muted-foreground" />
              Burn After Read
            </label>
            <button
              type="button"
              onClick={() => setBurnAfterRead(!burnAfterRead)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all border",
                burnAfterRead
                  ? "bg-red-500/10 border-red-500 text-red-500"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "w-10 h-6 rounded-full transition-colors relative",
                  burnAfterRead ? "bg-red-500" : "bg-muted-foreground/30"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                    burnAfterRead ? "translate-x-5" : "translate-x-1"
                  )}
                />
              </div>
              <span>
                {burnAfterRead
                  ? "Paste will be deleted after first view"
                  : "Keep paste permanently"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          <Shield className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating Paste...
          </>
        ) : (
          <>
            <Zap className="h-5 w-5" />
            Create Paste
          </>
        )}
      </button>
    </form>
  );
}

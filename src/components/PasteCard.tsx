"use client";

import Link from "next/link";
import { formatDate, formatViews, LANGUAGES } from "@/lib/utils";
import {
  Clock,
  Eye,
  Code2,
  ArrowRight,
} from "lucide-react";

interface PasteCardProps {
  slug: string;
  title: string | null;
  language: string;
  views: number;
  createdAt: string;
  variant?: "default" | "compact";
}

export function PasteCard({
  slug,
  title,
  language,
  views,
  createdAt,
  variant = "default",
}: PasteCardProps) {
  const languageLabel =
    LANGUAGES.find((l) => l.value === language)?.label || "Text";

  if (variant === "compact") {
    return (
      <Link
        href={`/paste/${slug}`}
        className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-card/80 transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
            <Code2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {title || "Untitled Paste"}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span>{languageLabel}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatViews(views)}
              </span>
            </div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    );
  }

  return (
    <Link
      href={`/paste/${slug}`}
      className="group block p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-card/80 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {title || "Untitled Paste"}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" />
              {languageLabel}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(createdAt)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {formatViews(views)} views
            </span>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}

import { clsx, type ClassValue } from "clsx";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export function getExpiryLabel(seconds: number | null): string {
  if (seconds === null) return "Never";
  if (seconds === 600) return "10 minutes";
  if (seconds === 3600) return "1 hour";
  if (seconds === 86400) return "1 day";
  if (seconds === 604800) return "1 week";
  if (seconds === 2592000) return "1 month";
  return "Custom";
}

export function getExpiryDate(seconds: number | null): Date | null {
  if (seconds === null) return null;
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export function isExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false;
  return new Date() > new Date(expiresAt);
}

export function generateSlug(): string {
  return nanoid(8);
}

export const LANGUAGES = [
  { value: "text", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "markdown", label: "Markdown" },
  { value: "bash", label: "Bash" },
  { value: "powershell", label: "PowerShell" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "graphql", label: "GraphQL" },
  { value: "solidity", label: "Solidity" },
  { value: "toml", label: "TOML" },
  { value: "ini", label: "INI" },
  { value: "nginx", label: "Nginx" },
  { value: "apache", label: "Apache" },
  { value: "latex", label: "LaTeX" },
  { value: "r", label: "R" },
  { value: "scala", label: "Scala" },
  { value: "elixir", label: "Elixir" },
  { value: "haskell", label: "Haskell" },
  { value: "lua", label: "Lua" },
  { value: "perl", label: "Perl" },
  { value: "dart", label: "Dart" },
  { value: "zig", label: "Zig" },
  { value: "terraform", label: "Terraform" },
  { value: "makefile", label: "Makefile" },
] as const;

export type Language = (typeof LANGUAGES)[number]["value"];

export const EXPIRY_OPTIONS = [
  { value: 600, label: "10 Minutes" },
  { value: 3600, label: "1 Hour" },
  { value: 86400, label: "1 Day" },
  { value: 604800, label: "1 Week" },
  { value: 2592000, label: "1 Month" },
  { value: null, label: "Never" },
] as const;

export const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public", description: "Listed on dashboard" },
  { value: "unlisted", label: "Unlisted", description: "Only accessible via link" },
  { value: "private", label: "Private", description: "Password required" },
] as const;

/** Counts non-empty whitespace-separated words, including Unicode text. */
export function getWordCount(text: string): number {
  return text.match(/\S+/gu)?.length ?? 0;
}

/** Formats a byte count using 1024-byte units. */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const units = ["KB", "MB", "GB", "TB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)) - 1, units.length - 1);
  return `${(bytes / 1024 ** (unit + 1)).toFixed(1)} ${units[unit]}`;
}

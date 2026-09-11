"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";

interface PasswordPromptProps {
  onSubmit: (password: string) => Promise<void>;
  error?: string;
}

export function PasswordPrompt({ onSubmit, error }: PasswordPromptProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Password Protected
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This paste requires a password to view
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="unlock-password" className="block text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <input
              id="unlock-password"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "unlock-password-error" : undefined}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full px-4 py-3 pr-12 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <div id="unlock-password-error" role="alert" aria-live="polite" className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              <Shield className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Unlock Paste
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

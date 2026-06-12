import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            404 — Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

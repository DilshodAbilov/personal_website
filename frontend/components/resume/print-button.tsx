"use client";

import { Download } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
}

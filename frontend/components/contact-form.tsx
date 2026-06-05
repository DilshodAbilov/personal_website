"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContact } from "@/lib/api";
import type { ContactPayload } from "@/lib/types";

const SUBJECTS: ContactPayload["subject_type"][] = ["job", "collab", "question", "other"];

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    subject_type: "job",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const ok = await sendContact(form);
    if (ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject_type: "job", message: "" });
    } else {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl glass-chip px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">{t("subject")}</label>
        <select
          value={form.subject_type}
          onChange={(e) =>
            setForm({ ...form, subject_type: e.target.value as ContactPayload["subject_type"] })
          }
          className={inputClass}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {t(`subjects.${s}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="glass-sheen inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? t("sending") : t("send")}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-green-500">
          <CheckCircle2 className="h-4 w-4" />
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          {t("error")}
        </p>
      )}
    </form>
  );
}

import { useEffect, useId, useRef, useState } from "react";

export function EvidenceSections({
  evidence,
  cvPrompt,
}: {
  evidence: string[];
  cvPrompt: string;
}) {
  return (
    <div className="space-y-3">
      <ListCard
        title="Saran Bukti Kompetensi"
        items={evidence}
        emptyMessage="Belum ada saran bukti tambahan."
      />
      <section
        aria-labelledby="cv-material-title"
        className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
      >
        <h3
          id="cv-material-title"
          className="text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-700"
        >
          Prompt untuk Memperbaiki CV
        </h3>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
          Unggah CV Anda bersama prompt ini ke layanan AI pilihan Anda. Periksa
          kembali hasilnya sebelum digunakan dan jangan menerima klaim yang
          tidak sesuai dengan pengalaman asli.
        </p>
        <div className="mt-3">
          <CopyableItem text={cvPrompt} label="prompt perbaikan CV" />
        </div>
      </section>
    </div>
  );
}

export function CopyableItem({
  text,
  label = "teks",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      resetTimer.current = window.setTimeout(() => {
        setCopied(false);
        resetTimer.current = null;
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col items-stretch gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 sm:flex-row sm:items-start">
      <p className="min-w-0 flex-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700 [overflow-wrap:anywhere]">
        {text}
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={`${copied ? "Tersalin" : "Salin"} ${label}`}
        className="min-h-10 shrink-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      >
        {copied ? "Tersalin" : "Salin"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} tersalin ke clipboard.` : ""}
      </span>
    </div>
  );
}

export function ListCard({
  title,
  items,
  emptyMessage,
  emphasized = false,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  emphasized?: boolean;
}) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={`min-w-0 rounded-2xl border p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] ${
        emphasized
          ? "border-indigo-200 bg-indigo-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <h3
        id={titleId}
        className="break-words text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-700"
      >
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex min-w-0 gap-2">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600"
              />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-slate-400">{emptyMessage}</p>
      )}
    </section>
  );
}

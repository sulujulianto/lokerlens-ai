import { useEffect, useId, useRef, useState } from "react";

export function EvidenceSections({
  evidence,
  cvMaterial,
}: {
  evidence: string[];
  cvMaterial: string[];
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <ListCard
        title="Saran Bukti Kompetensi"
        items={evidence}
        emptyMessage="Belum ada saran bukti tambahan."
      />
      <section
        aria-labelledby="cv-material-title"
        className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <h3
          id="cv-material-title"
          className="text-xs font-black uppercase tracking-wider text-indigo-700"
        >
          Bahan untuk CV
        </h3>
        {cvMaterial.length > 0 ? (
          <div className="mt-3 space-y-2">
            {cvMaterial.map((item) => (
              <div key={item}>
                <CopyableItem text={item} label="bahan CV" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-400">
            Belum ada bahan CV tambahan.
          </p>
        )}
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
    <div className="flex min-w-0 flex-col items-stretch gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-start">
      <p className="min-w-0 flex-1 break-words text-sm leading-relaxed text-slate-700 [overflow-wrap:anywhere]">
        {text}
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={`${copied ? "Tersalin" : "Salin"} ${label}`}
        className="min-h-10 shrink-0 rounded border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
}: {
  title: string;
  items: string[];
  emptyMessage: string;
}) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h3
        id={titleId}
        className="break-words text-xs font-black uppercase tracking-wider text-slate-700"
      >
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex min-w-0 gap-2">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
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

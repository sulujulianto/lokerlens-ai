import { useState } from "react";

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
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700">
          Bahan untuk CV
        </h3>
        {cvMaterial.length > 0 ? (
          <div className="mt-3 space-y-2">
            {cvMaterial.map((item) => (
              <div key={item}>
                <CopyableItem text={item} />
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

export function CopyableItem({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3">
      <p className="flex-1 text-sm leading-relaxed text-slate-700">{text}</p>
      <button
        type="button"
        onClick={copy}
        className="rounded border border-slate-300 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {copied ? "Tersalin" : "Salin"}
      </button>
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
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-slate-400">{emptyMessage}</p>
      )}
    </section>
  );
}

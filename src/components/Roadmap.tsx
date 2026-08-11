import type {
  OutputLanguage,
  Roadmap30Days,
} from "../../shared/analysisSchemas";

export function Roadmap({
  roadmap,
  language,
}: {
  roadmap: Roadmap30Days;
  language: OutputLanguage;
}) {
  const weeks = [
    {
      label: language === "id" ? "Minggu 1 - Fondasi" : "Week 1 - Foundation",
      actions: roadmap.week1,
    },
    {
      label: language === "id" ? "Minggu 2 - Praktik" : "Week 2 - Practice",
      actions: roadmap.week2,
    },
    {
      label:
        language === "id"
          ? "Minggu 3 - Bukti kompetensi"
          : "Week 3 - Evidence",
      actions: roadmap.week3,
    },
    {
      label:
        language === "id"
          ? "Minggu 4 - Lamaran & wawancara"
          : "Week 4 - Application & interview",
      actions: roadmap.week4,
    },
  ];

  return (
    <section
      aria-labelledby="roadmap-title"
      className="min-w-0 rounded-3xl border border-indigo-200 bg-indigo-50 p-4 text-slate-900 shadow-[0_16px_38px_rgba(15,23,42,0.06)] sm:p-6"
    >
      <h3
        id="roadmap-title"
        className="text-sm font-extrabold uppercase tracking-[0.12em] text-indigo-800"
      >
        Rencana Aksi 30 Hari
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {weeks.map((week, index) => (
          <div key={week.label} className="flex min-w-0 gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-extrabold text-white"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h4 className="text-sm font-bold">{week.label}</h4>
              {week.actions.length > 0 ? (
                <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-xs leading-5 text-slate-700">
                  {week.actions.map((action) => (
                    <li
                      key={action}
                      className="break-words [overflow-wrap:anywhere]"
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-slate-500">
                  Tidak ada tindakan tambahan.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

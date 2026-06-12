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
    <section className="rounded-lg bg-indigo-950 p-5 text-white shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-wider text-indigo-100">
        Rencana Aksi 30 Hari
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {weeks.map((week, index) => (
          <div key={week.label} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
              {index + 1}
            </span>
            <div>
              <h4 className="text-sm font-bold">{week.label}</h4>
              {week.actions.length > 0 ? (
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-indigo-100">
                  {week.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-indigo-300">
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

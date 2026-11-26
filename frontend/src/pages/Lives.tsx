import { useEffect, useState } from "react";

type Live = {
  id: number;
  title: string;
  date: string;
  venue: string;
  description: string | null;
};

export default function Lives() {
  const [lives, setLives] = useState<Live[]>([]);

  useEffect(() => {
    fetch("/api/v1/lives")
      .then((r) => r.json())
      .then(setLives);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
          Live Schedule
        </p>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider text-text-primary">
          ライブ情報
        </h1>
        <div className="w-12 h-px bg-accent mt-6" />
      </div>

      {/* Events */}
      <div className="space-y-0">
        {lives.map((l, i) => {
          const d = new Date(l.date);
          const month = d.toLocaleDateString("ja-JP", { month: "short" });
          const day = d.getDate();
          const year = d.getFullYear();

          return (
            <div
              key={l.id}
              className={`group relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 border-b border-border hover:border-accent/30 transition-colors delay-${i + 1} animate-fade-up`}
            >
              {/* Date block */}
              <div className="text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl text-text-primary leading-none">
                  {day}
                </p>
                <p className="font-heading text-xs tracking-wider text-text-muted uppercase mt-1">
                  {month} {year}
                </p>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-heading text-xl md:text-2xl tracking-wider text-text-primary group-hover:text-accent transition-colors">
                  {l.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-accent text-xs">&#9670;</span>
                  <span className="text-text-secondary text-sm">{l.venue}</span>
                </div>
                {l.description && (
                  <p className="text-text-muted text-sm mt-3 leading-relaxed">
                    {l.description}
                  </p>
                )}
              </div>

              {/* Hover accent */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-accent transition-colors" />
            </div>
          );
        })}
      </div>

      {lives.length === 0 && (
        <p className="text-text-muted text-center py-20">
          現在予定されているライブはありません。
        </p>
      )}
    </div>
  );
}

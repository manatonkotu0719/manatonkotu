import { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
  part: string;
  introduction: string | null;
  image_url: string | null;
};

const partColors: Record<string, string> = {
  Vo: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Gt: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Ba: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Dr: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Key: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/v1/members")
      .then((r) => r.json())
      .then(setMembers);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
          Members
        </p>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider text-text-primary">
          メンバー紹介
        </h1>
        <div className="w-12 h-px bg-accent mt-6" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <div
            key={m.id}
            className={`group relative bg-surface-card border border-border rounded-sm p-8 hover:border-border-light transition-all duration-500 delay-${i + 1} animate-fade-up`}
          >
            {/* Accent line top */}
            <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-accent transition-all duration-700" />

            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-full bg-surface-hover border border-border mb-6 flex items-center justify-center">
              <span className="font-display text-2xl text-text-muted">
                {m.name.charAt(0)}
              </span>
            </div>

            <h2 className="font-heading text-lg tracking-wider text-text-primary mb-2">
              {m.name}
            </h2>

            <span
              className={`inline-block text-[10px] tracking-widest uppercase font-heading border px-2 py-0.5 rounded-sm mb-4 ${
                partColors[m.part] ?? "bg-accent-dim text-accent border-accent/20"
              }`}
            >
              {m.part}
            </span>

            {m.introduction && (
              <p className="text-text-secondary text-sm leading-relaxed">
                {m.introduction}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

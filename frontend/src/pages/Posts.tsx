import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/v1/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
          News
        </p>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider text-text-primary">
          お知らせ
        </h1>
        <div className="w-12 h-px bg-accent mt-6" />
      </div>

      {/* Posts */}
      <div className="space-y-0">
        {posts.map((p, i) => (
          <article
            key={p.id}
            className={`group py-10 border-b border-border hover:border-accent/30 transition-colors delay-${i + 1} animate-fade-up`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
              <time className="font-heading text-xs tracking-wider text-text-muted uppercase shrink-0 pt-1 md:w-32">
                {new Date(p.created_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="flex-1">
                <h2 className="font-heading text-xl tracking-wider text-text-primary group-hover:text-accent transition-colors mb-3">
                  {p.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {p.content}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-text-muted text-center py-20">
          お知らせはまだありません。
        </p>
      )}
    </div>
  );
}

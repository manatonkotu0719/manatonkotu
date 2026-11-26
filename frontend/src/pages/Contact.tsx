import { useState, type FormEvent } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/v1/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSent(true);
      form.reset();
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Left side */}
        <div className="animate-fade-up">
          <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
            Contact
          </p>
          <h1 className="font-display text-6xl md:text-7xl tracking-wider text-text-primary mb-6">
            お問い合わせ
          </h1>
          <div className="w-12 h-px bg-accent mb-8" />
          <p className="text-text-secondary leading-relaxed mb-8">
            SLCへのご質問、入部希望、ライブ出演依頼など、
            お気軽にお問い合わせください。
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-text-muted">
              <span className="text-accent">&#9670;</span>
              <span>通常2-3営業日以内にご返信いたします</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="delay-2 animate-fade-up">
          {sent ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-accent text-2xl">&#10003;</span>
                </div>
                <p className="font-heading text-xl tracking-wider text-text-primary mb-2">
                  送信完了
                </p>
                <p className="text-text-secondary text-sm">
                  お問い合わせありがとうございます。
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-heading tracking-wider uppercase text-text-muted mb-2">
                  お名前
                </label>
                <input
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-xs font-heading tracking-wider uppercase text-text-muted mb-2">
                  メールアドレス
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-heading tracking-wider uppercase text-text-muted mb-2">
                  メッセージ
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full py-4 bg-accent text-surface font-heading text-sm tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,168,83,0.3)]"
              >
                <span className="relative z-10">送信する</span>
                <div className="absolute inset-0 bg-accent-hover scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

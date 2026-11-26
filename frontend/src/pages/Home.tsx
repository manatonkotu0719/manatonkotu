import { Link } from "react-router-dom";
import heroImage from "../assets/SLC 写真2.jpg";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src={heroImage}
          alt="SLC photo background"
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.22),transparent_28%),radial-gradient(circle_at_60%_35%,rgba(81,54,121,0.24),transparent_42%),linear-gradient(90deg,rgba(7,6,12,0.72)_0%,rgba(18,10,30,0.62)_35%,rgba(10,10,18,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.08),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-6 lg:pt-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-left animate-fade-up">
              <p className="font-heading text-text-muted text-[10px] tracking-[0.55em] uppercase mb-5 delay-1 animate-fade-up">
                Sound Life Community
              </p>
              <h1 className="font-display text-[clamp(5.5rem,15vw,16rem)] leading-[0.75] tracking-[-0.08em] text-white mb-8 delay-2 animate-fade-up">
                SLC
              </h1>
              <div className="w-16 h-px bg-accent mb-8 delay-3 animate-fade-up" />
              <p className="mb-10 max-w-xl font-body text-white text-xl sm:text-2xl md:text-[2rem] leading-relaxed delay-4 animate-fade-up">
                大好きな仲間と、大好きな音楽を
              </p>
              <div className="flex flex-col sm:flex-row gap-4 delay-5 animate-fade-up">
                <Link
                  to="/lives"
                  className="group relative flex items-center justify-center px-8 py-4 bg-accent text-surface font-heading text-sm tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"
                >
                  <span className="relative z-10">ライブ情報</span>
                  <div className="absolute inset-0 bg-accent-hover scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
                <Link
                  to="/members"
                  className="flex items-center justify-center px-8 py-4 border border-white/20 bg-transparent text-text-primary font-heading text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all"
                >
                  メンバー紹介
                </Link>
              </div>
            </div>


          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12 text-center animate-fade-up">
          <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">Club</p>
          <h2 className="font-display text-5xl md:text-6xl text-text-primary tracking-wider">
            Music for everyone
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-border">
          {[
            {
              num: "01",
              title: "ライブ",
              desc: "定期的にライブイベントを開催。学内外で活動しています。",
              to: "/lives",
            },
            {
              num: "02",
              title: "メンバー",
              desc: "個性豊かなメンバーが在籍。初心者から経験者まで歓迎。",
              to: "/members",
            },
            {
              num: "03",
              title: "お知らせ",
              desc: "活動報告やイベント情報など、最新ニュースをチェック。",
              to: "/posts",
            },
            {
              num: "04",
              title: "演奏体験",
              desc: "音楽に触れる機会を大切にし、初心者から楽しく参加できます。",
              to: "/members",
            },
            {
              num: "05",
              title: "交流会",
              desc: "サークル内外での交流を通じて、音楽や仲間づくりを楽しめます。",
              to: "/contact",
            },
            {
              num: "06",
              title: "お問い合わせ",
              desc: "入部やイベント参加について気になることがあれば、お気軽にご連絡ください。",
              to: "/contact",
            },
          ].map((item, i) => (
            <Link
              key={item.num}
              to={item.to}
              className={`group bg-surface p-10 hover:bg-surface-hover transition-colors delay-${(i % 6) + 1} animate-fade-up`}
            >
              <span className="font-display text-4xl text-accent/30 group-hover:text-accent transition-colors">
                {item.num}
              </span>
              <h3 className="font-heading text-xl tracking-wider text-text-primary mt-4 mb-3 uppercase">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>詳しく見る</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

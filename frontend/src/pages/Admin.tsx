import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Notice = {
  type: "success" | "error";
  message: string;
};

export default function Admin() {
  const { user, token } = useAuth();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    part: "Gt",
    introduction: "",
    image_url: "",
  });
  const [liveForm, setLiveForm] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });

  if (!user || !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  async function createEntity(endpoint: string, payload: Record<string, string>) {
    const response = await fetch(`/api/v1${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.detail ?? "登録に失敗しました");
    }
    return data;
  }

  async function handleMemberSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    try {
      await createEntity("/members", memberForm);
      setNotice({ type: "success", message: "メンバーを追加しました" });
      setMemberForm({ name: "", part: "Gt", introduction: "", image_url: "" });
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "失敗しました" });
    }
  }

  async function handleLiveSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    try {
      await createEntity("/lives", liveForm);
      setNotice({ type: "success", message: "ライブ情報を追加しました" });
      setLiveForm({ title: "", date: "", venue: "", description: "" });
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "失敗しました" });
    }
  }

  async function handlePostSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    try {
      await createEntity("/posts", postForm);
      setNotice({ type: "success", message: "お知らせを追加しました" });
      setPostForm({ title: "", content: "" });
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "失敗しました" });
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16 animate-fade-up">
        <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
          Admin
        </p>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider text-text-primary">
          管理画面
        </h1>
        <div className="w-12 h-px bg-accent mt-6" />
      </div>

      {notice && (
        <div
          className={`mb-8 border px-4 py-3 text-sm rounded-sm ${
            notice.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {notice.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleMemberSubmit} className="bg-surface-card border border-border p-6 rounded-sm space-y-4">
          <h2 className="font-heading text-xl tracking-wider text-text-primary">メンバー追加</h2>
          <input value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} placeholder="名前" className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none" required />
          <select value={memberForm.part} onChange={(e) => setMemberForm({ ...memberForm, part: e.target.value })} className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary focus:outline-none">
            <option value="Gt">Gt</option>
            <option value="Vo">Vo</option>
            <option value="Ba">Ba</option>
            <option value="Dr">Dr</option>
            <option value="Key">Key</option>
          </select>
          <textarea value={memberForm.introduction} onChange={(e) => setMemberForm({ ...memberForm, introduction: e.target.value })} placeholder="自己紹介" rows={4} className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none resize-none" />
          <input value={memberForm.image_url} onChange={(e) => setMemberForm({ ...memberForm, image_url: e.target.value })} placeholder="画像URL" className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none" />
          <button type="submit" className="w-full py-3 border border-accent text-accent hover:bg-accent hover:text-surface transition-all">メンバーを追加</button>
        </form>

        <form onSubmit={handleLiveSubmit} className="bg-surface-card border border-border p-6 rounded-sm space-y-4">
          <h2 className="font-heading text-xl tracking-wider text-text-primary">ライブ追加</h2>
          <input value={liveForm.title} onChange={(e) => setLiveForm({ ...liveForm, title: e.target.value })} placeholder="タイトル" className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none" required />
          <input type="date" value={liveForm.date} onChange={(e) => setLiveForm({ ...liveForm, date: e.target.value })} className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary focus:outline-none" required />
          <input value={liveForm.venue} onChange={(e) => setLiveForm({ ...liveForm, venue: e.target.value })} placeholder="会場" className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none" required />
          <textarea value={liveForm.description} onChange={(e) => setLiveForm({ ...liveForm, description: e.target.value })} placeholder="説明" rows={4} className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none resize-none" />
          <button type="submit" className="w-full py-3 border border-accent text-accent hover:bg-accent hover:text-surface transition-all">ライブを追加</button>
        </form>

        <form onSubmit={handlePostSubmit} className="bg-surface-card border border-border p-6 rounded-sm space-y-4">
          <h2 className="font-heading text-xl tracking-wider text-text-primary">お知らせ追加</h2>
          <input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} placeholder="タイトル" className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none" required />
          <textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} placeholder="本文" rows={6} className="w-full bg-transparent border-b border-border px-0 py-2 text-text-primary placeholder:text-text-muted/50 focus:outline-none resize-none" required />
          <button type="submit" className="w-full py-3 border border-accent text-accent hover:bg-accent hover:text-surface transition-all">お知らせを追加</button>
        </form>
      </div>
    </div>
  );
}

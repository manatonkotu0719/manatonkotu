import os

from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./test_admin_guard.db")

from app.main import app


client = TestClient(app)


def test_create_post_requires_admin():
    resp = client.post(
        "/api/v1/posts",
        json={"title": "テスト投稿", "content": "本文"},
    )
    assert resp.status_code == 403

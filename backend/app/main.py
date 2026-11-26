import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.api.v1.router import router as v1_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import async_session, engine
from app.core.security import hash_password

# Import all models so Base.metadata knows about them
from app.models.contact import Contact  # noqa: F401
from app.models.live import Live  # noqa: F401
from app.models.member import Member  # noqa: F401
from app.models.post import Post  # noqa: F401
from app.models.user import User  # noqa: F401


async def seed_data() -> None:
    """Insert sample data if tables are empty."""
    async with async_session() as session:
        result = await session.execute(select(User).limit(1))
        if result.scalar_one_or_none() is not None:
            return  # already seeded

        session.add_all([
            Member(name="田中 太郎", part="Gt", introduction="リードギター担当。ロックが好き。"),
            Member(name="佐藤 花子", part="Vo", introduction="ボーカル担当。洋楽が好きです。"),
            Member(name="鈴木 一郎", part="Ba", introduction="ベース担当。ファンク命。"),
            Member(name="高橋 美咲", part="Dr", introduction="ドラム担当。リズムは任せて！"),
            Live(
                title="春ライブ 2026",
                date=datetime.date(2026, 4, 15),
                venue="渋谷クラブX",
                description="新入生歓迎ライブです！",
            ),
            Live(
                title="夏フェス 2026",
                date=datetime.date(2026, 7, 20),
                venue="代々木公園野外ステージ",
                description="他大学との合同イベント。",
            ),
            Post(
                title="サイトオープン！",
                content="SLC軽音サークルの公式サイトを公開しました。",
                created_at=datetime.datetime(2026, 3, 1, tzinfo=datetime.timezone.utc),
            ),
            Post(
                title="新歓ライブ決定",
                content="4月15日に渋谷クラブXにて新入生歓迎ライブを開催します。",
                created_at=datetime.datetime(2026, 3, 10, tzinfo=datetime.timezone.utc),
            ),
            ],)
        # add users
        session.add_all([
            User(
                username="admin",
                hashed_password=hash_password("AdminPass123"),
                university="学園大学",
                year=1,
                instrument="Manager",
                is_admin=True,
            ),
            User(
                username="testuser",
                hashed_password=hash_password("UserPass123"),
                university="東京大学",
                year=2,
                instrument="Gt",
                is_admin=False,
            ),
        ])
        await session.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await seed_data()
    yield
    await engine.dispose()


def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(v1_router, prefix="/api/v1")

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()

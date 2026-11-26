from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    university: Mapped[str] = mapped_column(String(200))
    year: Mapped[int] = mapped_column()  # 学年 (1-4 etc.)
    instrument: Mapped[str] = mapped_column(String(100))  # 楽器
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

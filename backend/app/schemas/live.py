from datetime import date

from pydantic import BaseModel


class LiveBase(BaseModel):
    title: str
    date: date
    venue: str
    description: str | None = None


class LiveCreate(LiveBase):
    pass


class LiveResponse(LiveBase):
    id: int

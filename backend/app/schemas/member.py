from pydantic import BaseModel


class MemberBase(BaseModel):
    name: str
    part: str  # e.g. "Vo", "Gt", "Ba", "Dr", "Key"
    introduction: str | None = None
    image_url: str | None = None


class MemberCreate(MemberBase):
    pass


class MemberResponse(MemberBase):
    id: int

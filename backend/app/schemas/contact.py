from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


class ContactResponse(BaseModel):
    success: bool
    message: str

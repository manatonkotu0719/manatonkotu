from pydantic import BaseModel


class RegisterRequest(BaseModel):
    username: str
    password: str
    university: str
    year: int
    instrument: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    username: str
    university: str
    year: int
    instrument: str
    is_admin: bool

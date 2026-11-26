from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter()


@router.post("", response_model=ContactResponse, status_code=201)
async def create_contact(body: ContactCreate, session: AsyncSession = Depends(get_session)):
    contact = Contact(**body.model_dump())
    session.add(contact)
    await session.commit()
    return ContactResponse(success=True, message="お問い合わせありがとうございます！")

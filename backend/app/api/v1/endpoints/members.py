from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_session
from app.models.member import Member
from app.models.user import User
from app.schemas.member import MemberCreate, MemberResponse

router = APIRouter()


@router.get("", response_model=list[MemberResponse])
async def list_members(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Member).order_by(Member.id))
    return result.scalars().all()


@router.get("/{member_id}", response_model=MemberResponse)
async def get_member(member_id: int, session: AsyncSession = Depends(get_session)):
    member = await session.get(Member, member_id)
    if member is None:
        raise HTTPException(status_code=404, detail="メンバーが見つかりません")
    return member


@router.post("", response_model=MemberResponse, status_code=201)
async def create_member(
    body: MemberCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="管理者のみメンバーを追加できます",
        )

    member = Member(**body.model_dump())
    session.add(member)
    await session.commit()
    await session.refresh(member)
    return member

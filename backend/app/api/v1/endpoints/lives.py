from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_session
from app.models.live import Live
from app.models.user import User
from app.schemas.live import LiveCreate, LiveResponse

router = APIRouter()


@router.get("", response_model=list[LiveResponse])
async def list_lives(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Live).order_by(Live.date.desc()))
    return result.scalars().all()


@router.get("/{live_id}", response_model=LiveResponse)
async def get_live(live_id: int, session: AsyncSession = Depends(get_session)):
    live = await session.get(Live, live_id)
    if live is None:
        raise HTTPException(status_code=404, detail="ライブ情報が見つかりません")
    return live


@router.post("", response_model=LiveResponse, status_code=201)
async def create_live(
    body: LiveCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="管理者のみライブを追加できます",
        )

    live = Live(**body.model_dump())
    session.add(live)
    await session.commit()
    await session.refresh(live)
    return live

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_session
from app.models.post import Post
from app.models.user import User
from app.schemas.post import PostCreate, PostResponse

router = APIRouter()


@router.get("", response_model=list[PostResponse])
async def list_posts(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Post).order_by(Post.created_at.desc()))
    return result.scalars().all()


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, session: AsyncSession = Depends(get_session)):
    post = await session.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="記事が見つかりません")
    return post


@router.post("", response_model=PostResponse, status_code=201)
async def create_post(
    body: PostCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="管理者のみ記事を追加できます",
        )

    post = Post(**body.model_dump())
    session.add(post)
    await session.commit()
    await session.refresh(post)
    return post

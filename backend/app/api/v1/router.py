from fastapi import APIRouter

from app.api.v1.endpoints import auth, contacts, lives, members, posts

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(members.router, prefix="/members", tags=["members"])
router.include_router(lives.router, prefix="/lives", tags=["lives"])
router.include_router(posts.router, prefix="/posts", tags=["posts"])
router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])

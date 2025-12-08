from controllers import preferences_controller
from schemas.requests.preference_request import Preference
from schemas.response.preference_response import Preference as PreferenceResponse
from database.db import get_db
from auth.auth_guard import get_connected_user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.user_model import User


router = APIRouter(
    prefix="/api/v1/preferences",
    tags=["preferences"],
)


@router.get("/", response_model=list[PreferenceResponse], status_code=200)
async def get_preferences(
    db : Session = Depends(get_db),
    user: User = Depends(get_connected_user)
    ) -> bool:
    """Fetch popular movies"""
    return await preferences_controller.get_preferences_by_user(db, user.id)

@router.post("/", response_model=bool, status_code=201)
async def new_preference(
    preference: Preference,
    db : Session = Depends(get_db),
    user: User = Depends(get_connected_user)
    ) -> bool:
    """Fetch popular movies"""
    return await preferences_controller.post_preference(db, user.id, preference)


@router.delete("/{genre_id}", response_model=bool, status_code=201)
async def new_preference(
    genre_id: int,
    db : Session = Depends(get_db),
    user: User = Depends(get_connected_user)
    ) -> bool:
    """Fetch popular movies"""
    return await preferences_controller.remove_preference(db, user.id, genre_id)


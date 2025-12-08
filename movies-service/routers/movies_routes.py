from controllers import movies_controller
from models.user_model import User
from schemas.response.movie_response import Movie
from auth.auth_guard import get_connected_user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db

router = APIRouter(
    prefix="/api/v1/movies",
    tags=["movies"],
)

@router.get("/popular", response_model=list[Movie], status_code=200)
async def get_popular_movies(
    page: int,
    _ = Depends(get_connected_user)
    ) -> list[Movie]:
    """Fetch popular movies"""
    return await movies_controller.get_popular_movies(page)


@router.get("/recommandations", response_model=list[Movie], status_code=200)
async def get_recommended_movies(
    page: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_connected_user)
    ) -> list[Movie]:
    """Fetch recommended movies"""
    return await movies_controller.get_movies_by_user_preferences(db, page, user.id)

@router.get("/{genre_id}", response_model=list[Movie], status_code=200)
async def get_popular_movies(
    genre_id: int,
    page: int = 1,
    _ = Depends(get_connected_user)
    ) -> list[Movie]:
    """Fetch popular movies"""
    return await movies_controller.get_movies_by_genre(page, genre_id)
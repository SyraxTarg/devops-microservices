from controllers import genres_controller
from schemas.response.genre_response import Genre
from auth.auth_guard import get_connected_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/api/v1/genres",
    tags=["genres"],
)

@router.get("/", response_model=list[Genre], status_code=200)
async def get_genres(
    _ = Depends(get_connected_user)
    ) -> list[Genre]:
    """Fetch all genres"""
    return await genres_controller.get_genres()

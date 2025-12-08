from services import genres_service
from schemas.response.genre_response import Genre

async def get_genres()->list[Genre]:
    all_genres = await genres_service.get_genres("/genre/movie/list?language=fr")

    genres = []

    for genre in all_genres.get("genres"):
        genres.append(
            Genre(
                id=genre.get("id"),
                name=genre.get("name")
            )
        )

    return genres
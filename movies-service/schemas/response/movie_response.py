from pydantic import BaseModel
from typing import Optional
from schemas.response.genre_response import Genre

class Movie(BaseModel):
    title: str
    synopsis: str
    image_path: Optional[str]
    release_date: str
    popularity: float
    avg_rate: float
    vote_number: int
    original_language: str
    genres: list[Genre]

    model_config = {
        "from_attributes": True
    }

from pydantic import BaseModel

class Preference(BaseModel):
    genre_id: int
    genre_name: str
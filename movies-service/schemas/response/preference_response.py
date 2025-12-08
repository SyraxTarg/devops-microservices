from pydantic import BaseModel

class Preference(BaseModel):
    id: int
    user_id: int
    genre_id: int
    genre_name: str

    model_config = {
        "from_attributes": True
    }

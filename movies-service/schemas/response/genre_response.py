from pydantic import BaseModel

class Genre(BaseModel):
    id: int
    name: str
    
    model_config = {
        "from_attributes": True
    }
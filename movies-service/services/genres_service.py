from repositories.fetchers import get

async def get_genres(path: str)-> dict:
    genres =  get(path)
    return {"status": "200", "genres": genres.get("genres")}

async def get_genre(genres: dict, genre_id: int)->dict:
    for g in genres.get("genres"):
        if g.get("id") == genre_id:
            return g